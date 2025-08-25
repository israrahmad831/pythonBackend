import React, { useState } from "react";
import { deleteItem, updateItem } from "../services/api";

type Item = { name: string; description: string; price: string | number };
type Props = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const ItemList: React.FC<Props> = ({ items, setItems }) => {
  const [editIdx, setEditIdx] = useState<number>(-1);
  const [edit, setEdit] = useState<Item>({
    name: "",
    description: "",
    price: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleDelete = async (name: string) => {
    setStatus("Deleting...");
    try {
      await deleteItem(name);
      setItems((prev) => prev.filter((it) => it.name !== name));
      setStatus("");
    } catch (e: any) {
      setStatus(e.message);
    }
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEdit(items[idx]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Updating...");
    try {
      const oldName = items[editIdx].name;
      await updateItem(oldName, {
        name: edit.name,
        description: edit.description,
        price: edit.price,
      });
      setItems((prev) =>
        prev.map((it, i) => (i === editIdx ? { ...edit } : it))
      );
      setEditIdx(-1);
      setStatus("");
    } catch (e: any) {
      setStatus(e.message);
    }
  };

  if (!items.length) return <p>No items yet.</p>;
  return (
    <ul style={{ paddingLeft: 16 }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 6 }}>
          {editIdx === i ? (
            <form onSubmit={handleUpdate} style={{ display: "inline" }}>
              <input
                value={edit.name}
                onChange={(e) =>
                  setEdit((ed) => ({ ...ed, name: e.target.value }))
                }
                style={{ width: 100 }}
                required
              />
              <input
                value={edit.description}
                onChange={(e) =>
                  setEdit((ed) => ({ ...ed, description: e.target.value }))
                }
                style={{ width: 120 }}
                required
              />
              <input
                type="number"
                value={edit.price}
                onChange={(e) =>
                  setEdit((ed) => ({ ...ed, price: e.target.value }))
                }
                style={{ width: 60 }}
                required
                min="0"
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditIdx(-1)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <strong>{it.name}</strong> — {it.description} ($
              {Number(it.price).toFixed(2)})
              <button style={{ marginLeft: 8 }} onClick={() => handleEdit(i)}>
                Edit
              </button>
              <button
                style={{ marginLeft: 4 }}
                onClick={() => handleDelete(it.name)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
      {status && <li style={{ color: "red" }}>{status}</li>}
    </ul>
  );
};

export default ItemList;
