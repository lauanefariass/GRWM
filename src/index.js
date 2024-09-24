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

app.post("/", async (req, res) => {
  const newGRWM = new Grwm({
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    image_url: req.body.image_url,
  });
  await newGRWM.save();
  return res.send("Successfully created");
});

app.put("/:id", async (req, res) => {
  const updatedGRWM = await Grwm.findByIdAndUpdate(
    req.params.id,
    {
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    },
    { new: true }
  );
  return res.send("Successfully updated");
});

app.delete("/:id", async (req, res) => {
  await Grwm.findByIdAndDelete(req.params.id);
  return res.send("Successfully deleted");
});


mongoose
  .connect("mongodb://localhost:27017/test", {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));
