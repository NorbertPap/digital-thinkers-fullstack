import {CocktailController} from "../src/controllers/CocktailController";
import {CocktailApiFetcher} from "../src/api/CocktailApiFetcher";

jest.mock("../src/api/CocktailApiFetcher");

describe("CocktailController", () => {
  beforeEach(() => {
    // @ts-ignore
    CocktailController.instance = undefined;
    // @ts-ignore
    CocktailApiFetcher.mockClear();
    // @ts-ignore
    CocktailApiFetcher.prototype.getCocktailDataFromApi.mockImplementation(() => {
      return {
        data: {
          drinks: [{
            strDrink: "drink name",
            strIngredient1: "ingredient 1",
            strMeasure1: "measure 1",
            strInstructions: "instructions",
            strDrinkThumb: "thumbnail picture",
          }]
        }
      }
    });
  });

  it("can cache results", async () => {
    const cocktailController = CocktailController.getInstance();
    await cocktailController.getCocktail("query string");
    await cocktailController.getCocktail("query string");
    await cocktailController.getCocktail("query string");
    await cocktailController.getCocktail("query string");
    expect(CocktailApiFetcher.prototype.getCocktailDataFromApi).toHaveBeenCalledTimes(1);
  });

  it("keeps cache size at a maximum of 100 cached results", async () => {
    const cocktailController = CocktailController.getInstance();
    for (let i = 0; i < 1000; i++) {
      await cocktailController.getCocktail(`${i}`);
    }
    // @ts-ignore
    expect(CocktailController.getInstance().cache.size).toBeLessThanOrEqual(100)
  });

  it("correctly removes elements from cache: oldest elements go first", async () => {
    const cocktailController = CocktailController.getInstance();
    for (let i = 0; i < 1000; i++) {
      await cocktailController.getCocktail(`${i}`);
    }
    // @ts-ignore
    const cacheEntries = Array.from(CocktailController.getInstance().cache.entries());
    expect(cacheEntries.every(([key, value]) => {
      return key >= 900
    })).toBeTruthy()
  });

  it("doesn't add two elements with same key", async () => {
    const cocktailController = CocktailController.getInstance();
    await cocktailController.getCocktail("query string");
    await cocktailController.getCocktail("query string");
    // @ts-ignore
    expect(CocktailController.getInstance().cache.size).toBe(1);
  })
});
