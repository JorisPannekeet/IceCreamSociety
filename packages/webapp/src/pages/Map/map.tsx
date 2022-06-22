// @ts-nocheck
import styled from "@emotion/styled";
import { Box, Card, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { useMyNFT } from "../NFTPage/MyNFT/hook";
import {
  EmptyValueTag,
  getShortAddr,
  SoursURL,
  NFTLimit,
  IPFS_LOOPRING_SITE,
  IPFS_META_URL,
} from "@loopring-web/common-resources";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibHZsNW1hZ2UiLCJhIjoiY2wzeDE2dGJlMGZtdzNqcWc4Mzg5cDJ3byJ9._ZCflmx6nKRrhUO0qfB0Hg";
const Statusbar = styled(Box)`
  position: absolute;
  top: 76px;
  left: 20px;
  z-index: 9999;
  font-size: 20px;
  font-weight: 700;
`;
const StyledPaper = styled(Box)`
  & .mapboxgl-marker img {
    border-radius: 50%;
    width: 65px;
    height: 65px;
  }
  & .mapboxgl-map {
    width: 100%;
    height: 100%;
    background: url("https://img.freepik.com/free-vector/blue-sky-with-clouds-background-elegant_1017-26302.jpg?t=st=1654601680~exp=1654602280~hmac=4363df121a29a89853511d3b6a606c9231e7a798e5e15ff0a223b5de9cb53bc8&w=1380");
    background-size: cover;
    background-position: center;
  }
  .mapboxgl-ctrl-logo {
    display: none !important;
  }
  .mapboxgl-popup-content {
    color: #000;
  }
`;

const places = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        description: "City",
        rank: "Rank 2",
        icon: "theatre-15",
      },
      geometry: {
        type: "Point",
        coordinates: [-3.1, 8.2],
      },
    },
    {
      type: "Feature",
      properties: {
        description: "Town",
        rank: "Rank 1",
        icon: "theatre-15",
      },
      geometry: {
        type: "Point",
        coordinates: [10.214, 11],
      },
    },
  ],
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min).toFixed(2);
}

export const MapComponent = withTranslation("common")(
  ({ t }: WithTranslation) => {
    const {
      onDetail,
      nftList,
      isLoading,
      page,
      total,
      onPageChange,
      resetLayer2NFT,
    } = useMyNFT();

    const [markers, setMarkers] = useState(0);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-75.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(4);
    const [income, setIncome] = useState(0);

    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/lvl5mage/cl3x1aa02001d14peoj3k6mf0",
        center: [0, 0],
        zoom: zoom,
      });
      map.current.on("load", () => {
        map.current.addSource("city", {
          type: "image",
          url: "https://iili.io/hxic5g.png",
          coordinates: [
            [-10.214, 6.563],
            [3, 6.563],
            [3, -3.938],
            [-10.214, -3.938],
          ],
        });
        map.current.addSource("town", {
          type: "image",
          url: "https://iili.io/hxyVuS.png",
          coordinates: [
            [0.214, 11.563], // left-top
            [13, 11.563], // right-top
            [13, 1.938], // right-bottom
            [0.214, 1.938], // left-bottom
          ],
        });
        map.current.addLayer({
          id: "city",
          type: "raster",
          source: "city",
          paint: {
            "raster-fade-duration": 0,
          },
        });
        map.current.addLayer({
          id: "town",
          type: "raster",
          source: "town",
          paint: {
            "raster-fade-duration": 0,
          },
        });
        map.current.addSource("places", {
          type: "geojson",
          data: places,
        });

        map.current.addLayer({
          id: "poi-labels",
          type: "symbol",
          source: "places",
          layout: {
            "text-field": [
              "format",
              ["upcase", ["get", "description"]],
              { "font-scale": 1.3 },
              "\n",
              {},
              ["downcase", ["get", "rank"]],
              { "font-scale": 0.6 },
            ],
            "text-variable-anchor": ["top", "bottom", "left", "right"],
            "text-radial-offset": 0.5,
            "text-justify": "auto",
            "icon-image": ["get", "icon"],
          },
        });
      });
    });
    useEffect(() => {
      nftList.map((item, index) => {
        let markerx;
        let markery;
        const fullSrc = item?.image?.replace(IPFS_META_URL, IPFS_LOOPRING_SITE);

        // Create a DOM element for each marker.
        const el = document.createElement("div");
        const width = 40;
        const height = 40;
        el.className = "marker";

        const job = item.metadata
          ? JSON.parse(item.metadata?.extra.attributes).filter(
              (nft) => nft.trait_type == "Job"
            )
          : [];
        if (job[0]?.value === "Jobless") {
          setIncome(income + 1);
        } else {
          setIncome(income + 2);
        }

        markerx =
          job[0]?.value === "Jobless" || job[0]?.value === "Dad"
            ? randomIntFromInterval(4.5, 8)
            : randomIntFromInterval(-7, 0);
        markery =
          job[0]?.value === "Jobless" || job[0]?.value === "Dad"
            ? randomIntFromInterval(6, 7.6)
            : randomIntFromInterval(0, 2);

        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = "100%";
        el.innerHTML = `<img src="${fullSrc}" />`;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<b>${item.name}</b> <br/> Job: ${job[0].value}`
        );
        // Add markers to the map.
        new mapboxgl.Marker(el)
          .setLngLat([markerx, markery])
          .setPopup(popup)
          .addTo(map.current);
        setMarkers(markers + 1);
      });
    }, [isLoading]);

    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    });
    return (
      <>
        <StyledPaper
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Statusbar>Total income: {income} coins</Statusbar>
          <div ref={mapContainer} className="map-container" />
        </StyledPaper>
      </>
    );
  }
);
