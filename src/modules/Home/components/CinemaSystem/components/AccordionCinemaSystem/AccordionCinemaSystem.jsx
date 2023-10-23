import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getCinemaInSystem } from "../../../../../../apis/cinema";
import AccordionMovieList from "./components/AccordionMovieList";
import style from "./AccordionCinemaSystem.module.scss";
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
}));

export default function NestedAccordions({ cinemaSystem }) {
  // Lấy danh sách cụm rạp
  const [cinemaId, setCinemaId] = React.useState("");
  const [expanded, setExpanded] = React.useState("");
  const [nestedItem, setnestedItem] = React.useState("");
  const { data: cinemaList = [] } = useQuery({
    queryKey: ["cinemaInSystem", cinemaId],
    queryFn: () => getCinemaInSystem(cinemaId),
    enabled: !!cinemaId,
  });
  // Kiểm tra giá trị của nestedExpanded
  const handleChangeNested = (panel) => (event, nestedExpanded) => {
    setnestedItem(nestedExpanded ? panel : false);
  };
  // Kiểm tra giá trị của newExpanded
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeCinemaId = (cinemaId) => {
    setCinemaId(cinemaId);
  };

  return (
    <Container>
      <div className={style.AccordionCinemaSystem}>
        {/* Danh sách hệ thống rạp  */}
        {cinemaSystem.map((cinemas) => (
          <Accordion
            key={cinemas.maHeThongRap}
            onClick={() => handleChangeCinemaId(cinemas.maHeThongRap)}
            expanded={expanded === `panel${cinemas.maHeThongRap}`}
            onChange={handleChange(`panel${cinemas.maHeThongRap}`)}
          >
            <AccordionSummary
              aria-controls={`panel${cinemas.maHeThongRap}`}
              id={`panel${cinemas.maHeThongRap}`}
            >
              <img src={cinemas.logo} width={50} height={50} alt="" />
            </AccordionSummary>

            {/* Danh sách rạp  */}
            <AccordionDetails>
              {cinemaList.map((cinema) => (
                <Accordion
                  key={cinema.maCumRap}
                  expanded={nestedItem === `panela${cinema.maCumRap}`}
                  onChange={handleChangeNested(`panela${cinema.maCumRap}`)}
                >
                  <AccordionSummary
                    aria-controls={`panela${cinema.maCumRap}`}
                    id={`panela${cinema.maCumRap}`}
                  >
                    <Typography sx={{ color: "#d4dd29 ", fontWeight: "500" }}>
                      {cinema.tenCumRap}
                    </Typography>
                    <Typography sx={{ color: "#fff" }}>
                      {cinema.diaChi}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Danh sách phim  */}
                    <AccordionMovieList
                      cinemaComplexId={cinema.maCumRap}
                      cinemaId={cinemaId}
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
