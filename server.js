const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://localhost:8081",
};

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoose!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongoose!", err);
    process.exit(1);
  });

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "QuanIntel API" });
});

require("./app/routers/tutorials.routers")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
