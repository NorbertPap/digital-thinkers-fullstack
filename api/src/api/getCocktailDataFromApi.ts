import axios from "axios";

export function getCocktailDataFromApi(query?: string) {
  const url = getUrl(query);
  return fetchData(url);
}

function getUrl(query?: string) {
  return query
    ? `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    : "http://www.thecocktaildb.com/api/json/v1/1/random.php";
}

async function fetchData(url: string) {
  try {
    return await axios.get(url);
  } catch (e) {
    console.log(`Couldn't fetch cocktail from API: ${e}`);
  }
}
