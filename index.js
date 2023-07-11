const express = require("express");
const conn = require("./db/conn");
const cors = require("cors");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const CarRoutes = require("./routes/CarRoutes");
const AccidentRoutes = require("./routes/AccidentRoutes");

app.use("/accident", AccidentRoutes);
app.use("/car", CarRoutes);

conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(80);
    //app.listen(5000);
  })
  .catch((err) => console.log(err));
