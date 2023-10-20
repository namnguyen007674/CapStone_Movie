import fetcher from './fetcher'

export async function getTickets(movieShowTimeId) {
  try {
    const response = await fetcher.get("QuanLyDatVe/LayDanhSachPhongVe",{
      params:{
        MaLichChieu:movieShowTimeId
      }
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export async function bookTickets(ticket) {
  try {
    const response = await fetcher.post("QuanLyDatVe/DatVe",ticket)
    return response.data?.content;
  }
  catch (error) {
    throw error.response.data?.content;
  }
}