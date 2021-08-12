const express = require("express");
const greetings = require("./routers/greetings");
const mongoose = require("mongoose");
// Import ^^^^^

const app = express();

mongoose.connect("mongodb://localhost/pizzeria");
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

app.use(express.json());
app.use(logging);

app.use(greetings);

mongoose.connect("mongodb://localhost/pizzaStore");

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
