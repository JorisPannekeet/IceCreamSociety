import { useRouteMatch } from "react-router-dom";

import { Box, Button, Divider, Typography } from "@mui/material";
import {
  SubMenu,
  SubMenuList,
  useOpenModals,
  useSettings,
} from "@loopring-web/component-lib";
import { useTranslation } from "react-i18next";
import {
  AccountStatus,
  SoursURL,
  subMenuNFT,
} from "@loopring-web/common-resources";
import React from "react";
import { useAccount, WalletConnectL2Btn } from "@loopring-web/core";
import { MyNFTPanel } from "../NFTPage/MyNFT";
import { MyNFTHistory } from "../NFTPage/NFThistory";
import { MintNFTPanel } from "../NFTPage/MintNFTPanel";
import { DepositNFTPanel } from "../NFTPage/NFTDeposit";
import { mintService } from "@loopring-web/core";
import { TitleNFTMobile } from "../NFTPage/components/titleNFTMobile";
import { MapComponent } from "./map2";
export const subMenu = subMenuNFT;

export const MapPage = () => {
  let match: any = useRouteMatch("/NFT/:item");
  const selected = match?.params.item ?? "assetsNFT";
  const { account } = useAccount();
  const { setShowNFTMintAdvance } = useOpenModals();
  const { t } = useTranslation(["common", "layout"]);
  const routerNFT = React.useMemo(() => {
    switch (selected) {
      case "transactionNFT":
        return <MyNFTHistory />;
      case "mintNFT":
        mintService.emptyData();
        return <MintNFTPanel />;
      case "depositNFT":
        return <DepositNFTPanel />;
      case "assetsNFT":
      default:
        return <MyNFTPanel />;
    }
  }, [selected]);
  const { isMobile } = useSettings();
  // myLog("assetTitleProps", assetTitleProps.assetInfo);
  const viewTemplate = React.useMemo(() => {
    switch (account.readyState) {
      case AccountStatus.UN_CONNECT:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              textAlign={"center"}
            >
              {t("describeTitleConnectToWallet")}
            </Typography>
            <WalletConnectL2Btn />
          </Box>
        );
        break;
      case AccountStatus.LOCKED:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              textAlign={"center"}
            >
              {t("describeTitleLocked")}
            </Typography>
            <WalletConnectL2Btn />
          </Box>
        );
        break;
      case AccountStatus.NO_ACCOUNT:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              whiteSpace={"pre-line"}
              textAlign={"center"}
            >
              {t("describeTitleNoAccount")}
            </Typography>
            <WalletConnectL2Btn />
          </Box>
        );
        break;
      case AccountStatus.NOT_ACTIVE:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              textAlign={"center"}
            >
              {t("describeTitleNotActive")}
            </Typography>
            <WalletConnectL2Btn />
          </Box>
        );
        break;
      case AccountStatus.DEPOSITING:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <img
              className="loading-gif"
              alt={"loading"}
              width="60"
              src={`${SoursURL}images/loading-line.gif`}
            />
            {/*<LoadingIcon color={"primary"} style={{ width: 60, height: 60 }} />*/}
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              textAlign={"center"}
            >
              {t("describeTitleOpenAccounting")}
            </Typography>
            {/*<WalletConnectL2Btn/>*/}
          </Box>
        );
        break;
      case AccountStatus.ERROR_NETWORK:
        return (
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              marginY={3}
              variant={isMobile ? "h4" : "h1"}
              textAlign={"center"}
            >
              {t("describeTitleOnErrorNetwork", {
                connectName: account.connectName,
              })}
            </Typography>
            {/*<WalletConnectL2Btn/>*/}
          </Box>
        );
        break;

      case AccountStatus.ACTIVATED:
        return (
          <>
            <Box
              // minHeight={420}
              display={"flex"}
              alignItems={"stretch"}
              flexDirection={"column"}
              marginTop={0}
              flex={1}
            >
              <MapComponent />
            </Box>
          </>
        );
      default:
        break;
    }
  }, [t, account.readyState, selected, isMobile]);

  return <>{viewTemplate}</>;
};
