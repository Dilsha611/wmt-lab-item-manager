import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);

        setItem({
          ...data,
          customerReviewCount: data.customerReviewCount ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateItem(id, formData);
      alert("Item updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to update item";

      alert(message);
    }
  };

  if (!item) return <p>Loading item details...</p>;

  return (
    <ItemForm
      initialValues={item}
      submitText="Update Item"
      onSubmit={handleUpdate}
    />
  );
}

export default EditItemPage;