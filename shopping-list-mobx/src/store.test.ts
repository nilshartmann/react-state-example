import { autorun, runInAction } from "mobx";
import { createShoppingItem } from "store";

test("Observing works", () => {
  const item = createShoppingItem("Salad", "Organic shop");

  let history: string[] = [];

  function recordShopChange() {
    history.push(item.shop);
  }

  autorun(recordShopChange);

  // initial value
  expect(history).toEqual(["Organic shop"]);

  item.updateShop("Supermarket");
  expect(history).toEqual(["Organic shop", "Supermarket"]);

  item.toggleDone();
  // should have not been changed, as recordShopChange only
  //   reacts to changes on 'shop'
  expect(history).toEqual(["Organic shop", "Supermarket"]);

  item.updateShop("Organic shop");
  expect(history).toEqual(["Organic shop", "Supermarket", "Organic shop"]);
});
