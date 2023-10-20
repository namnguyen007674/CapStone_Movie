import fetcher from "./fetcher";

export async function getMovieList() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim",{
      params:{
        maNhom:'GP03'
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function deleteMovie(movieId) {
  try {
    const response = await fetcher.delete('/QuanLyPhim/XoaPhim',{
      params:{
        MaPhim:movieId
      }
    })
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh",movie)
    return response.data?.content
  } catch (error) {
    throw error.response.data?.content
  }
}

export async function updateMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/CapNhatPhimUpload",movie)
    return response.data?.content
  } catch (error) {
    throw error.response.data?.content
  }
}

export async function getMovie(movieId) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim",{
      params:{
        MaPhim:movieId
      }
    })
    return response.data?.content
  } catch (error) {
    throw error.response.data?.content
  }
}
