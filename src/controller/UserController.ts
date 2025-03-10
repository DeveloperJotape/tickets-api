import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, cpf, email, password, position, accessName } = req.body;

    // Verifica a existência do email
    const isUserUniqueEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserUniqueEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Verifica a existência do CPF
    const isUserUniqueCpf = await prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (isUserUniqueCpf) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

    // Verifica a existência do nível de acesso
    const isAccessName = await prisma.access.findUnique({
      where: {
        name: accessName,
      },
    });

    if (!isAccessName) {
      return res
        .status(400)
        .json({ message: "Nível de acesso não está cadastrado" });
    }

    // Criptografia para a senha
    const hashPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
        password: hashPassword,
        position,
        Access: {
          connect: {
            name: accessName,
          },
        },
      },
      // Seleciona dados específicos para serem exibidos
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        status: true,
        Access: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        status: true,
        Access: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(users);
  } catch (error) {}
};

export const deleteManyUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.deleteMany();

    return res.status(200).json({ message: "Usuários deletados" });
  } catch (error) {
    return res.status(400).json({ message: "Erro desconhecido", error });
  }
};
