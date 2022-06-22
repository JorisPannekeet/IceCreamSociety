import styled from "@emotion/styled/macro";
import { Box, Container, Link, List, Typography } from "@mui/material";
import React from "react";
import { FooterInterface, LoopringIcon } from "@loopring-web/common-resources";
import { WithTranslation, withTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useSettings } from "../../stores";

const LinkStyle = styled(Link)`
  color: var(--color-text-secondary);
  line-height: 20px;
  font-size: 12px;

  &:hover {
    color: var(--color-text-hover);
  }
` as typeof Link;
const FooterDiv = styled(Box)`
  background: var(--color-global-bg);
`;

export const Footer = withTranslation(["layout"])(
  ({
    t,
    linkListMap,
    mediaList,
    isLandingPage,
  }: {
    isLandingPage: boolean;
    linkListMap: { [key: string]: FooterInterface[] };
    mediaList: FooterInterface[];
  } & WithTranslation) => {
    const { mode } = useTheme();
    const { isMobile } = useSettings();
    React.useLayoutEffect(() => {
      function updateSize() {
        // setSize([1200, window.innerHeight - HeightConfig.headerHeight - HeightConfig.whiteHeight]);
      }

      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    const linkListMapRender = React.useMemo(() => {
      return "";
    }, [linkListMap]);

    const medias = React.useMemo(() => {
      return (
        <List
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {mediaList.map((o, index) => (
            <Typography paddingRight={2} key={`${o.linkName}-${index}`}>
              <LinkStyle
                fontSize={28}
                display={"inline-block"}
                width={28}
                href={o.linkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {o.linkName}
              </LinkStyle>
            </Typography>
          ))}
        </List>
      );
    }, [mediaList]);

    return (
      <FooterDiv component={"footer"} fontSize={"body1"}>
        {/*<Divider />*/}

        {!!(isLandingPage && !isMobile) ? (
          <Container>
            <>
              <Box
                position={"relative"}
                // height={size[ 1 ]}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width={"100%"}
                paddingBottom={4}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  <Box
                    marginTop={4}
                    marginLeft={-3}
                    minWidth={100}
                    alignSelf={"flex-start"}
                    justifySelf={"center"}
                    display={"inline-flex"}
                    alignItems={"center"}
                  ></Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    width={168}
                  ></Box>
                </Box>
              </Box>
              <Typography
                fontSize={12}
                component={"p"}
                textAlign={"center"}
                paddingBottom={2}
                color={"var(--color-text-third)"}
              ></Typography>
            </>
          </Container>
        ) : (
          <Box
            height={48}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            style={{
              backgroundColor:
                mode === "light"
                  ? "rgba(59, 90, 244, 0.05)"
                  : "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Container>
              <Box
                display={"flex"}
                flex={1}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={12}
                  component={"span"}
                  color={"var(--color-text-third)"}
                  paddingLeft={2}
                ></Typography>
                <Box>{medias}</Box>
              </Box>
            </Container>
          </Box>
        )}
      </FooterDiv>
    );
  }
);
