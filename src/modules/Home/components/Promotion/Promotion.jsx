import { Container } from '@mui/material'
import React from 'react'
import SlidePromotion from './SlidePromotion'
import style from './Promotion.module.scss'
export default function Promotion() {
  return (
    <section className={style.promotionBg} id="Khuyến Mãi">
      <h3 className={style.promotionTitle}>KHUYẾN MÃI</h3>
      <Container>
        <SlidePromotion/>
      </Container>
    </section>
  )
}
