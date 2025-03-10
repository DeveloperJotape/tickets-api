import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";

interface DecodedToken {
  userId: string;
}

export function authMiddleware(permissions?: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Obtem o token do header Authorization
    const authHeader = req.headers.authorization;

    // Verifica se o token foi fornecido e se é válido
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // Depois do 7 caractere (Bearer ) recebemos o token
    const token = authHeader.substring(7);

    try {
      // Busca chave secreta apenas que somente a aplicação possui
      const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

      // Retorna um erro caso não exista uma secret key
      if (!MY_SECRET_KEY) {
        throw new Error("Chave secreta não encontrada");
      }

      // Verifica se o token é válido e decodifica o userId
      const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken;

      // Salva o userId na req para uso posterior
      req.user = { id: decodedToken.userId };

      // Caso exista permissão
      if (permissions) {
        // Busca dados do usuário relacionado ao token
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.userId,
          },
          include: {
            Access: {
              select: {
                name: true,
              },
            },
          },
        });

        // Retorna um erro caso o usuário não exista ou não possui permissões
        if (!user) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Busca permissões do usuário relacionado ao token
        const userPermissions = user.Access?.name;

        // Verifica se o usuário possui as permissões necessárias para acessar a rota
        const hasPermission = permissions.some((p) =>
          userPermissions?.includes(p)
        );

        // Se não possuir permissões o acesso é negado
        if (!hasPermission) {
          return res.status(403).json({ error: "Acesso negado" });
        }
      }
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido." });
    }
  };
}
