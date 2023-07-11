const { body } = require("express-validator");
const CarCreatedValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("plate")
      .isString()
      .withMessage("A placa é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A placa precisa ter no mínimo 6 caracteres."),
    body("tipe").isString().withMessage("A tipo é obrigatório."),
  ];
};

module.exports = {
  CarCreatedValidation,
};
