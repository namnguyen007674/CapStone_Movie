import React, { useRef } from "react";
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
import { signin } from "../../../../../apis/user";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import { Navigate, useSearchParams } from "react-router-dom";
import Loading from "../../../../../components/Loading/Loading";

// Validation input
const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8}$/,
      "Mật khẩu 8 ký tự, 1 ký tự hoa, 1 ký tự thường , 1 số"
    ),
});

export default function SignIn() {
  // Lấy thông tin user từ context
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();
  // Dùng useSearchParams để lấy thông tin từ URL
  const [searchParams] = useSearchParams();

  // Lưu trữ giá trị State input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signupSchema)
  });

  // Gọi API Đăng Nhập
  const {
    mutate: handleSignIn,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (valueform) => signin(valueform),
    onSuccess: (data) => {
      // Đăng nhập thành công giữ phiên đăng nhập
      onSigninSuccess(data);
    },
  });
  // Delay người dùng nhấp vào button
  const timer = useRef();

  // Submit thành công
  const onSuccess = (valueform) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      handleSignIn(valueform);
    }, 300);
  };

  // Hiển thị mật khẩu
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // currentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }
  if(isLoading) {
    return <Loading/>
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSuccess)}
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
            <FormControl
              error={!!errors.matKhau}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="matKhau">
                Password
              </InputLabel>
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
              <FormHelperText  id="matKhau">
              {errors.matKhau?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              ĐĂNG NHẬP
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
