const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const Grwm = mongoose.model("GRWM", {
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  category: {
    type: String,
    enum: ["t-shirt", "pants", "dresses", "jackets", "accessories"],
    required: true,
  },
});


app.use(express.json());


app.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const newGRWMItems = await Grwm.insertMany(req.body);
      return res
        .status(201)
        .json({ message: "Successfully created", data: newGRWMItems });
    } else {
      const newGRWM = new Grwm({
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        image_url: req.body.image_url,
        category: req.body.category,
      });
      await newGRWM.save();
      return res.status(201).send("Successfully created");
    }
  } catch (error) {
    return res
      .status(500)
      .send("Error creating GRWM item(s): " + error.message);
  }
});


app.put("/:id", async (req, res) => {
  try {
    const updatedGRWM = await Grwm.findByIdAndUpdate(
      req.params.id,
      {
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        image_url: req.body.image_url,
        category: req.body.category,
      },
      { new: true }
    );
    if (!updatedGRWM) {
      return res.status(404).send("Item not found");
    }
    return res.status(200).send("Successfully updated");
  } catch (error) {
    return res.status(500).send("Error updating GRWM item: " + error.message);
  }
});


app.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Grwm.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send("Item not found");
    }
    return res.status(200).send("Successfully deleted");
  } catch (error) {
    return res.status(500).send("Error deleting GRWM item: " + error.message);
  }
});



app.get("/items/:id?", async (req, res) => {


app.get("/:id", async (req, res) => {


  try {
    if (req.params.id) {
      const grwmItem = await Grwm.findById(req.params.id);
      if (!grwmItem) {
        return res.status(404).send("Item not found");
      }
      return res.status(200).json(grwmItem);
    } else {
      const grwmItems = await Grwm.find();
      return res.status(200).json(grwmItems);
    }
  } catch (error) {
    return res
      .status(500)
      .send("Error retrieving GRWM item(s): " + error.message);
  }
});



app.get("/filters", async (req, res) => {

app.get("/brand/:name?", async (req, res) => {

  try {
    const filters = {};

    if (req.query.brand) {
      filters.brand = req.query.brand;
    }
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.description) {
      filters.description = { $regex: req.query.description, $options: "i" }; 

    
    console.log("Filters:", filters);

    const grwmItems = await Grwm.find(filters);

    if (grwmItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found with the provided filters" });
    }



app.get("/", async (req, res) => {
  try {
    const grwmItems = await Grwm.find();

    return res.status(200).json(grwmItems);
  } catch (error) {
    console.error("Error details:", error);
    return res
      .status(500)
      .send("Error retrieving items by filters: " + error.message);
  }
});


mongoose
  .connect("mongodb://localhost:27017/test", {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));
