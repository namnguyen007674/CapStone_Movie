import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
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
} from "@mui/material";
import { getProfileUser, updateUser } from "../../../../apis/user";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import style from "./FormUser.module.scss";

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

export default function FormUserAccount() {
  const { currentUser } = useUserContext();
  const queryClient = useQueryClient();

  // Gọi API lấy thông tin user
  const { data:profileUser = [], isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => getProfileUser(currentUser.maNhom, currentUser.taiKhoan),
    refetchOnWindowFocus: false,
  });

  // Gọi API cập nhật thông tin User
  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (value) => updateUser(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      Swal.fire("Cập nhật thành công!", "Chúc mừng bạn!", "success");
    },
  });

  // Form input User
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
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

  // select input
  const typeUser = [
    { label: "Khách Hàng", value: "KhachHang" },
    { label: "Quản Trị", value: "QuanTri" },
  ];

  // Xử lý handleSubmit thành công
  const onSuccess = (values) => {
    const valuesForm = {
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
      email: values.email,
      hoTen: values.hoTen,
      soDt: values.soDT,
      maNhom: values.maNhom,
      maLoaiNguoiDung: values.maLoaiNguoiDung,
    };
    handleUpdateUser(valuesForm);
  };

  // Set lại giá trị value cho input khi có dữ liệu từ API
  useEffect(() => {
    if (profileUser.length) {
      reset({ ...profileUser[0], maNhom: currentUser.maNhom });
    }
  }, [profileUser]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSuccess)}
      sx={{
        "& > :not(style)": { m: 1, minWidth: "300px" },
      }}
      noValidate
      autoComplete="off"
      className={style.formUser}
    >
      <Container maxWidth={"md"}>
        <Grid container spacing={3}>
          {/* Tiêu đề form  */}
          <Grid item xs={12} md={12}>
            <h1 className={style.formUserTitle}>Cài đặt tài khoản chung</h1>
            <h4>Thông tin có thể được thay đổi</h4>
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
          <Grid item xs={12} md={6}>
            <Controller
              name="taiKhoan"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  InputProps={{
                    readOnly: true,
                  }}
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <Controller
              name="maLoaiNguoiDung"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="maLoaiNguoiDung"
                  fullWidth
                  select
                  label="MÃ LOẠI NGƯỜI DÙNG"
                  SelectProps={{
                    native: true,
                    readOnly: true,
                  }}
                >
                  {typeUser.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
        <div className={style.btnFormUser}>
          <hr
            style={{
              background: "rgb(0 0 0 / 12%)",
              height: "1px",
              border: "none",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ marginTop: "20px" }}
          >
            CẬP NHẬT
          </Button>
        </div>
      </Container>
    </Box>
  );
}
