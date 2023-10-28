import React from "react";
import { Container, Typography } from "@mui/material";
import { DivCustom } from "./index";

export default function Loading(){
  return (
    <Container sx={{ height: "70vh" }}>
      <DivCustom>
        <img
          src="/img/animation_lmnjb4q6_small.gif"
          alt="Loading-animation"
          width={300}
        />
        <Typography variant="h4">Vui Lòng Đợi...</Typography>
      </DivCustom>
    </Container>
  );
};


