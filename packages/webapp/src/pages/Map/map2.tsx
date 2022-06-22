// @ts-nocheck
import styled from "@emotion/styled";
import { Box, Card, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { useMyNFT } from "../NFTPage/MyNFT/hook";
import TilesBuilder from "./components/src/components/TilesBuilder";

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

    return (
      <>
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TilesBuilder />
        </Box>
      </>
    );
  }
);
