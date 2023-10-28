import React from "react";
import { Container, Typography } from "@mui/material";
import { DivCustom } from "./index";

export default function Loading(){
  return (
    <Container >
      <DivCustom>
        <img
          src="/img/animation_lmnjb4q6_small.gif"
          alt="Loading-animation"
          width={200}
        />
        <Typography sx={{fontSize:'16px'}} variant="h4">Vui Lòng Đợi...</Typography>
      </DivCustom>
    </Container>
  );
};


