import { Sequelize } from "sequelize";

export const sequalize = new Sequelize("proyectsdb", "admin", "postgres", {
  host: "localhost",
  dialect: "postgres",
});
