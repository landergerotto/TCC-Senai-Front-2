import React from "react";

import navcolors from "../../assets/Img/nav-colors.png";
import logobosch from "../../assets/Img/logo-bosch.png";
import bpscross from "../../assets/Img/bpscross.png";

import style from "./navbar.module.css";

function NavbarComponent() {
  return (
    <header>
      <img src={navcolors} className={style.navColors} alt="Nav Colors" />
      <nav>
        <img src={bpscross} className={style.bps} alt="Bosch Logo" />
        <img src={logobosch} className={style.logo} alt="Bosch Logo" />
      </nav>
    </header>
  );
}

export default NavbarComponent;