import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Access: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

    if (!MY_SECRET_KEY) {
      throw new Error("Chave secreta não encontrada");
    }

    const token = sign(
      {
        userId: user.id,
        role: user.Access?.name,
      },
      MY_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro desconhecido", error });
  }
};
