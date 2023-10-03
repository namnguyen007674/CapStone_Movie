import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import style from "./menunav.module.scss";

const pages = ["Xem Phim", "Cụm Rạp", "Khuyến Mãi", "Member"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // scroll menu nav
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <AppBar position="static" className={style.header_nav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: "relative" }}>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item lg={3}>
              <div className={style.header_logo}>
                <a href="#">
                  <img
                    src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png"
                    alt="img-logo"
                  />
                </a>

                {/* Để Link chuyển hướng  */}
                <a href="" className={style.logo_text}>
                  MUA VÉ
                </a>
              </div>
            </Grid>
            <Grid item lg={5}>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  display: { xs: "none", md: "flex" },
                  margin: "0 25px",
                }}
              >
                {pages.map((page) => {
                  console.log(page);
                  return (
                    <Button
                      key={page}
                      onClick={() => {
                        handleScroll(page);
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        marginLeft: "10px",
                      }}
                      className={style.title_header}
                    >
                      {page}
                    </Button>
                  );
                })}
              </Box>
            </Grid>

            {/* Reponsive Menu  */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Grid item lg={4}>
              <Box sx={{ flexGrow: 0 }}>
                <div className={style.account}>
                  <div className={style.social_list}>
                    <a
                      className={style.social_item}
                      href="https://www.instagram.com/bhdstar.cineplex/"
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_in.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.tiktok.com/@bhdstar.cineplex"
                      className={style.social_item}
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_tiktok.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/user/BHDStar"
                      className={style.social_item}
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_YT.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/BHDStar"
                      className={style.social_item}
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_fb.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <a href="" className={style.text_account}>
                    ĐĂNG NHẬP
                  </a>
                </div>
              </Box>
            </Grid>
          </Grid>
          <img
            className={style.line_header}
            src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/line-header1.png"
            alt=""
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
