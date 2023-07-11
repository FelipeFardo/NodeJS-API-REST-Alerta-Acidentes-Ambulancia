const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errorsArray = [];

  errors.array().map((err) => {
    errorObject = { path: err.path, erro: err.msg };
    errorsArray.push(errorObject);
  });

  return res.status(422).json({
    message: "Preencha os dados corretamente!",
    status: "Erro",
    //errors: errorsArray,
    errors,
  });
};

module.exports = validate;
