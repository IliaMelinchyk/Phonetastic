import React, { Component } from "react";

class MarketItem extends Component {
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

export default MarketItem;
