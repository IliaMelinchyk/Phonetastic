import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MyItem from "../../components/MyItem/MyItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import classes from "./MyItems.module.scss";
import { FcPhoneAndroid } from "react-icons/fc";

const MyItems = (props) => {
  const { onInitMyItems, userId } = props;

  const [showModal, setShowModal] = useState(false);

  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => onInitMyItems(userId), [onInitMyItems, userId]);

  const switchModal = (fileUrl) => {
    setShowModal(!showModal);
    if (showModal === false) setFileUrl(fileUrl);
  };

  return (
    <div>
      {props.loading ? <Spinner /> : null}
      <Modal noBackground show={showModal} modalClosed={switchModal}>
        <img className={classes.ImageFull} src={fileUrl} alt={props.id} />
      </Modal>
      {props.error ? (
        <h4 className={classes.Error}>
          <FcPhoneAndroid />
          {props.error}
          <br /> Please try again later!
        </h4>
      ) : (
        <ul className={classes.List}>
          {props.phones.map((item) => (
            <MyItem
              key={item.id}
              id={item.id}
              item={item}
              clicked={(fileUrl) => switchModal(fileUrl)}
            />
          ))}
          {props.phones.length === 0 && !props.loading ? (
            <h4 className={classes.Error}>
              <FcPhoneAndroid />
              Add phones to market <br />
              to see them here!
            </h4>
          ) : null}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.myItems.error,
    phones: state.myItems.phones,
    loading: state.myItems.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyItems: (userId) => dispatch(actions.initMyItems(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
