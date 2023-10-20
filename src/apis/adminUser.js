import fetcher from "./fetcher";

export async function getUserList(username) {
  try {
    const response = await fetcher.get("/QuanLyNguoiDung/LayDanhSachNguoiDung",{
      params:{
        MaNhom:'GP03',
        tuKhoa:username || [],
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function addUser(user) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThemNguoiDung",user)
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function deleteUser(username) {
  try {
    const response = await fetcher.delete('/QuanLyNguoiDung/XoaNguoiDung/',{
      params:{
        TaiKhoan:username
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function getUserAdmin(username) {
  try {
    const response = await fetcher.get("/QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
        MaNhom:"GP03",
        tuKhoa:username
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
export async function updateUserAdmin(payload) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung",payload)
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
