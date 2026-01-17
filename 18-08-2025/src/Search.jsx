import React, { useState } from "react";

const items = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Pune",
  "Coimbatore",
  "Madurai",
  "Trichy"
];

export default function SearchHighlight() {
  const [search, setSearch] = useState("");

  const highlightMatch = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding : "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* Container box */}
      <div
        style={{
          backgroundColor: "gray",
          padding: "30px",
          paddingRight: "50px",
          borderRadius: "10px",
          boxShadow: "0 10px 90px rgba(0, 0, 0, 0.2)",
          width: "390px",
          minHeight: "390px"
        }}
      >
        <h2 style={{ textAlign: "center", color: "black", marginBottom: "20px" }}>
          Dynamic Search with Highlighting
        </h2>

        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <h2>City's :</h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px", fontSize: "16px" }}>
              {highlightMatch(item, search)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
