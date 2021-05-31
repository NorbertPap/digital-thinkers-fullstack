import React from "react";
import Ingredient from "./Ingredient";

export default class CocktailInfo extends React.Component {
  render() {
    const ingredientComponents =
      this.props.cocktail.ingredients &&
      this.props.cocktail.ingredients.map((ingredient) => {
        return (
          <Ingredient
            key={ingredient.ingredient}
            ingredient={ingredient.ingredient}
            measure={ingredient.measure}
          />
        );
      });

    return (
      <div>
        <h1>{this.props.cocktail.name}</h1>
        <img src={this.props.cocktail.thumbnailPicture} />

        <div>
          <p>Ingredients: </p>
          {ingredientComponents}
        </div>

        <p>Instructions: {this.props.cocktail.instructions}</p>
      </div>
    );
  }
}
