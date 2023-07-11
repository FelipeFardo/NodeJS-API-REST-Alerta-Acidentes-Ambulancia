const router = require("express").Router();

const CarController = require("../controllers/CarController");
const validate = require("../middlewares/handleValidation");
const { CarCreatedValidation } = require("../middlewares/carValidation");

router.get("/", CarController.getAll);
router.get("/:id", CarController.getCarById);
router.post("/", CarCreatedValidation(), validate, CarController.create);
router.put("/:id", CarController.editStatus);
module.exports = router;
