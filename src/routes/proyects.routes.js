import { Router } from "express";
import {
  createProyect,
  deleteProyect,
  getProyect,
  getProyects,
  updateProyect,
} from "../controllers/proyect.controller.js";

export const router = Router();

router.get("/proyects", getProyects);
router.post("/proyects", createProyect);
router.put("/proyects/:id", updateProyect);
router.delete("/proyects/:id", deleteProyect);
router.get("/proyects/:id", getProyect);
