import fetcher from "./fetcher";

export async function showTimeMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/TaoLichChieu",movie)
    return response.data?.content
  } catch (error) {
    throw error.response.data?.content
  }
}