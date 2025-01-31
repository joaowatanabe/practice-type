import conexao, { Client } from "knex";

export const knex = require("knex")({
  client: "pg",
  connection: {
    host: "",
    user: "",
    password: "",
    database: "",
  },
});
