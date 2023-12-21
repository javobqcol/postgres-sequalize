import { request } from "express";
import { Proyect } from "../models/Proyects.js";
import { Task } from "../models/Task.js";

export const getProyects = async (req, res) => {
  try {
    const proyects = await Proyect.findAll({
      include: [
        {
          model: Task,
          attributes: ["id", "name", "done", "proyectId"],
        },
      ],
    });
    res.json(proyects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProyect = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    const proyect = await Proyect.findByPk(id, {
      include: [
        {
          model: Task,
          attributes: ["id", "name", "done", "proyectId"],
        },
      ],
    });
    if (!proyect) {
      return res.status(404).json({ message: "proyect not exist" });
    }
    res.json(proyect);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProyect = async (req, res) => {
  const { name, priority, description, tasks } = req.body;
  try {
    const newProyect = await Proyect.create(
      {
        name,
        description,
        priority,
        tasks: tasks,
      },
      { include: "tasks" }
    );
    res.json(newProyect);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProyect = async (req, res) => {
  try {
    //traes el proyecto con sus tareas
    const { id } = req.params;
    const updateProyect = await Proyect.findByPk(id, {
      include: [
        {
          model: Task,
          attributes: ["id", "name", "done", "proyectId"],
        },
      ],
    });
    //actualizas el proyecto
    updateProyect.set(req.body);
    // actualizaste ls tareas??.. tres opciones
    // incluiste tareas nuevas.. insertar tareas
    // actualizaste tareas.. actualizar tarea
    // borraste tareas... de proyectos.. borralas de
    // como se sabe si una tarea es nueva o ya estaba?.. porque tiene o no tiene id

    req.body?.tasks.map(async (task) => {
      if (!task?.id) {
        try {
          const newTask = await Task.create({
            name: task.name,
            done: task.done,
            proyectId: task.proyectId,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } else {
        try {
          const updateTask = await Task.findByPk(task.id);
          updateTask.set(task);
          await updateTask.save();
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }
      // finalemte se debe comprar las tareas pasadas por el backend
      // se sacan  las tareas que tiene inicialmente el proyecto
      // se compraran con las tareas suministradas por el backend
      //se borran las tareas que esten en proyecto y que no suministre el backend

      const ids = updateProyect._previousDataValues?.tasks.map(
        (task) => task?.dataValues.id
      );
      // console.log(ids)
      ids.map(async (id) => {
        try {
          if (!req.body?.tasks.map((task) => task.id).includes(id)) {
            await Task.destroy({
              where: {
                id,
              },
            });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    });
    await updateProyect.save();
    res.json(updateProyect);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProyect = async (req, res) => {
  const { id } = req.params;
  try {
    await Proyect.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
