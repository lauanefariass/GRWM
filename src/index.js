const express = require("express");
const app = express();
const port = 3000; // Use uma porta diferente da 27017
const mongoose = require("mongoose");

const Grwm = mongoose.model("GRWM", {
  brand: String,
  price: Number,
  description: String,
  image_url: String,
});

app.use(express.json());




mongoose
  .connect("mongodb://localhost:27017/test", {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));
