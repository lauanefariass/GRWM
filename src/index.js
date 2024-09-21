const express = require("express");
const app = express();
const port = 3000; // Use uma porta diferente da 27017
const mongoose = require("mongoose");

const Grwm = mongoose.model("GRWM", {
  brand: String,
  price: String,
  description: String,
  image: String,
});

app.post("/", async (req, res) => {
  const newGRWM = new Grwm({
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  await newGRWM.save();
  return res.send("Successfully created");
});

app.get("/", async (req, res) => {
  const grwmItems = await Grwm.find();
  return res.send(grwmItems);
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server connected at port ${port}`);
  mongoose.connect("mongodb://localhost:27017/test");
});
