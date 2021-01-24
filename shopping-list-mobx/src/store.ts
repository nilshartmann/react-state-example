import { makeAutoObservable, trace } from "mobx";
import { nextId } from "utils";

export type IShoppingItem = {
  id: string;
  name: string;
  shop: string;
  done: boolean;
  toggleDone(): void;
  updateShop(newShop: string): void;
};

export function createShoppingItem(name: string, shop: string, done = false): IShoppingItem {
  return makeAutoObservable({
    id: nextId(),
    name,
    shop,
    done,

    toggleDone() {
      this.done = !this.done;
    },

    updateShop(newShop: string) {
      this.shop = newShop;
    },
  });
}

class ShoppingListStore {
  items: IShoppingItem[] = [];
  orderBy: "name" | "shop" = "name";
  hideDoneItems: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  orderByName() {
    this.orderBy = "name";
  }

  orderByShop() {
    this.orderBy = "shop";
  }

  setHideDoneItems(f: boolean) {
    this.hideDoneItems = f;
  }

  addItem(name: string, shop: string, done = false) {
    const newItem = createShoppingItem(name, shop, done);
    this.items.push(newItem);
  }

  get orderedAndFilteredItems() {
    console.log("compute orderedAndFilteredItems");
    trace();
    return this.items
      .filter((i) => (this.hideDoneItems ? !i.done : true))
      .sort((i1, i2) =>
        this.orderBy === "name" ? i1.name.localeCompare(i2.name) : i1.shop.localeCompare(i2.shop)
      );
  }

  get remainingItems() {
    console.log("compute remainingItems");
    trace();

    return this.items.filter((i) => !i.done);
  }
}

const shoppingListStore = new ShoppingListStore();
export type IShoppingListStore = typeof shoppingListStore;
shoppingListStore.addItem("pasta", "Supermarket");
shoppingListStore.addItem("toothpaste", "Drugstore");
shoppingListStore.addItem("eggs", "Supermarket");
shoppingListStore.addItem("butter", "Supermarket", true);
shoppingListStore.addItem("olive oil", "Supermarket", true);
shoppingListStore.addItem("shower gel", "Drugstore");
shoppingListStore.addItem("cabbage", "Greengrocer");
shoppingListStore.addItem("onions", "Greengrocer");

export default shoppingListStore;
