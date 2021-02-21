import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";

class MyItem extends Component {
  deleteMyItemHandler = () => {
    this.props.onItemDelete(this.props.id, this.props.token, this.props.userId);
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
    } = this.props.item;
    return (
      <div>
        <p>Model: {model}</p>
        <p>Manufacturer: {manufacturer}</p>
        <p>id: {this.props.id}</p>
        <Button clicked={this.deleteMyItemHandler} btnType="Success">
          DELETE
        </Button>
      </div>
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
    onItemDelete: (itemId, token, userId) =>
      dispatch(actions.itemDelete(itemId, token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyItem);
