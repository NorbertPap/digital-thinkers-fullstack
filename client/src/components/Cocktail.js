import React from "react";
import CocktailInfo from "./CocktailInfo";
import CocktailSearchBar from "./CocktailSearchBar";
import NewCocktailButton from "./NewCocktailButton";

export default class Cocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  componentDidMount() {
    this.getCocktailData();
  }

  getCocktailData(query) {
    const url = query ? `/api/cocktail?q=${query}` : "/api/cocktail";

    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState(data))
      .catch((err) => console.log(err));
  }

  searchInputChanged(newInput) {
    this.setState({
      searchInput: newInput
    });
  }

  render() {
    return (
      <div>
        <CocktailInfo cocktail={this.state} />
        <CocktailSearchBar onChange={(newInput) => this.searchInputChanged(newInput)} />
        <NewCocktailButton onClick={() => this.getCocktailData(this.state.searchInput)}/>
      </div>
    );
  }
}
