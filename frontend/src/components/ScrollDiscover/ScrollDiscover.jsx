import React from 'react';
import s from './ScrollDiscover.module.scss';

export default function ScrollDiscover() {
  return (
    <div className={s.scroll}>
      <div className={s.scroll__text}>
        <span>SCROLL FOR DISCOVER</span>
      </div>
      <div className={s.scroll__circle}></div>
    </div>
  );
}