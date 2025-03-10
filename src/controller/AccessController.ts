import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAccess = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const access = await prisma.access.create({
      data: {
        name,
      },
    });

    return res.status(201).json(access);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAccesses = async (req: Request, res: Response) => {
  try {
    const accesses = await prisma.access.findMany();
    return res.status(200).json(accesses);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteManyAccesses = async (req: Request, res: Response) => {
  try {
    await prisma.access.deleteMany();

    return res.status(200).json({ message: "Níveis de acesso deletados" });
  } catch (error) {
    return res.status(400).json({ message: "Erro desconhecido", error });
  }
};
