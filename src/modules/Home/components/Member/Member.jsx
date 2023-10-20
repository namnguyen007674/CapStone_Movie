import { Container, Link } from "@mui/material";
import React from "react";
import style from "./Member.module.scss";
export default function Member() {
  return (
    <section className={style.member} id="Thành Viên">
      <Container>
        <img
          className={style.memberTitle}
          src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/bg-title-bhd-member.png"
          alt=""
        />
        <div className={style.memberHolder}>
          <img
            className={style.memberHand}
            src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/img-hand.png"
            alt=""
          />
          <img
            className={style.memberFinger}
            src="https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/img--finger.png"
            alt=""
          />
        </div>
        <div className={style.cardContent}>
          <ul className={style.cardList}>
            <li>
              <Link>
                <img className={style.cardItem}
                  src="https://www.bhdstar.vn/wp-content/uploads/2017/09/STAR.png"
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link>
                <img className={style.cardItem}
                  src="https://www.bhdstar.vn/wp-content/uploads/2017/09/GOLD.png"
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link>
                <img className={style.cardItem}
                  src="https://www.bhdstar.vn/wp-content/uploads/2017/09/DIAMOND.png"
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
