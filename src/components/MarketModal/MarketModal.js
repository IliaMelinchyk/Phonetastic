import React from "react";
import classes from "./MarketModal.module.scss";
import NoImage from "../../assets/images/noimg.png";
import { IoClose } from "react-icons/io5";
import { AiFillDollarCircle, AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";

const MarketModal = (props) => {
  const {
    age,
    camera,
    description,
    email,
    height,
    width,
    memory,
    phone,
    price,
    ram,
    model,
    manufacturer,
    fileUrl,
  } = props.item;

  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(props.item.date);

  return (
    <div className={classes.Modal}>
      <div className={classes.ModalHeader}>
        <p className={classes.Price}>
          Price: {price}
          <AiFillDollarCircle />
        </p>
        <div className={classes.ContactInfo}>
          <div>
            <a href={`tel:${phone}`}>
              <AiOutlinePhone />
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoMail />
              {email}
            </a>
          </div>
          <button className={classes.Close} onClick={props.modalClosed}>
            <IoClose />
          </button>
        </div>
      </div>
      <div className={classes.MainInfo}>
        {fileUrl ? (
          <img className={classes.Image} src={fileUrl} alt={model} />
        ) : (
          <img src={NoImage} alt="No phone" className={classes.Image} />
        )}
        <ul className={classes.Characteristics}>
          <li>
            <p>Model: </p>
            <p>{model}</p>
          </li>
          <li>
            <p>Manufacturer: </p>
            <p>{manufacturer}</p>
          </li>
          <li>
            <p>Age of a phone: </p>
            <p>{age}</p>
          </li>
          <li>
            <p>Memory storage capacity: </p>
            <p>{memory}</p>
          </li>
          <li>
            <p>RAM: </p>
            <p>{ram}</p>
          </li>
          <li>
            <p>Display resolution: </p>
            <p>
              {height}x{width} px
            </p>
          </li>
          <li>
            <p>Camera's resolution: </p>
            <p>{camera} MP</p>
          </li>
          <li>
            <p>Added to market on: </p>
            <p>{date}</p>
          </li>
          {description ? (
            <li>
              <p>Additional info: </p>
              <p>{description}</p>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default MarketModal;
