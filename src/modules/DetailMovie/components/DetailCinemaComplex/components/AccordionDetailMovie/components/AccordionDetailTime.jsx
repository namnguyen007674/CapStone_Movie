import React from "react";
import ButtonTime from "../../../../../../../components/ButtonTime";

export default function AccordionDetailTime({ detailShowTime }) {
  return (
    <>
      {detailShowTime.map((showTime) => (
        <ButtonTime key={showTime.maRap} movieTime={showTime}/>
      ))}
    </>
  );
}
