import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  getCinemaInSystem,
  getCinemaSystems,
} from "../../../../../apis/cinema";
import { getMovie } from "../../../../../apis/adminMovie";
import { showTimeMovie } from "../../../../../apis/adminShowTime";
import style from "./AdminMovieShowtime.module.scss";
import Swal from "sweetalert2";
export default function AdminMovieShowtime() {
  // Lấy mã phim
  const { movieId } = useParams();
  const [cinemaSystemId, setCinemSystemId] = useState("");
  // API hệ thống rạp
  const { data: cinemaSystem = [] } = useQuery({
    queryKey: ["adminCinemaSystem"],
    queryFn: getCinemaSystems,
  });
  // API cụm rạp
  const { data: cinemas = [] } = useQuery({
    queryKey: ["adminCinemas"],
    queryFn: () => getCinemaInSystem(cinemaSystemId),
    enabled: !!cinemaSystemId,
  });
  // API thông tin phim
  const { data: profileMovie = {} } = useQuery({
    queryKey: ["adminProfileMovie"],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
  });
  // API tạo lịch chiếu
  const { mutate: onSubmit, error } = useMutation({
    mutationFn: (value) => {
      const formValues = { ...value, maPhim: movieId };
      return showTimeMovie(formValues);
    },
    onSuccess: () => {
      Swal.fire("Tạo lịch thành công!", "Chúc mừng bạn!", "success");
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
  });

  return (
    <div className={style.AdminMovieShowtime}>
      <Typography sx={{ color: "#ec5990", fontSize: "35px" }} variant="h6">
        THÊM LỊCH CHIẾU
      </Typography>
      <Container>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, minWidth: "300px" },
          }}
          noValidate
          autoComplete="off"
          className={style.addUserForm}
        >
          <Grid container spacing={2}>
            <Grid item md={6}>
              <div className={style.showTimeImg}>
                <img
                  src={profileMovie.hinhAnh}
                  width={300}
                  height={300}
                  alt={profileMovie.biDanh}
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={style.showTimeDetail}>
                <Box sx={{ minWidth: 120 }}>
                  {/* Danh sách hệ thống rạp */}
                  <FormControl fullWidth>
                    <InputLabel id="cinemaSystem">Hệ Thống Rạp</InputLabel>
                    <Select
                      defaultValue=""
                      labelId="cinemaSystem"
                      id="cinemaSystem"
                      label="Hệ Thống Rạp"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {cinemaSystem.map((cinemaSystem) => (
                        <MenuItem
                          sx={{ textTransform: "uppercase" }}
                          onClick={() =>
                            setCinemSystemId(cinemaSystem.maHeThongRap)
                          }
                          key={cinemaSystem.maHeThongRap}
                          value={cinemaSystem.maHeThongRap}
                        >
                          {cinemaSystem.tenHeThongRap}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Danh sách cụm rạp  */}
                  <FormControl
                    error={!!errors.maRap}
                    fullWidth
                    sx={{ margin: "30px 0" }}
                  >
                    <InputLabel id="cinemas">Cụm Rạp</InputLabel>
                    <Select
                      defaultValue=""
                      {...register("maRap", {
                        required: {
                          value: true,
                          message: "Vui lòng chọn hệ thống rạp",
                        },
                      })}
                      labelId="cinemas"
                      id="cinemas"
                      label="Cụm Rạp"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {cinemas.map((cinema) => (
                        <MenuItem
                          sx={{ textTransform: "uppercase" }}
                          value={cinema.maCumRap}
                          key={cinema.maCumRap}
                        >
                          {cinema.tenCumRap}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.maRap?.message}</FormHelperText>
                  </FormControl>
                </Box>
                {/* Ngày Khởi Chiếu  */}
                <div className="movieTime">
                  <Typography sx={{ fontSize: "15px", paddingBottom: "5px" }}>
                    Ngày Khởi Chiếu
                  </Typography>
                  <TextField
                    error={!!errors.ngayChieuGioChieu}
                    helperText={errors.ngayChieuGioChieu?.message}
                    {...register("ngayChieuGioChieu", {
                      setValueAs: (value) => {
                        return dayjs(value).format("DD/MM/YYYY hh:mm:ss");
                      },
                      required: {
                        value: true,
                        message: "Ngày không hợp lệ",
                      },
                    })}
                    type="datetime-local"
                  />
                </div>
                {/* Giá Vé  */}
                <div className={style.ticketPrice}>
                  <TextField
                    InputProps={{
                      inputProps: {
                        min: 75000,
                        step: 1000,
                      },
                    }}
                    {...register("giaVe", {
                      required: {
                        value: true,
                        message: "Giá vé không được để trống",
                      },
                      min: {
                        value: 75000,
                        message: "Thấp nhất là 75.000",
                      },
                      max: {
                        value: 200000,
                        message: "Lớn nhất là 200.000",
                      },
                      pattern: {
                        value: /.*[0-9].*/,
                        message: "Giá vé phải là số",
                      },
                    })}
                    type="number"
                    error={!!errors.giaVe}
                    helperText={errors.giaVe?.message}
                    label="Giá Vé"
                  />
                </div>
                <div className={style.btnShowTime}>
                  <Button type="submit" variant="contained" color="success">
                    TẠO LỊCH CHIẾU
                  </Button>
                </div>
                {error && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error} — <strong>Hãy kiểm tra lại!</strong>
                  </Alert>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
