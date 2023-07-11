const { body, param } = require("express-validator");
const accidentCreatedValidation = () => {
  return [
    body("address")
      .isString()
      .withMessage("O endereço é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O endereço precisa ter no mínimo 3 caracteres."),
    body("gravity")
      .isString()
      .withMessage("A gravidade é obrigatória.")
      .isLength({ min: 4 })
      .withMessage("A gravidade precisa ter no mínimo 4 caracteres."),
  ];
};

const accidentUpdateValidation = () => {
  return [param("id").isNumeric().withMessage("Acidente não existe")];
};

module.exports = {
  accidentCreatedValidation,
  accidentUpdateValidation,
};
