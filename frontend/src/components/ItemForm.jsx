import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      category: "",
      price: "",
      description: "",
      customerReviewCount: "",
      imageUrl: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      description: formData.description,
      customerReviewCount: Number(formData.customerReviewCount),
      imageUrl: formData.imageUrl || "",
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Category</label>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Customer Review Count</label>
      <input
        type="number"
        name="customerReviewCount"
        value={formData.customerReviewCount}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Image URL</label>
      <input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Optional"
      />

      <button className="btn primary" type="submit">
        {submitText}
      </button>
    </form>
  );
}

export default ItemForm;