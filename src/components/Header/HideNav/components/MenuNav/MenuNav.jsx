import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../../../../../modules/contexts/UserContext/UserContext";
import style from "./Menunav.module.scss";

const pages = ["Xem Phim", "Cụm Rạp", "Thành Viên", "Khuyến Mãi"];
const user = ["Hồ sơ", "Đăng xuất"];
const admin = ["Hồ sơ", "Quản Trị", "Đăng xuất"];

function MenuNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  // scroll menu nav
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element === null) {
      navigate("/");
    }

    element?.scrollIntoView({ behavior: "smooth" });
  };

  const { currentUser, handleSignout } = useUserContext();
  const handleMenuItemClick = (setting) => {
    if (setting === "Đăng xuất") {
      handleSignout();
    } else if (setting === "Quản Trị") {
      navigate("/admin/userList");
    } else {
      navigate("/account/user");
    }

    setAnchorElUser(null);
  };

  return (
    <div position="static" className={style.headerNav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: "relative" }}>
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: { md: "space-evenly" },
            }}
          >
            <Grid item md={3}>
              <div className={style.headerLogo}>
                <Link to="/">
                  <img
                    src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png"
                    alt="img-logo"
                  />
                </Link>

                <button
                  onClick={() => handleScroll("Xem Phim")}
                  className={style.logoBtn}
                >
                  MUA VÉ
                </button>
              </div>
            </Grid>
            <Grid item sx={{ display: { lg: "block" } }} md={5}>
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => {
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
                      className={style.titleHeader}
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
                  padding: { md: "0" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleScroll(page);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to="/">
              <Typography
                variant="h5"
                noWrap
                component="p"
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
                className={style.logoCenter}
              >
                <img
                  src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png"
                  alt="img-logo"
                />
              </Typography>
            </Link>

            {/* Social và User  */}
            <Grid item md={3}>
              <Box sx={{ flexGrow: 0 }}>
                <div className={style.account}>
                  <div className={style.socialList}>
                    <a
                      className={style.socialItem}
                      href="https://www.instagram.com/bhdstar.cineplex/"
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_in.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/BHDStar"
                      className={style.socialItem}
                    >
                      <img
                        src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/icon_fb.png"
                        alt=""
                      />
                    </a>
                  </div>

                  {/* Kiểm tra xem User đã đăng nhập chưa để hiển thị component tương ứng  */}
                  {currentUser ? (
                    // User đã đăng nhập

                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton
                          onClick={handleOpenUserMenu}
                          sx={{ p: 0, fontSize: { md: "16px", xs: "14px" } }}
                        >
                          <Avatar
                            className={style.avatarAccount}
                            sx={{ backgroundColor: "#FF5722" }}
                          >
                            {currentUser.hoTen[0]}
                          </Avatar>
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
                        {currentUser.maLoaiNguoiDung === "KhachHang"
                          ? user.map((user) => (
                              <MenuItem
                                key={user}
                                onClick={() => handleMenuItemClick(user)}
                              >
                                <Typography textAlign="center">
                                  {user}
                                </Typography>
                              </MenuItem>
                            ))
                          : admin.map((admin) => (
                              <MenuItem
                                key={admin}
                                onClick={() => handleMenuItemClick(admin)}
                              >
                                <Typography textAlign="center">
                                  {admin}
                                </Typography>
                              </MenuItem>
                            ))}
                      </Menu>
                    </Box>
                  ) : (
                    // Chưa đăng nhập hiện nút sign-in
                    <Link to={"/sign-in"} className={style.textAccount}>
                      ĐĂNG NHẬP
                    </Link>
                  )}
                </div>
              </Box>
            </Grid>
          </Grid>
          <img
            className={style.lineHeader}
            src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/line-header1.png"
            alt=""
          />
        </Toolbar>
      </Container>
    </div>
  );
}
export default MenuNav;
