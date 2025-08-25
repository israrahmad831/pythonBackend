import React, { useEffect, useState } from "react";
import ItemForm from "../src/components/ItemForm";
import ItemList from "../src/components/ItemList";
import { fetchItems } from "../src/services/api";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((e) => console.error(e));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h2>Item Manager</h2>
      <ItemForm setItems={setItems} />
      <h3 style={{ marginTop: 24 }}>Items</h3>
  <ItemList items={items} setItems={setItems} />
    </div>
  );
}
