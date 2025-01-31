import { Router } from "express";
import {
  atualizarCarros,
  cadastrarCarros,
  deletarCarros,
  listarCarros,
  detalharCarro
} from "./controlador/carros";

const rotas = Router();

rotas.get("/carros", listarCarros);
rotas.get("/carros/:id", detalharCarro);
rotas.post("/carros", cadastrarCarros);
rotas.put("/carros/:id", atualizarCarros);
rotas.delete("/carros/:id", deletarCarros);

export default rotas;
