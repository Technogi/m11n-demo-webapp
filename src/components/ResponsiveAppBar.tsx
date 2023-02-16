import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import UILink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Analytics";
import { Settings } from "@mui/icons-material";
import Link from "next/link";
import { teal } from "@mui/material/colors";
import { useAuthenticator } from "@aws-amplify/ui-react";
import config from "next/config";
import { appLinks } from "./app-links";
import MobileMenu from "./MobileMenu";

const { publicRuntimeConfig } = config() || {};

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenu />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/app"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POStats
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,

              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POStats
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography color={teal[50]} marginRight={4}>
              |
            </Typography>
            {appLinks.map(({ url, label, icon }, idx) => (
              <Link key={`menu_item_${idx}`} href={url} passHref>
                <UILink
                  color={teal[50]}
                  fontWeight={500}
                  underline="hover"
                  marginRight={4}
                  display="flex"
                >
                  <span style={{ marginRight: "0.4em" }}>{label}</span>
                  {icon}
                </UILink>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Typography
              sx={{ marginRight: 1, display: { xs: "none", md: "block" } }}
            >
              {user?.username}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Settings color="inherit" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="user-menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href={"/signout"} passHref>
                  <UILink>
                    <Typography textAlign="center">Logout</Typography>
                  </UILink>
                </Link>
              </MenuItem>
              <hr />
              <MenuItem>
                <Typography sx={{ fontSize: 12 }}>
                  v{publicRuntimeConfig?.version}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
