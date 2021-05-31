import axios from "axios";

export class CocktailApiFetcher {
  getCocktailDataFromApi(query?: string) {
    const url = this.getUrl(query);
    return this.fetchData(url);
  }

  private getUrl(query?: string) {
    return query
      ? `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      : "http://www.thecocktaildb.com/api/json/v1/1/random.php";
  }

  private async fetchData(url: string) {
    try {
      return await axios.get(url);
    } catch (e) {
      console.log(`Couldn't fetch cocktail from API: ${e}`);
    }
  }
}
