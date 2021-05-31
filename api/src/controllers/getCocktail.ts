import { getCocktailDataFromApi } from "../api/getCocktailDataFromApi";

export async function getCocktail(query?: string) {
  const apiData = await getCocktailDataFromApi(query);

  if (!apiData) {
    throw Error("Data from API was undefined");
  }

  const cocktailData = apiData.data.drinks[0];
  return {
    name: cocktailData.strDrink,
    ingredients: getIngredients(cocktailData),
    instructions: cocktailData.strInstructions,
    thumbnailPicture: cocktailData.strDrinkThumb,
  };
}

function getIngredients(drinkData: { [key: string]: string }) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const key = drinkData[`strIngredient${i}`];
    const value = drinkData[`strMeasure${i}`];
    if (key && value) {
      ingredients[i - 1] = {
        ingredient: key,
        measure: value,
      };
    }
  }

  return ingredients;
}
