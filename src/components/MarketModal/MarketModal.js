import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../UI/Button/Button";
import classes from "./MarketModal.module.scss";
import { IoClose } from "react-icons/io5";
import NoImage from "../../assets/images/noimg.png";
import { AiFillDollarCircle, AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import Spinner from "../UI/Spinner/Spinner";
class MarketModal extends Component {
  state = { loaded: false };
  imageLoaded = () => {
    this.setState({ loaded: true });
  };
  componentWillUnmount() {
    this.setState({ loaded: false });
  }
  render() {
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
    } = this.props.item;
    const date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(this.props.item.date);
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
            <button className={classes.Close} onClick={this.props.modalClosed}>
              <IoClose />
            </button>
          </div>
        </div>
        <div className={classes.MainInfo}>
          {fileUrl ? (
            <>
              <img
                className={classes.Image}
                src={fileUrl}
                alt={model}
                onLoad={this.imageLoaded}
              />
              {!this.state.loaded ? (
                <div style={{ position: "relative" }}>
                  <Spinner />
                </div>
              ) : null}
            </>
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
  }
}
export default MarketModal;
