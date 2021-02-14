import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import ChosenItem from "./containers/ChosenItem/ChosenItem";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ChosenItem />
        </Layout>
      </div>
    );
  }
}

export default App;
