import fetcher from "./fetcher";

export async function getCinemaSystems() {
  try {
    const response = await fetcher("/QuanLyRap/LayThongTinHeThongRap") 
    return response.data.content
  } catch (error) {
    return error.response.data.content
  }
}

export async function getCinemaInSystem(cinemaId) {
  try {
    const response = await fetcher("/QuanLyRap/LayThongTinCumRapTheoHeThong",{
      params:{
        maHeThongRap:cinemaId
      }
    }) 
    return response.data.content
  } catch (error) {
    return error.response.data.content
  }
}


export async function getMovieInCinema(cinemaId) {
  try {
    const response = await fetcher("/QuanLyRap/LayThongTinLichChieuHeThongRap",{
      params:{
        maHeThongRap:cinemaId,
        maNhom:"GP03"
      }
    }) 
    return response.data.content
  } catch (error) {
    return error.response.data.content
  }
}