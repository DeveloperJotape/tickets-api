import { Router } from "express";

import {
  createUser,
  deleteManyUser,
  getAllUsers,
} from "./controller/UserController";
import { createAccess, getAccesses } from "./controller/AccessController";
import { createTicket, getAllTickets } from "./controller/TicketController";

export const router = Router();

// Users
router.post("/user", createUser);
router.get("/user", getAllUsers);
router.delete("/user/delete-users", deleteManyUser);

// Accesses
router.post("/access", createAccess);
router.get("/access", getAccesses);

// Ticket
router.post("/ticket/:userId", createTicket);
router.get("/ticket", getAllTickets);
