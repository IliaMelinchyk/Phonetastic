import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../UI/Button/Button";
import { formatDate } from "../../shared/utility";
import classes from "./MyItem.module.scss";
import NoImage from "../../assets/images/noimg.png";

const MyItem = (props) => {
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

  const date = formatDate(props.item.date);

  const deleteMyItemHandler = () => {
    props.onItemDelete(props.id, props.token, props.userId, props.item.fileUrl);
  };

  return (
    <li className={classes.ListElement}>
      {fileUrl ? (
        <img
          onClick={() => props.clicked(fileUrl)}
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
        <Button clicked={deleteMyItemHandler} btnType="Danger">
          DELETE
        </Button>
      </div>
    </li>
  );
};

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
