const router = require("express").Router();

const AccidentController = require("../controllers/AccidentController");
const validate = require("../middlewares/handleValidation");
const {
  accidentCreatedValidation,
  accidentUpdateValidation,
} = require("../middlewares/accidentValidation");

router.get("/", AccidentController.getAll);
router.get("/:id", AccidentController.getAccidentById);
router.post(
  "/",
  accidentCreatedValidation(),
  validate,
  AccidentController.create
);
router.put(
  "/:id/status",
  accidentUpdateValidation(),
  validate,
  AccidentController.accidentResolve
);
module.exports = router;
