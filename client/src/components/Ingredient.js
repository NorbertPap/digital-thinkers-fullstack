import React from "react";

export default class Ingredient extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.ingredient}: {this.props.measure}
        </p>
      </div>
    );
  }
}
