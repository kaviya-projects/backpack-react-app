import React, { useState, useEffect } from "react";

// 🎒 Backpack React App
// Features:
// ✅ Add items (name, qty, weight)
// ✅ Toggle packed/unpacked
// ✅ Remove items
// ✅ Clear packed items
// ✅ Save to localStorage

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("backpack_items_v1");
      return saved ? JSON.parse(saved) : sampleItems();
    } catch (e) {
      return sampleItems();
    }
  });

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0.5);

  useEffect(() => {
    localStorage.setItem("backpack_items_v1", JSON.stringify(items));
  }, [items]);

  function sampleItems() {
    return [
      { id: 1, name: "Water Bottle", qty: 1, weight: 0.6, packed: false },
      { id: 2, name: "Notebook", qty: 2, weight: 0.4, packed: true },
      { id: 3, name: "Jacket", qty: 1, weight: 0.9, packed: false },
    ];
  }

  function addItem(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const next = {
      id: Date.now(),
      name: trimmed,
      qty: Math.max(1, Number(quantity) || 1),
      weight: Math.max(0, Number(weight) || 0),
      packed: false,
    };

    setItems((s) => [next, ...s]);
    setName("");
    setQuantity(1);
    setWeight(0.5);
  }

  function togglePacked(id) {
    setItems((s) =>
      s.map((it) => (it.id === id ? { ...it, packed: !it.packed } : it))
    );
  }

  function removeItem(id) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  function clearPacked() {
    setItems((s) => s.filter((it) => !it.packed));
  }

  const totalItems = items.reduce((acc, it) => acc + it.qty, 0);
  const totalWeight = items
    .reduce((acc, it) => acc + it.qty * it.weight, 0)
    .toFixed(2);

  // Inline styles
  const styles = {
    app: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      maxWidth: 900,
      margin: "28px auto",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      background: "#fff",
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { margin: 0 },
    form: { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" },
    input: { padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" },
    btn: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: "#0b6efd",
      color: "#fff",
    },
    smallBtn: {
      padding: "6px 8px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: "#e6e6e6",
    },
    list: { marginTop: 18, display: "grid", gap: 10 },
    item: {
      padding: 12,
      borderRadius: 10,
      border: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemLeft: { display: "flex", gap: 12, alignItems: "center" },
    meta: { fontSize: 13, color: "#555" },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🎒 Backpack</h1>
          <div style={{ color: "#666", marginTop: 6 }}>
            Items: <strong>{items.length}</strong> • Total qty:{" "}
            <strong>{totalItems}</strong> • Total weight:{" "}
            <strong>{totalWeight} kg</strong>
          </div>
        </div>
        <div>
          <button
            style={{ ...styles.smallBtn }}
            onClick={() => setItems(sampleItems())}
            title="Reset to sample items"
          >
            Reset
          </button>{" "}
          <button
            style={{ ...styles.smallBtn, marginLeft: 8 }}
            onClick={clearPacked}
            title="Remove all packed items"
          >
            Clear packed
          </button>
        </div>
      </div>

      <form style={styles.form} onSubmit={addItem} aria-label="Add item form">
        <input
          style={{ ...styles.input, minWidth: 200 }}
          placeholder="Item name (e.g. Phone Charger)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Item name"
        />

        <input
          style={{ ...styles.input, width: 90 }}
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          aria-label="Quantity"
        />

        <input
          style={{ ...styles.input, width: 110 }}
          type="number"
          step="0.1"
          min={0}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          aria-label="Weight per item (kg)"
        />

        <button style={styles.btn} type="submit">
          Add
        </button>
      </form>

      <div style={styles.list}>
        {items.length === 0 && (
          <div style={{ color: "#666" }}>
            No items yet — add something to your backpack.
          </div>
        )}

        {items.map((it) => (
          <div
            key={it.id}
            style={{ ...styles.item, opacity: it.packed ? 0.7 : 1 }}
          >
            <div style={styles.itemLeft}>
              <input
                aria-label={`Packed ${it.name}`}
                type="checkbox"
                checked={it.packed}
                onChange={() => togglePacked(it.id)}
              />

              <div>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div style={styles.meta}>
                  qty: {it.qty} • {it.weight} kg each • subtotal:{" "}
                  {(it.qty * it.weight).toFixed(2)} kg
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                aria-label={`Remove ${it.name}`}
                onClick={() => removeItem(it.id)}
                style={{ ...styles.smallBtn }}
                title="Remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: 20, color: "#666" }}>
        Tip: check the items you've packed and clear them before leaving. This
        app is intentionally kept simple so it fits in a single <code>App.js</code> file.
      </footer>
    </div>
  );
}
