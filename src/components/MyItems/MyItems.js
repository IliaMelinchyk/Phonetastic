import React, { Component } from "react";
import MyItem from "./MyItem/MyItem";
import Spinner from "../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Modal from "../UI/Modal/Modal";
import MyItemModal from "./MyItemModal/MyItemModal";

class MyItems extends Component {
  state = { showModal: false, phone: null };
  componentDidMount() {
    this.props.onInitMyItems(this.props.userId);
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
            <MyItemModal
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
              <MyItem id={item.id} item={item} />
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
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyItems: (userId) => dispatch(actions.initMyItems(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
