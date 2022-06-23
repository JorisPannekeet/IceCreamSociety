import "./TilesLibrary.css";
import React, { useEffect, useState } from "react";
import {
  availableTiles as tiles,
  tileToBgPosition,
} from "../providers/TilesService";

export default function TilesLibrary({ selectedTile, onSelect }) {
  const [indexValue, setIndexValue] = useState({ start: 54, end: 100 });
  const [filteredTiles, setFilteredTiles] = useState(tiles);

  useEffect(() => {
    const newTiles = [];
    tiles.map((item, index) => {
      if (index >= indexValue.start && index <= indexValue.end) {
        newTiles.push({ ...item, originalIndex: index });
      }
    });
    setFilteredTiles(newTiles);
  }, [indexValue]);

  const handleSelect = (index) => {
    onSelect(index);
    console.log({ index });
  };
  return (
    <div className="tiles-library">
      <h1>library</h1>
      <a onClick={() => setIndexValue({ start: 54, end: 100 })}>Buildings</a>
      <a onClick={() => setIndexValue({ start: 0, end: 45 })}>Infra</a>
      <a onClick={() => setIndexValue({ start: 48, end: 53 })}>Water</a>
      <a></a>
      {filteredTiles.map((tile, i) => (
        <div
          key={tile.originalIndex}
          className={`tile ${
            selectedTile === tile.originalIndex ? "selected" : ""
          }`}
          onClick={() => handleSelect(tile.originalIndex)}
        >
          <div
            className="tile-img"
            style={{ backgroundPosition: tileToBgPosition(tile) }}
          />
        </div>
      ))}
    </div>
  );
}
