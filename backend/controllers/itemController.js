import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Get items error:", error.message);
    res.status(500).json({
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Get item error:", error.message);
    res.status(500).json({
      message: "Failed to fetch item",
      error: error.message,
    });
  }
};

export const createItem = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      customerReviewCount,
      imageUrl,
    } = req.body;

    const newItem = await Item.create({
      name,
      category,
      price: Number(price),
      description,
      customerReviewCount: Number(customerReviewCount),
      imageUrl: imageUrl || "",
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Create item error:", error.message);
    res.status(400).json({
      message: "Failed to create item",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      customerReviewCount,
      imageUrl,
    } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price: Number(price),
        description,
        customerReviewCount: Number(customerReviewCount),
        imageUrl: imageUrl || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Update item error:", error.message);
    res.status(400).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete item error:", error.message);
    res.status(500).json({
      message: "Failed to delete item",
      error: error.message,
    });
  }
};