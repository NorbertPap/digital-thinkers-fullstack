import React from "react";

export default class NewCocktailButton extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={() => this.props.onClick()}>Get new cocktail!</button>
      </div>
    );
  }
}
