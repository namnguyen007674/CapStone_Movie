import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AccordionDetailTime from "./components/AccordionDetailTime";
import style from "./AccordionDetailMovie.module.scss";
import { Container } from "@mui/material";
const Accordion = styled((props) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
    sx={{ background: "transparent" }}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
    sx={{
      background: "#1E1E1E",
      borderTopRightRadius: "5px",
      borderTopLeftRadius: "5px",
    }}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "white",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    display: "block",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  background: "#121212",
}));

export default function AccordionDetailMovie({ cinemaSystemList }) {
  // Lấy danh sách cụm rạp
  const [expanded, setExpanded] = React.useState("");
  const [nestedItem, setnestedItem] = React.useState("");

  // Kiểm tra giá trị của nestedExpanded
  const handleChangeNested = (panel) => (event, nestedExpanded) => {
    setnestedItem(nestedExpanded ? panel : false);
  };
  // Kiểm tra giá trị của newExpanded
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container>
      <div className={style.AccordionDetailMovie}>
        {cinemaSystemList.map((cinema) => (
          // Danh sách rạp
          <Accordion
            key={cinema.maHeThongRap}
            expanded={expanded === `panel${cinema.maHeThongRap}`}
            onChange={handleChange(`panel${cinema.maHeThongRap}`)}
          >
            {/* Logo Movie  */}
            <AccordionSummary
              aria-controls={`panel${cinema.maHeThongRap}`}
              id={`panel${cinema.maHeThongRap}`}
            >
              <img src={cinema.logo} width={50} height={50} alt="" />
            </AccordionSummary>
            <AccordionDetails>
              {cinema.cumRapChieu.map((detailCinema) => (
                <Accordion
                  key={detailCinema.maCumRap}
                  expanded={nestedItem === `panela${detailCinema.maCumRap}`}
                  onChange={handleChangeNested(
                    `panela${detailCinema.maCumRap}`
                  )}
                >
                  {/* Địa chỉ rạp  */}
                  <AccordionSummary
                    aria-controls={`panela${detailCinema.maCumRap}`}
                    id={`panela${detailCinema.maCumRap}`}
                  >
                    <Typography sx={{ color: "#d4dd29", fontWeight: "500" }}>
                      {detailCinema.tenCumRap}
                    </Typography>
                    <Typography sx={{ color: "#fff" }}>
                      {detailCinema.diaChi}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Giờ Chiếu  */}
                    <AccordionDetailTime
                      detailShowTime={detailCinema.lichChieuPhim}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
