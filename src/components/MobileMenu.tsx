import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Link as UILink,
} from "@mui/material";
import { appLinks } from "./app-links";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url: string) => () => {
    router.push(url);
    setAnchorEl(null);
  };
  //aria-controls={open ? 'basic-menu' : undefined}
  //aria-expanded={open ? 'true' : undefined}

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {appLinks.map(({ label, icon, url }, idx) => (
          <MenuItem
            key={`key_for_menu_item_${idx}`}
            sx={{ minWidth: "12em" }}
            onClick={handleClose(url)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
