import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      console.log("Submitting item:", formData);

      await createItem(formData);

      alert("Item created successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to create item";

      alert(message);
    }
  };

  return <ItemForm submitText="Add Item" onSubmit={handleCreate} />;
}

export default AddItemPage;