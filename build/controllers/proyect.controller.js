import { request } from "express";
import { Proyect } from "../models/Proyects.js";
import { Task } from "../models/Task.js";
export const getProyects = async (req, res) => {
  try {
    const proyects = await Proyect.findAll({
      include: [{
        model: Task,
        attributes: ['id', 'name', 'done']
      }]
    });
    res.json(proyects);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const getProyect = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      name,
      priority,
      description
    } = req.body;
    const proyect = await Proyect.findByPk(id, {
      include: [{
        model: Task,
        attributes: ['id', 'name', 'done']
      }]
    });
    if (!proyect) {
      return res.status(404).json({
        message: 'proyect not exist'
      });
    }
    res.json(proyect);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const createProyect = async (req, res) => {
  const {
    name,
    priority,
    description,
    tasks
  } = req.body;
  try {
    console.log(req.body);
    const newProyect = await Proyect.create({
      name,
      description,
      priority,
      tasks: tasks
    }, {
      include: "tasks"
    });
    console.log(newProyect);
    res.json(newProyect);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const updateProyect = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const updateProyect = await Proyect.findByPk(id);
    updateProyect.set(req.body);
    await updateProyect.save();
    res.json(updateProyect);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const deleteProyect = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await Proyect.destroy({
      where: {
        id
      }
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};