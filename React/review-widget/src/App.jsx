import React, { Component } from "react";
import styles from "./App.module.css";
import Counter from "./components/Counter/Counter";
import Widget from "./components/Widget/Widget";

class App extends Component {
  state = {
    bad: 0,
    average: 0,
    good: 0,
  };

  ratingHandler = (rate) => {
    if (rate < 3) {
      this.setState((prevState) => ({
        bad: (prevState.bad += 1),
      }));
    } else if (rate > 3) {
      this.setState((prevState) => ({
        good: (prevState.good += 1),
      }));
    } else {
      this.setState((prevState) => ({
        average: (prevState.average += 1),
      }));
    }
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <Widget rating={this.ratingHandler} /> <Counter data={this.state} />
      </div>
    );
  }
}

export default App;
