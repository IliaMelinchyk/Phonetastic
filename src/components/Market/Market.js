import React, { Component } from "react";
import MarketItem from "./MarketItem/MarketItem";
import MarketModal from "./MarketModal/MarketModal";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Market extends Component {
  state = { showModal: false, phone: null };
  componentDidMount() {
    this.props.onInitMyItems();
  }
  switchModal = async (item) => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
      };
    });
    await this.setState({ phone: item });
    console.log(this.state.phone);
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
        {this.props.loading ? <Spinner /> : null}
        {this.props.error ? (
          <h3>{this.props.error}. Please try again later!</h3>
        ) : (
          this.props.phones.map((item) => (
            <div key={item.id}>
              <button onClick={() => this.switchModal(item)}>VIEW</button>
              <MarketItem id={item.id} item={item} />
            </div>
          ))
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyItems: () => dispatch(actions.initMyItems()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Market);
