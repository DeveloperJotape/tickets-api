import { Router } from "express";

import {
  createUser,
  deleteManyUser,
  getAllUsers,
  getUniqueUser,
  
} from "./controller/UserController";
import {
  createAccess,
  deleteManyAccesses,
  getAccesses,
} from "./controller/AccessController";
import {
  createTicket,
  deleteManyTickets,
  getAllTickets,
  getTicketsByUserId,
} from "./controller/TicketController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./middleware/AuthMiddleware";

export const router = Router();

// Usuários
router.post("/user", authMiddleware(["Administrador", "Gerente"]),createUser);
router.get("/user", authMiddleware(["Administrador"]), getAllUsers);
router.get("/user/get-unique-user", authMiddleware(["Administrador", "Gerente", "Colaborador"]), getUniqueUser);
router.delete(
  "/user/delete-users",
  authMiddleware(["Administrador"]),
  deleteManyUser
);

// Níveis de acesso
router.post("/access", authMiddleware(["Administrador"]), createAccess);
router.get("/access", authMiddleware(["Administrador", "Gerente", "Colaborador"]), getAccesses);
router.delete(
  "/access/delete-accesses",
  authMiddleware(["Administrador"]),
  deleteManyAccesses
);

// Ticket
router.post("/ticket", authMiddleware(["Administrador", "Gerente", "Colaborador"]), createTicket);
router.get("/ticket", authMiddleware(["Administrador"]), getAllTickets);
router.get("/ticket/:userId", authMiddleware(["Administrador", "Gerente"]), getTicketsByUserId);
router.delete("/ticket/delete-tickets", authMiddleware(["Administrador"]),deleteManyTickets);

// Autenticação
router.post("/sign-in", signIn);
