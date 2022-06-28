import "./TilesLibrary.css";
import React, { useEffect, useState } from "react";
import {
  availableTiles as tiles,
  tileToBgPosition,
} from "../providers/TilesService";
import {
  IPFS_LOOPRING_SITE,
  IPFS_META_URL,
} from "@loopring-web/common-resources";
import { useMyNFT } from "../../NFTPage/MyNFT/hook";
import { nftMApper } from "../providers/nftMapper";

export default function TilesLibrary({ selectedTile, onSelect }) {
  const [indexValue, setIndexValue] = useState({ id: 1, start: 54, end: 100 });
  const [filteredTiles, setFilteredTiles] = useState(tiles);
  const {
    onDetail,
    nftList,
    isLoading,
    page,
    total,
    onPageChange,
    resetLayer2NFT,
  } = useMyNFT();

  useEffect(() => {
    const newTiles = [];
    nftList.map((item, index) => {
      const job = item.metadata
        ? JSON.parse(item.metadata?.extra.attributes).filter(
            (nft) => nft.trait_type == "Job"
          )
        : [];
      const fullSrc = item?.image?.replace(IPFS_META_URL, IPFS_LOOPRING_SITE);
      const nftName = item.name;
      const mapper = nftMApper.find((item) => item.job === job[0]?.value);

      if (mapper !== undefined) {
        tiles.map((tile, index) => {
          if (index >= indexValue.start && index <= indexValue.end) {
            if (mapper.tiles.includes(index)) {
              newTiles.push({
                ...tile,
                originalIndex: index,
                nftImage: fullSrc,
                nftName: nftName,
              });
            } else if (indexValue.id !== 1) {
              newTiles.push({ ...tile, originalIndex: index });
            }
          }
        });
      }
    });

    setFilteredTiles(newTiles);
  }, [indexValue]);

  const handleSelect = (index, customIndex, newNftSelection) => {
    onSelect(index, customIndex, newNftSelection);
    // Removes tile...
    // const newTiles = [...filteredTiles];
    // newTiles.splice(customIndex, 1);
    // setFilteredTiles(newTiles);
  };
  return (
    <div className="tiles-library">
      <h1>library</h1>
      <div className="tile-tabs">
        <a onClick={() => setIndexValue({ id: 1, start: 54, end: 100 })}>
          Buildings
        </a>
        <a onClick={() => setIndexValue({ id: 2, start: 0, end: 45 })}>Roads</a>
        <a onClick={() => setIndexValue({ id: 3, start: 48, end: 53 })}>
          Water
        </a>
        <a></a>
      </div>
      <div className="tiles-container">
        {filteredTiles.map((tile, i) => (
          <div
            key={i}
            className={`tile ${selectedTile === i ? "selected" : ""}`}
            onClick={() =>
              handleSelect(tile.originalIndex, i, {
                image: tile.nftImage,
                name: tile.nftName,
              })
            }
          >
            {tile.nftImage && (
              <div
                className="tile-nft"
                style={{ background: `url(${tile.nftImage})` }}
              ></div>
            )}
            <div
              className="tile-img"
              style={{ backgroundPosition: tileToBgPosition(tile) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
