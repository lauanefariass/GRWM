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
    return res.status(200).send("Successfully updated");
  } catch (error) {
    return res.status(500).send("Error updating GRWM item: " + error.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Grwm.findByIdAndDelete(req.params.id);
    return res.status(200).send("Successfully deleted");
  } catch (error) {
    return res.status(500).send("Error deleting GRWM item: " + error.message);
  }
});

app.get("/:id?", async (req, res) => {
  try {
    const grwmItem = await Grwm.findById(req.params.id);
    if (!grwmItem) {
      return res.status(404).send("Item not found");
    }
    return res.status(200).json(grwmItem);
  } catch (error) {
    return res.status(500).send("Error retrieving GRWM item: " + error.message);
  }
});

app.get("/brand/:name?", async (req, res) => {
  try {
    const brandName = req.params.name;
    const grwmItem = await Grwm.findOne({ brand: brandName });

    if (!grwmItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(grwmItem);
  } catch (error) {
    return res
      .status(500)
      .send("Error retrieving item by brand: " + error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    const grwmItems = await Grwm.find();
    return res.status(200).json(grwmItems);
  } catch (error) {
    return res
      .status(500)
      .send("Error retrieving GRWM items: " + error.message);
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
