import fetcher from "./fetcher";
export async function signin(payload) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function signup(payload) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function getProfileUser(groupId,accountName) {
  try {
    const response = await fetcher.get("/QuanLyNguoiDung/TimKiemNguoiDung",{
      params:{
        MaNhom:groupId,
        tuKhoa:accountName
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function bookingHistory(payload) {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan",payload)
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function updateUser(payload) {
  try {
    const response = await fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung",payload)
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}


