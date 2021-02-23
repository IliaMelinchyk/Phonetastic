import React, { Component } from "react";
import MarketItem from "./MarketItem/MarketItem";
import MarketModal from "./MarketModal/MarketModal";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { app } from "../../base";
import withFirebasePagination from "firebase-react-paginated";

class Market extends Component {
  state = { showModal: false, phone: null };
  switchModal = (item) => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
      };
    });
    this.setState({ phone: item.value });
    console.log(this.state.phone, this.props.pageItems);
    console.log(new Date().getTime(), Date.now());
  };
  render() {
    return (
      <div>
        {this.state.phone ? (
          <Modal show={this.state.showModal} modalClosed={this.switchModal}>
            <MarketModal
              item={this.state.phone}
              modalClosed={this.switchModal}
            />
          </Modal>
        ) : null}
        {this.props.isLoading ? <Spinner /> : null}
        {this.props.error ? (
          <h3>{this.props.error}. Please try again later!</h3>
        ) : (
          <ul>
            {this.props.pageItems.map((item) => (
              <li key={item.id}>
                <MarketItem id={item.value.id} item={item.value} />
                <button onClick={() => this.switchModal(item)}>VIEW</button>
              </li>
            ))}
          </ul>
        )}
        <button
          disabled={!this.props.hasPrevPage}
          onClick={this.props.onPrevPage}
        >
          newer
        </button>
        <button
          disabled={!this.props.hasNextPage}
          onClick={this.props.onNextPage}
        >
          older
        </button>
      </div>
    );
  }
}

export default withFirebasePagination(app)({
  path: "/phones",
  orderBy: "date",
  length: 4,
})(Market);
