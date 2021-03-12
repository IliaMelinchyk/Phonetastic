import React from "react";
import classes from "./Footer.module.scss";
import { GoMail, GoMarkGithub } from "react-icons/go";

const Footer = () => (
  <footer className={classes.Footer}>
    <ul>
      <li className={classes.Mail}>
        <a
          href="mailto:sm1tphoen1x@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoMail />
          sm1tphoen1x@gmail.com
        </a>
      </li>
      <li className={classes.Github}>
        <a
          href="https://github.com/IliaMelinchyk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoMarkGithub />
          Ilia Melinchyk
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
