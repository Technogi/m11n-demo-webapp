import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import UILink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Analytics";
import { useRouter } from "next/router";
import { Person } from "@mui/icons-material";
import Link from "next/link";
import { teal } from "@mui/material/colors";
import { useAuthenticator } from "@aws-amplify/ui-react";

function ResponsiveAppBar() {
  const router = useRouter();
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
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
            <Link href="/app" passHref>
              <UILink
                color={teal[50]}
                fontWeight={900}
                underline="hover"
                marginRight={4}
              >
                Home
              </UILink>
            </Link>
            <Link href="/sales" passHref>
              <UILink
                href="/sales"
                color={teal[50]}
                fontWeight={900}
                underline="hover"
                marginRight={4}
              >
                Sales
              </UILink>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Person color="action" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              <MenuItem>
                <Typography>{user?.username}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href={"/app"} passHref>
                  <UILink>
                    <Typography textAlign="center">Home</Typography>
                  </UILink>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href={"/sales"} passHref>
                  <UILink>
                    <Typography textAlign="center">Sales</Typography>
                  </UILink>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Link href={"/signout"} passHref>
                  <UILink>
                    <Typography textAlign="center">Logout</Typography>
                  </UILink>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
