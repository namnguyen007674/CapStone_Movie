import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SlideMovie from "./components/SlideMovie";
import Container from "@mui/material/Container";
import style from "./Tablist.module.scss";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="fsdfsdfd">{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabList({ movieList }) {
  // Lọc danh sách phim sắp chiếu
  const upComingMovie = movieList.filter((item)=>{
    return item.sapChieu === true
  })
  // Lọc danh sách phim đang chiếu
  const isShowingMovie = movieList.filter((item)=>{
    return item.dangChieu === true
  })

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Thêm class active khi được click
  const [activeItem,setAcitveItem] = React.useState("item1")
  const handleItemChangeActive = (item)=>{
    setAcitveItem(item)
  }

  
  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="TẤT CẢ" {...a11yProps(0)} onClick={()=>handleItemChangeActive('item1')} className={`${style.tabTitleMovie} ${activeItem === 'item1' ? `${style.active}` : "" }` } />
          <Tab label="PHIM ĐANG CHIẾU" {...a11yProps(1)} onClick={()=>handleItemChangeActive('item2')} className={`${style.tabTitleMovie} ${activeItem === 'item2' ? `${style.active}` : "" }` } />
          <Tab label="PHIM SẮP CHIẾU" {...a11yProps(2)} onClick={()=>handleItemChangeActive('item3')} className={`${style.tabTitleMovie} ${activeItem === 'item3' ? `${style.active}` : "" }` } />
        </Tabs>
      </Box>
      <CustomTabPanel sx={{width:{'xs' :'105%'}}} value={value} index={0} >
        <Container  >
          <SlideMovie movieList={movieList}  />
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Container >
          <SlideMovie movieList={isShowingMovie}  />
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Container>
          <SlideMovie movieList={upComingMovie}  />
        </Container>
      </CustomTabPanel>
    </Box>
  );
}
