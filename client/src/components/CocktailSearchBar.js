import React from "react";

export default class CocktailSearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" onInput={(e) => this.props.onChange(e.target.value)} />
      </div>
    );
  }
}
