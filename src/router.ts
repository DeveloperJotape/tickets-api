import { Router } from "express";

import {
  createUser,
  deleteManyUser,
  getAllUsers,
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
  getTicketsByUser,
} from "./controller/TicketController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./middleware/AuthMiddleware";

export const router = Router();

// Users
router.post("/user", authMiddleware(["Administrador", "Gerente"]), createUser);
router.get("/user", authMiddleware(["Administrador", "Gerente"]), getAllUsers);
router.delete(
  "/user/delete-users",
  authMiddleware(["Administrador"]),
  deleteManyUser
);

// Accesses
router.post("/access", authMiddleware(["Administrador"]), createAccess);
router.get("/access", authMiddleware(["Administrador"]), getAccesses);
router.delete(
  "/access/delete-accesses",
  authMiddleware(["Administrador"]),
  deleteManyAccesses
);

// Ticket
router.post("/ticket/:userId", createTicket);
router.get("/ticket", getAllTickets);
router.get("/ticket/:userId", getTicketsByUser);
router.delete("/ticket/delete-tickets", deleteManyTickets);

// Autenticação
router.post("/sign-in", signIn);
