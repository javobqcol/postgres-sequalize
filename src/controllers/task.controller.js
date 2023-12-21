import { request } from "express";
import { Task } from "../models/Task.js";
import { Proyect } from "../models/Proyects.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include:{
        model: Proyect,
        attributes: ['name', 'priority', 'description']
      }
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task= await Task.findByPk(id, {
      include:{
        model: Proyect,
        attributes: ['name', 'priority', 'description']
      }
    });
    if (!task){
      return res.status(404).json({ message: 'task not exist'});
    }
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, done, proyectId } = req.body;
    const newTask = await Task.create({
      name,
      done,
      proyectId
    });
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateTask= async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByPk(id);
    task.set(req.body)
    console.log(task);
    await task.save();
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
