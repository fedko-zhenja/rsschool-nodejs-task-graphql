import { PrismaClient } from "@prisma/client";
import { Context } from "./interface.js";

export const createContext = (prisma: PrismaClient): Context => ({prisma});
