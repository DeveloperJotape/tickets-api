import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, assignedToId } = req.body;
    const { userId } = req.params;

    // Verifica se o usuário que está criando o ticket existe
    const createdBy = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!createdBy) {
      return res.status(404).json({ message: "Usuário inexistente!" });
    }

    // Verifica se o usuário está ativo
    if (createdBy.status !== "ACTIVE") {
      return res
        .status(403)
        .json({ message: "Usuário inativo! Acesso negado" });
    }

    // Verifica se o responsável pelo ticket existe
    const assignedTo = await prisma.user.findUnique({
      where: { id: assignedToId },
    });

    if (!assignedTo) {
      return res
        .status(404)
        .json({ message: "Usuário responsável inexistente!" });
    }

    if (assignedTo.status !== "ACTIVE") {
      return res
        .status(403)
        .json({ message: "Usuário responsável inativo! Acesso negado" });
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        status,
        priority,
        CreatedBy: {
          connect: {
            id: userId,
          },
        },
        AssignedTo: {
          connect: {
            id: assignedToId,
          },
        },
      },
    });

    return res.status(201).json(ticket);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        CreatedBy: {
          select: {
            name: true,
          },
        },
        AssignedTo: {
          select: {
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(404).json(error);
  }
};

/* Busca tickets pelo nome do usuário */
export const getTicketsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Busca os tickets relacionados ao funcionário pelo ID
    const tickets = await prisma.ticket.findMany({
      where: {
        OR: [{ createdById: userId }, { assignedToId: userId }],
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        CreatedBy: {
          select: { name: true },
        },
        AssignedTo: {
          select: { name: true },
        },
        created_at: true,
        updated_at: true,
      },
    });

    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(404).json(error);
  }
};
