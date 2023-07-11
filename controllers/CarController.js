const Car = require("../models/Car");

module.exports = class ViaturaController {
  static async create(req, res) {
    const { name, plate, tipe } = req.body;

    let status = "Disponível";

    const car = new Car({
      name,
      plate,
      tipe,
      status,
    });

    try {
      await car.save();
      res.status(201).json({
        message: "Viatura cadastrada com sucesso",
        status: "Sucesso",
        car,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Erro ao cadastrar viatura",
        status: "Erro",
      });
      return;
    }
  }

  static async getAll(req, res) {
    try {
      const cars = await Car.findAll();

      if (!cars.length) {
        res.status(422).json({
          status: "Erro",
          message: "Não foi possível encontrar viaturas",
        });
        return;
      }
      res.status(200).json({
        status: "Sucesso",
        message: "Viaturas encontradas com sucesso",
        cars,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: "Erro",
        message: "Não foi possível encontrar viaturas",
      });
      return;
    }
  }

  static async editStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    let carData = {};
    try {
      const car = await Car.findOne({
        where: { id },
      });
      if (!car) {
        res.status(404).json({
          status: "Erro",
          message: "Viatura não encontrada",
        });
        return;
      }
      carData = {
        status,
      };
    } catch (err) {
      res.status(500).json({
        status: "Erro",
        message: "Viatura não encontrada",
      });
      return;
    }
    try {
      await Car.update(carData, { where: { id } });
      const car = await Car.findOne({ where: { id } });
      res.status(200).json({
        status: "Sucesso",
        message: "Viatura editada com sucesso",
        car,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: "Erro",
        message: "Não foi possível atualizar a viatura",
      });
      return;
    }
  }

  static async getCarById(req, res) {
    const { id } = req.params;
    try {
      const car = await Car.findOne({ where: { id } });
      if (!car) {
        res.status(404).json({
          message: "Viatura não encontrada",
          status: "Erro",
        });
        return;
      }
      res.status(200).json({
        message: "Viatura encontrada",
        status: "Sucessso",
        car,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Viatura não encontrada",
        status: "Erro",
      });
    }
  }
};
