const express = require("express");
const greetings = require("./routers/greetings");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pizzas = require("./routers/pizzas");
// Import ^^^^^

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// Instansiation
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

app.use(pizzas);
app.use(greetings);

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service healthy" }));
});

app
  .route("/")
  .get((request, response) => {
    response.send(
      JSON.stringify({ message: "No routes available on root URI." }),
      404
    );
  })
  .post((request, response) => {
    response.send(
      JSON.stringify({ message: "No Post available on root URI." }),
      404
    );
  });

app.route("/greetings/:name").get((request, response) => {
  const name = request.params.name;
  response.status(418).json({ message: `Hello ${name}` });
});

const port = process.env.PORT || 4040;
app.listen(port, () => console.log(`Listening on port ${port}`));
