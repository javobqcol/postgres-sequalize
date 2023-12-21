import { DataTypes } from "sequelize";
import { sequalize } from "../database/database.js";
import { Task } from "./Task.js";
export const Proyect = sequalize.define('proyect', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  priority: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});
Proyect.hasMany(Task, {
  foreignKey: 'proyectId',
  sourceKey: 'id'
});
Task.belongsTo(Proyect);