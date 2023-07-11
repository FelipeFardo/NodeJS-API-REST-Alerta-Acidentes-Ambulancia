const Accident = require("../models/Accident");
const Car = require("../models/Car");

module.exports = class AccidentController {
  static async create(req, res) {
    const { address, gravity } = req.body;

    let status = "Não resolvido";

    const accident = new Accident({
      address,
      gravity,
      status,
    });

    try {
      await accident.save();
      res.status(201).json({
        status: "Sucesso",
        message: "Acidente cadastrado com sucesso",
        accident,
      });
    } catch (error) {
      res.status(500).json({
        status: "Erro",
        message: "Erro ao cadastrar acidente",
      });
    }
  }

  static async getAll(req, res) {
    try {
      const accidents = await Accident.findAll({ include: Car });

      if (!accidents.length) {
        res.status(422).json({
          message: "Não foi possível encontrar acidentes",
          status: "Erro",
        });
        return;
      }
      res.status(200).json({
        message: "Acidentes encontrados com sucesso",
        status: "Sucesso",
        accidents,
      });
    } catch (error) {
      res.status(500).json({
        message: "Não foi possível encontrar acidentes",
        status: "Erro",
      });
    }
  }

  static async accidentResolve(req, res) {
    const { car_id, status } = req.body;
    const { id: accident_id } = req.params;
    const accident = await Accident.findOne({ where: { id: accident_id } });

    if (!accident) {
      res.status(404).json({
        message: "Acidente não encontrado",
        status: "Erro",
      });
      return;
    }

    if (accident.CarId != null) {
      res.status(200).json({
        message: "Acidente já resolvido",
        status: "Aviso",
      });
      return;
    }

    let updateAccident = {};
    updateAccident = {
      address: accident.address,
      gravity: accident.gravity,
      CarId: car_id,
      status: status,
    };

    try {
      await Accident.update(updateAccident, {
        where: { id: accident_id },
      });
      const accidentUpdate = await Accident.findOne({
        include: Car,
        where: { id: accident_id },
      });

      res.status(200).json({
        message: "Acidente atualizado com sucesso!",
        status: "Sucesso",
        accident: accidentUpdate,
      });
    } catch (error) {
      res.status(500).json({
        message: "Não foi possível atualizar o status do acidente",
        status: "Erro",
      });
    }
  }

  static async getAccidentById(req, res) {
    const { id } = req.params;
    try {
      const accident = await Accident.findOne({ include: Car, where: { id } });
      if (!accident) {
        res.status(404).json({
          message: "Acidente não encontrado",
          status: "Erro",
        });
        return;
      }
      res.status(404).json({
        message: "Acidente encontrado",
        status: "Sucessso",
        accident,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Acidente não encontrado",
        status: "Erro",
        error,
      });
    }
  }
};
