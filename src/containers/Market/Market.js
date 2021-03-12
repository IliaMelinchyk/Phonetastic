import React, { useState } from "react";
import withFirebasePagination from "firebase-react-paginated";
import { app } from "../../base";
import MarketItem from "../../components/MarketItem/MarketItem";
import MarketModal from "../../components/MarketModal/MarketModal";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import classes from "./Market.module.scss";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { FcPhoneAndroid } from "react-icons/fc";

const Market = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState({});
  const switchModal = (item) => {
    setShowModal(!showModal);
    if (showModal === false) setPhone(item);
  };
  return (
    <div className={classes.MarketWrapper}>
      <Modal noBackground show={showModal} modalClosed={switchModal}>
        <MarketModal item={phone} modalClosed={switchModal} />
      </Modal>
      {props.error ? (
        <h4 className={classes.Error}>
          <FcPhoneAndroid />
          {props.error}
          <br /> Please try again later!
        </h4>
      ) : (
        <>
          {props.notAuthenticated ? (
            <h4 className={classes.NotAuthenticated}>
              Log in to sell your old phone on our market!
            </h4>
          ) : null}
          <ul className={classes.List}>
            {props.pageItems.map((item) => (
              <MarketItem
                key={item.id}
                item={item.value}
                clicked={(item) => switchModal(item)}
              />
            ))}
          </ul>
        </>
      )}
      {props.isLoading ? (
        <Spinner />
      ) : !props.error ? (
        <div className={classes.Pagination}>
          <Button
            btnType="Page"
            disabled={!props.hasPrevPage}
            clicked={props.onPrevPage}
          >
            <HiOutlineArrowCircleLeft style={{ fontSize: "45px" }} />
            <span>
              PREV
              <br />
              PAGE
            </span>
          </Button>
          <Button
            btnType="Page"
            disabled={!props.hasNextPage}
            clicked={props.onNextPage}
          >
            <span>
              NEXT
              <br />
              PAGE
            </span>
            <HiOutlineArrowCircleRight style={{ fontSize: "45px" }} />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default withFirebasePagination(app)({
  path: "/phones",
  orderBy: "date",
  length: 12,
})(Market);
