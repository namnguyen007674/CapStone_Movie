import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMovie, getMovieList } from "../../../../../apis/adminMovie";
import style from "./AdminMovieList.module.scss";
import Swal from "sweetalert2";

export default function AdminMovieList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = React.useState("");
  const time = React.useRef();
  // Lấy danh sách phim từ API
  const { data:movieList = [] } = useQuery({
    queryKey: ["movieList"],
    queryFn: getMovieList,
  });

  // Xoá phim
  const { mutate: onDeteleMovie } = useMutation({
    mutationFn: (movieId) => deleteMovie(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movieList"] });
    },
  });
  const handleDeleteMovie = (movieId)=>{
    Swal.fire({
      title: "Bạn muốn xoá người dùng này?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Huỷ bỏ",
      confirmButtonText: "Đồng ý, Xoá!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeteleMovie(movieId)
        Swal.fire("Deleted!", "Bạn đã xoá thành công.", "success");
      }
    });
  }
  // Search Input
  const handleChange = (e) => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300);
  };

  const columns = [
    { field: "id", headerName: "Mã Phim", width: 130 },
    {
      field: "hinhAnh",
      headerName: "Hình Ảnh",
      width: 200,
      renderCell: (params) => {
        return (
          <img
            src={params.row.hinhAnh}
            width={80}
            height={80}
            alt={params.row.tenPhim}
          />
        );
      },
    },
    { field: "tenPhim", headerName: "Tên Phim", width: 200 },
    {
      field: "moTa",
      headerName: "Mô Tả",
      width: 350,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div className={style.rowDesc}>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "thaoTac",
      headerName: "Thao Tác",
      width: 100,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            <Link to={`/admin/updateMovie/${params.id}`}>
              <Tooltip title={"Chỉnh sửa"}>
                <DriveFileRenameOutlineIcon color="warning" />
              </Tooltip>
            </Link>
            <Tooltip
              onClick={() => handleDeleteMovie(params.id)}
              title={"Xoá"}
              sx={{ cursor: "pointer" }}
            >
              <DeleteIcon color="error" />
            </Tooltip>
            <Link to={`/admin/showtime/${params.id}`}>
            <Tooltip
              
              sx={{ margin: "0px 5px", cursor: "pointer" }}
              title={"Tạo lịch"}
            >
              <CalendarMonthIcon color="primary" />
            </Tooltip>
            </Link>
          </div>
        );
      },
    },
  ];

  const rows = movieList.map((movie) => {
    return {
      id: movie.maPhim,
      hinhAnh: movie.hinhAnh,
      tenPhim: movie.tenPhim,
      moTa: movie.moTa,
      thaoTac: "",
    };
  });

  return (
    <Container>
      <div className={style.AdminMovieList}>
        <div className={style.heading}>
          <h1 className={style.title}>DANH SÁCH PHIM</h1>
          <Box className={style.searchUser}>
            <input
              onChange={handleChange}
              value={searchTerm}
              className={style.sreachInput}
              placeholder="Nhập từ khoá tên phim"
              type="text"
            />
            <Button sx={{ marginLeft: "-4px" }} variant="contained">
              Tìm Kiếm
            </Button>
          </Box>
          <Link to="/admin/addMovie">
            <Button sx={{ marginBottom: "30px" }} variant="contained">
              THÊM PHIM
              <span style={{ height: "29px" }}>
                <AddIcon />
              </span>
            </Button>
          </Link>
        </div>
        <Box
          sx={{
            height: 400,
            width: "100%",
          }}
        >
          <DataGrid
          rowHeight={150}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            slotProps={{
              pagination: {
                labelRowsPerPage: "Hàng trên mỗi trang",
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </div>
    </Container>
  );
}
