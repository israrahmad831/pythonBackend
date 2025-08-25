const API = "http://127.0.0.1:5000/api";

export async function fetchItems() {
  const res = await fetch(`${API}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function addItem(payload) {
  const res = await fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err.errors && err.errors.join(", ")) || "Add item failed");
  }
  return res.json();
}

export async function updateItem(name: string, newData: { description: string; price: string | number }) {
  const res = await fetch(`${API}/items`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, new_data: newData }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Update failed");
  }
  return res.json();
}

export async function deleteItem(name: string) {
  const res = await fetch(`${API}/items`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Delete failed");
  }
  return res.json();
}
