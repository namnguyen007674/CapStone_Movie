import { Container, Grid } from "@mui/material";
import React from "react";
import style from './footer.module.scss'
export default function Footer() {
  return (
    <footer>
      <div className={style.footer_logo}>
        <img
          src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/logo.png"
          alt=""
        />
      </div>
      <Container>
        <Grid container>
          <Grid item md={3}>
            <h3 className={style.footer_title}>VỀ BHD STAR</h3>
            <div>
              <ul>
                <li  className={style.footer_item}>
                  <a href="https://www.bhdstar.vn/he-thong-rap/">
                    Hệ Thống Rạp
                  </a>
                </li>
                <li  className={style.footer_item}>
                  <a href="https://www.bhdstar.vn/tuyen-dung/">Liên Hệ</a>
                </li>
                <li  className={style.footer_item}>
                  <a href="https://www.bhdstar.vn/lien-he/">Tuyển Dụng</a>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item md={3}>
            <h3 className={style.footer_title}>QUY ĐỊNH & ĐIỀU KHOẢN</h3>
            <ul>
              <li className={style.footer_item}>
                <a href="https://www.bhdstar.vn/he-thong-rap/">Quy định thành viên</a>
              </li>
              <li className={style.footer_item}>
                <a href="https://www.bhdstar.vn/tuyen-dung/">Điều khoản</a>
              </li>
              <li className={style.footer_item}>
                <a href="https://www.bhdstar.vn/lien-he/">Hướng dẫn đặt vé trực tuyến</a>
              </li>
              <li className={style.footer_item}>
                <a href="https://www.bhdstar.vn/lien-he/">Quy định và chính sách chung</a>
              </li>
              <li className={style.footer_item}>
                <a href="https://www.bhdstar.vn/lien-he/">Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</a>
              </li>
            </ul>
          </Grid>
          <a style={{position:"absolute",bottom:"30px",left:"50px" }} href="">
            <img width={150} src="https://www.bhdstar.vn/wp-content/uploads/2020/02/dathongbao-1.png" alt="" />
          </a>
        </Grid>
      </Container>
    </footer>
  );
}
