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

export const router = Router();

// Users
router.post("/user", createUser);
router.get("/user", getAllUsers);
router.delete("/user/delete-users", deleteManyUser);

// Accesses
router.post("/access", createAccess);
router.get("/access", getAccesses);
router.delete("/access/delete-accesses", deleteManyAccesses);

// Ticket
router.post("/ticket/:userId", createTicket);
router.get("/ticket", getAllTickets);
router.get("/ticket/:userId", getTicketsByUser);
router.delete("/ticket/delete-tickets", deleteManyTickets);
