import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserAdmin, updateUserAdmin } from "../../../../../apis/adminUser";
import { Link, useNavigate, useParams } from "react-router-dom";

import style from "./AdminUpdateUser.module.scss";
import Swal from "sweetalert2";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8}$/,
      "Mật khẩu 8 ký tự, 1 ký tự hoa, 1 ký tự thường , 1 số"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDT: string()
    .required("Số điện thoại không được để trống")
    .matches(/^(0\d{9})$/, "Số điện thoại không đúng định dạng"),
});

function AdminUpdateUser() {
  // Hàm điều hướng
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Lấy thông tin usernames
  const { username } = useParams();
  // Lấy thông tin user từ API
  const { data:userProfile = [] } = useQuery({
    queryKey: ["adminUpdateUser"],
    queryFn: () => getUserAdmin(username),
    enabled: !!username,
  });
  const { mutate: handleUpdateUser, error } = useMutation({
    mutationFn: (values) => {
      const valuesForm = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        hoTen: values.hoTen,
        soDt: values.soDT,
        maNhom: "GP03",
        maLoaiNguoiDung: values.maLoaiNguoiDung,
      };
      return updateUserAdmin(valuesForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      Swal.fire("Cập nhật thành công!", "Chúc mừng bạn!", "success");
      reset({
        taiKhoan: "",
        matKhau: "",
        email: "",
        hoTen: "",
        soDT: "",
        maNhom: "",
        maLoaiNguoiDung: "",
      });
      navigate("/admin/userList");
    },
  });
  // Form input User
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDT: "",
      maNhom: "",
      maLoaiNguoiDung: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  // Hiển thị mật khẩu
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (userProfile.length) {
      reset({ ...userProfile[0] });
    }
  }, [userProfile]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleUpdateUser)}
      sx={{
        "& > :not(style)": { m: 1, minWidth: "300px" },
      }}
      noValidate
      autoComplete="off"
      className={style.AdminUpdateUser}
    >
      <Container maxWidth={"md"}>
        <Grid container spacing={3}>
          {/* Tiêu đề form  */}
          <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
            <h2 className={style.title}>CẬP NHẬT NGƯỜI DÙNG</h2>
          {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error} — <strong>Hãy kiểm tra lại!</strong>
              </Alert>
            )}
          </div>
          <Grid item xs={12} md={12}>
            <hr
              style={{
                background: "rgb(0 0 0 / 12%)",
                height: "1px",
                border: "none",
                marginTop: "20px",
              }}
            />
          </Grid>
          {/* Tài Khoản */}
          <Grid item xs={6} md={6}>
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  {...field}
                  fullWidth
                  error={!!errors.taiKhoan}
                  helperText={errors.taiKhoan?.message}
                  id="taiKhoan"
                  label="TÀI KHOẢN"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Mật Khẩu */}
          <Grid item xs={6} md={6}>
            <Controller
              name="matKhau"
              control={control}
              render={({ field }) => (
                <FormControl
                  error={!!errors.matKhau}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="matKhau">Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    id="matKhau"
                    aria-describedby="matKhau"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="PASSWORD"
                  />
                  <FormHelperText id="matKhau">
                    {errors.matKhau?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          {/* Họ tên  */}
          <Grid item xs={6} md={6}>
            <Controller
              control={control}
              name="hoTen"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  error={!!errors.hoTen}
                  helperText={errors.hoTen?.message}
                  id="hoTen"
                  label="HỌ VÀ TÊN"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Email  */}
          <Grid item xs={6} md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id="outlined-basic"
                  label="EMAIL"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Số điện thoại  */}
          <Grid item xs={6} md={6}>
            <Controller
              name="soDT"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  error={!!errors.soDT}
                  helperText={errors.soDT?.message}
                  id="soDT"
                  label="SỐ ĐIỆN THOẠI"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Mã loại người dùng  */}
          <Grid item xs={6} md={6}>
            <Controller
              name="maLoaiNguoiDung"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="maLoaiNguoiDung">
                    Mã Loại Người Dùng
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="maLoaiNguoiDung"
                    id="maLoaiNguoiDung"
                    label="MÃ LOẠI NGƯỜI DÙNG"
                  >
                    <MenuItem value={"KhachHang"}>Khách Hàng</MenuItem>
                    <MenuItem value={"QuanTri"}>Quản Trị</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <div className={style.adminUserFormBtn}>
          <hr
            style={{
              background: "rgb(0 0 0 / 12%)",
              height: "1px",
              border: "none",
              marginTop: "30px",
            }}
          />
          <div className={style.btnUpdateUser}>
            <Link to="/admin/userList">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ marginTop: "15px" }}
              >
                <KeyboardDoubleArrowLeftIcon />
                DANH SÁCH NGƯỜI DÙNG
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginTop: "15px" }}
            >
              Cập Nhật
            </Button>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default AdminUpdateUser;
