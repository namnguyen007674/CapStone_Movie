import { createContext, useContext, useState } from "react";

const TicketsContext = createContext();

const TicketProvider = ({ children }) => {
  // Danh sách ghế đã chọn
  const [selectSeats, setselectSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const handleSelected = (seat) => {
    const isSelected = seat.isSelected;
    if (isSelected) {
      // Nếu ghế đã chọn, thêm ghế vào mảng selectSeats
      setselectSeats([...selectSeats,seat])
      setTotalPrice(totalPrice + seat.giaVe);
    } else {
      // Nếu ghế không được chọn, loại bỏ ghế khỏi mảng selectSeats
      const updatedSeats = selectSeats.filter((item) => item.maGhe !== seat.maGhe);
      setselectSeats(updatedSeats);
      setTotalPrice(totalPrice - seat.giaVe);
    }
  };
  // Giá vé
  return (
    <TicketsContext.Provider
      value={{ selectSeats, totalPrice, handleSelected }}
    >
      {children}
    </TicketsContext.Provider>
  );
};
export default TicketProvider;

export const useTicketContext = () => {
  const value = useContext(TicketsContext);
  return value;
};



