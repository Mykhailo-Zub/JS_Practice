import React, { Component } from "react";
import Counter from "../Counter/Counter";
import Widget from "../Widget/Widget";

class Reviews extends Component {
  state = {
    reviews: 0,
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
    this.setState((prevState) => ({
      reviews: (prevState.reviews += 1),
    }));
  };

  render() {
    return (
      <>
        <Widget rating={this.ratingHandler} /> <Counter data={this.state} />
      </>
    );
  }
}

export default Reviews;
