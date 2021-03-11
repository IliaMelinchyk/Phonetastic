import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../UI/Button/Button";
import { FcPhoneAndroid } from "react-icons/fc";
import classes from "./MyItem.module.scss";
import Modal from "../UI/Modal/Modal";
import NoImage from "../../assets/images/noimg.png";

class MyItem extends Component {
  deleteMyItemHandler = () => {
    console.log(this.props.item.fileUrl);
    // FIX DELETING DEFAULT PICTURE
    this.props.onItemDelete(
      this.props.id,
      this.props.token,
      this.props.userId,
      this.props.item.fileUrl
    );
  };
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
      <li className={classes.ListElement}>
        {fileUrl ? (
          <img
            onClick={() => this.props.clicked(fileUrl)}
            className={classes.Image}
            src={fileUrl}
            alt={model}
          />
        ) : (
          <img
            src={NoImage}
            alt="No phone"
            className={classes.Image}
            style={{ outline: "none", cursor: "default" }}
          />
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
            <p>Selling price: </p>
            <p>{price} $</p>
          </li>
          <li>
            <p>Added to market on: </p>
            <p>{date}</p>
          </li>
          <li>
            <p>Your contact email: </p>
            <p>{email}</p>
          </li>
          <li>
            <p>Your phone number: </p>
            <p>{phone}</p>
          </li>
          {description ? (
            <li>
              <p>Additional info: </p>
              <p>{description}</p>
            </li>
          ) : null}
        </ul>
        <div className={classes.Delete}>
          <Button clicked={this.deleteMyItemHandler} btnType="Danger">
            DELETE
          </Button>
        </div>
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onItemDelete: (itemId, token, userId, fileUrl) =>
      dispatch(actions.itemDelete(itemId, token, userId, fileUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyItem);
