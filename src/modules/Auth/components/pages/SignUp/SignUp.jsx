import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../../../apis/user";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loading from "../../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Validation input
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
  soDt: string()
    .required("Số điện thoại không được để trống")
    .matches(/^(0\d{9})$/, "Số điện thoại không đúng định dạng"),
});

export default function SignUp() {
  const navigate = useNavigate();
  // Lưu trữ giá trị State input
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    resolver: yupResolver(signupSchema),
  });

  // Gọi API Đăng ký
  const {
    mutate: handleSignUp,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (valueform) => signup(valueform),
    onSuccess: () => {
      navigate("/sign-in");
      Swal.fire("Đăng ký thành công!", "Chúc mừng bạn!", "success");
      reset({
        taiKhoan: "",
        matKhau: "",
        email: "",
        hoTen: "",
        soDt: "",
      });
    },
  });

  // Hiển thị mật khẩu
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSignUp)}
      sx={{
        "& > :not(style)": { m: 1, minWidth: "300px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth={"xs"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              {...register("taiKhoan")}
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
              id="taiKhoan"
              label="TÀI KHOẢN"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl error={!!errors.matKhau} fullWidth variant="outlined">
              <InputLabel htmlFor="matKhau">Password</InputLabel>
              <OutlinedInput
                {...register("matKhau")}
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
                label="Password"
              />
              <FormHelperText id="matKhau">
                {errors.matKhau?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              {...register("hoTen")}
              error={!!errors.hoTen}
              helperText={errors.hoTen?.message}
              id="hoTen"
              label="HỌ VÀ TÊN"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              id="outlined-basic"
              label="EMAIL"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              {...register("soDt")}
              error={!!errors.soDt}
              helperText={errors.soDt?.message}
              id="soDt"
              label="SỐ ĐIỆN THOẠI"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="success"
            >
              ĐĂNG KÝ
            </Button>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error} — <strong>Hãy kiểm tra lại!</strong>
              </Alert>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
