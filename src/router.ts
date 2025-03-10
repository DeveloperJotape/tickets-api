import { Router } from "express";

import { createUser, deleteManyUser } from "./controller/UserController";
import { createAccess, getAccesses } from "./controller/AccessController";

export const router = Router();

// Users
router.post("/user", createUser);
router.delete("/user/delete-users", deleteManyUser);

// Accesses
router.post("/access", createAccess);
router.get("/access", getAccesses);
