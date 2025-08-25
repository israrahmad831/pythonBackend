import React from "react";

export default function ItemList({ items }) {
  if (!items.length) return <p>No items yet.</p>;
  return (
    <ul style={{ paddingLeft: 16 }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 6 }}>
          <strong>{it.name}</strong> — {it.description} (${Number(it.price).toFixed(2)})
        </li>
      ))}
    </ul>
  );
}
