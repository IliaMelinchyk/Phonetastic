import React, { Component } from "react";
import MyItem from "../../components/MyItem/MyItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./MyItems.module.scss";
import { FcPhoneAndroid } from "react-icons/fc";

class MyItems extends Component {
  state = { showModal: false, fileUrl: "" };
  switchModal = (fileUrl) => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
      };
    });
    if (!this.state.showModal) this.setState({ fileUrl: fileUrl });
  };
  componentDidMount() {
    this.props.onInitMyItems(this.props.userId);
    console.log(this.props.phones);
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : null}
        <Modal
          noBackground
          show={this.state.showModal}
          modalClosed={this.switchModal}
        >
          <img
            className={classes.ImageFull}
            src={this.state.fileUrl}
            alt={this.props.id}
          />
        </Modal>
        {this.props.error ? (
          <h4 className={classes.Error}>
            <FcPhoneAndroid />
            {this.props.error}
            <br /> Please try again later!
          </h4>
        ) : (
          <ul className={classes.List}>
            {this.props.phones.map((item) => (
              <MyItem
                key={item.id}
                id={item.id}
                item={item}
                clicked={(fileUrl) => this.switchModal(fileUrl)}
              />
            ))}
            {this.props.phones.length === 0 ? (
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
  }
}
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
