const express = require("express");
const app = express();
const cors = require("cors");
const responseFormatter = require("./helpers/responseFormatter.helper");
;
const morgan = require("morgan");
const indexRouter = require("./routes");


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(responseFormatter);

app.use("/api/v1", indexRouter);


app.use((err, req, res, next) => res.serverError());

module.exports = app;
