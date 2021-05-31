import { CocktailApiFetcher } from "../api/CocktailApiFetcher";

type CocktailInfo = {
  name: string;
  ingredients: { ingredient: string; measure: string; }[];
  instructions: string;
  thumbnailPicture: string;
}

export class CocktailController {
  private cache = new Map();
  private static instance: CocktailController;

  private constructor() {}

  static getInstance() {
    if(!CocktailController.instance) {
      CocktailController.instance = new CocktailController();
    }
    return CocktailController.instance;
  }

  public async getCocktail(query?: string) {
    if(this.isInCache(query)) return this.getFromCache(query);
    const apiData = await this.getApiData(query);
    const cocktail = this.extractUsableInfo(apiData.data.drinks[0]);
    query && this.putInCache(query, cocktail);
    return cocktail;
  }

  private async getApiData(query?: string) {
    const apiData = await new CocktailApiFetcher().getCocktailDataFromApi(query);
    if (!apiData) {
      throw Error("Data from API was undefined");
    }
    return apiData
  }

  private extractUsableInfo(cocktailData: any) {
    return {
      name: cocktailData.strDrink,
      ingredients: this.getIngredients(cocktailData),
      instructions: cocktailData.strInstructions,
      thumbnailPicture: cocktailData.strDrinkThumb,
    }
  }

  private getIngredients(drinkData: { [key: string]: string }) {
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

  private putInCache(query: string , cocktail: CocktailInfo) {
    this.cache.set(query, cocktail);
    if(this.cache.size >= 100) {
        this.cache.delete(this.cache.keys().next().value)
    }
  }

  private isInCache(query?: string): boolean {
    return query && this.cache.get(query);
  }

  private getFromCache(query?: string) {
    if(query) {
      return this.cache.get(query)
    }
  }
}
