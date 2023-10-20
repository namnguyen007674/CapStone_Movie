import fetcher from "./fetcher";

export async function getBanner() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function getMoives() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP03",
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function getMovieDetail(movieId) {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinLichChieuPhim",{
      params:{
        MaPhim:movieId
      }
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
