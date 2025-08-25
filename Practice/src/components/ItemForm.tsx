import React, { useState } from "react";
import { addItem, fetchItems } from "../services/api";

export default function ItemForm({ setItems }) {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      await addItem(form);
      const list = await fetchItems();
      setItems(list);
      setForm({ name: "", description: "", price: "" });
      setStatus("Saved ✓");
      setTimeout(() => setStatus(null), 1000);
    } catch (err) {
      setStatus(err.message || "Error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 8, maxWidth: 420 }}
    >
      <input
        name="name"
        placeholder="Item name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
        required
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={onChange}
        required
        min="0"
      />
      <button type="submit">Save Item</button>
      {status && <small>{status}</small>}
    </form>
  );
}
