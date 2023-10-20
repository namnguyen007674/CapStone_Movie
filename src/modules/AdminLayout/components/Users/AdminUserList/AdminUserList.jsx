import { Box, Button, Container } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUserList } from "../../../../../apis/adminUser";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./AdminUserList.module.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminUserList() {
  // Tìm kiếm người dùng
  const [searchTerm, setSearchTerm] = useState("");
  const queryclient = useQueryClient();
  const { data:userList = [] } = useQuery({
    queryKey: ["userList", searchTerm],
    queryFn: () => getUserList(searchTerm),
  });
  // API xoá người dùng
  const { mutate: onDeletUser } = useMutation({
    mutationFn: (username) => deleteUser(username),
    onSuccess: () => {
      queryclient.invalidateQueries(["userList"]);
    },
  });
  // Xử lý xoá người dùng
  const handleDeleteUser = (username) => {
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
        onDeletUser(username)
        Swal.fire("Deleted!", "Bạn đã xoá thành công.", "success");
      }
    });
  };
  // Thay đổi giá trị của input và setState
  const time = useRef();
  const handleChange = (e) => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300);
  };

  const columns = [
    { field: "id", headerName: "STT", width: 70 },
    {
      field: "taiKhoan",
      headerName: "Tài Khoản",
      width: 130,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "matKhau",
      headerName: "Mật Khẩu",
      width: 130,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "maLoaiNguoiDung",
      headerName: "Loại Người Dùng",
      width: 130,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "hoTen",
      headerName: "Họ Tên",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "soDT",
      headerName: "Số Điện Thoại",
      width: 130,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            {params.value}
          </div>
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
            <Link to={`/admin/updateUser/${params.row.taiKhoan}`}>
              <Tooltip sx={{ marginRight: "5px" }} title={"Chỉnh sửa"}>
                <DriveFileRenameOutlineIcon color="warning" />
              </Tooltip>
            </Link>
            <Tooltip
              sx={{ cursor: "pointer" }}
              onClick={() => handleDeleteUser(params.row.taiKhoan)}
              title={"Xoá"}
            >
              <DeleteIcon color="error" />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = userList.map((item, index) => {
    return {
      id: index + 1,
      taiKhoan: item.taiKhoan,
      matKhau: item.matKhau,
      maLoaiNguoiDung: item.maLoaiNguoiDung,
      email: item.email,
      hoTen: item.hoTen,
      soDT: item.soDT,
      thaoTac: "",
    };
  });

  return (
    <div className={style.AdminUserList}>
      <Container>
        <div className={style.AdminUserListHeading}>
          <h1 className={style.AdminUserListTitle}>DANH SÁCH NGƯỜI DÙNG</h1>
          <Box className={style.SearchUser}>
            <input
              onChange={handleChange}
              value={searchTerm}
              className={style.SreachInput}
              placeholder="Nhập từ khoá tên tài khoản"
              type="text"
            />
            <Button sx={{ marginLeft: "-4px" }} variant="contained">
              Tìm Kiếm
            </Button>
          </Box>
          <Link to="/admin/addUser">
            <Button sx={{ marginBottom: "30px" }} variant="contained">
              Thêm Người Dùng
              <span style={{ height: "29px" }}>
                <AddIcon />
              </span>
            </Button>
          </Link>
        </div>
        {/* Danh sách người dùng  */}
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            checkboxSelection={false}
            rows={rows}
            columns={columns}
            slotProps={{
              pagination: {
                labelRowsPerPage: "Hàng trên mỗi trang",
              },
            }}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Container>
    </div>
  );
}
