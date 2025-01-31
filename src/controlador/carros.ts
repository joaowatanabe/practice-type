import { Request, Response } from "express";
import { knex } from "../database/conexao";
import { Carro } from "../tipos";

export const listarCarros = async (_: Request, res: Response) => {
  try {
    const carros = await knex("carros");

    return res.status(200).json(carros);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const detalharCarro = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const carro = await knex("carros")
      .where({ id: Number(id) })
      .first();

    if (!carro) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }

    return res.status(200).json(carro);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const cadastrarCarros = async (req: Request, res: Response) => {
  const { marca, modelo, cor, ano, valor } = req.body;

  if (!modelo || !marca || !ano || !cor || !valor) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  try {
    const carro = await knex<Omit<Carro, "id">>("carros")
      .insert({
        marca,
        modelo,
        cor,
        ano,
        valor,
      })
      .returning("*");

    return res.status(201).json(carro[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const atualizarCarros = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { marca, modelo, cor, ano, valor } = req.body;

  if (!modelo || !marca || !ano || !cor || !valor) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  try {
    const carro = await knex<Carro>("carros")
      .where({ id: Number(id) })
      .update({
        marca,
        modelo,
        cor,
        ano,
        valor,
      })
      .returning("*");

    if (!carro.length) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }

    return res.status(200).json(carro[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const deletarCarros = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const carro = await knex<Carro>("carros")
      .where({ id: Number(id) })
      .del();

    if (!carro) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno" });
  }
};
