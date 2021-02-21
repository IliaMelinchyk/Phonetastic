import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";

class MarketModal extends Component {
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
      </div>
    );
  }
}
export default MarketModal;
