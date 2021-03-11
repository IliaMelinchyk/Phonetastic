import React, { Component } from "react";
import MarketItem from "../../components/MarketItem/MarketItem";
import MarketModal from "../../components/MarketModal/MarketModal";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { app } from "../../base";
import withFirebasePagination from "firebase-react-paginated";
import classes from "./Market.module.scss";
import Button from "../../components/UI/Button/Button";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { FcPhoneAndroid } from "react-icons/fc";

class Market extends Component {
  state = { showModal: false, phone: {} };
  switchModal = (item) => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
      };
    });
    if (!this.state.showModal) this.setState({ phone: item });
  };
  render() {
    return (
      <div className={classes.MarketWrapper}>
        <Modal
          noBackground
          show={this.state.showModal}
          modalClosed={this.switchModal}
        >
          <MarketModal item={this.state.phone} modalClosed={this.switchModal} />
        </Modal>
        {this.props.error ? (
          <h4 className={classes.Error}>
            <FcPhoneAndroid />
            {this.props.error}
            <br /> Please try again later!
          </h4>
        ) : (
          <ul className={classes.List}>
            {this.props.pageItems.map((item) => (
              <MarketItem
                key={item.id}
                item={item.value}
                clicked={(item) => this.switchModal(item)}
              />
            ))}
          </ul>
        )}
        {this.props.isLoading ? (
          <Spinner />
        ) : !this.props.error ? (
          <div className={classes.Pagination}>
            <Button
              btnType="Page"
              disabled={!this.props.hasPrevPage}
              clicked={this.props.onPrevPage}
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
              disabled={!this.props.hasNextPage}
              clicked={this.props.onNextPage}
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
  }
}

export default withFirebasePagination(app)({
  path: "/phones",
  orderBy: "date",
  length: 12,
})(Market);
