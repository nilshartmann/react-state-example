import React from "react";
import { observer } from "mobx-react-lite";
import StoreContextProvider, { useStore } from "StoreContext";
import { IShoppingItem } from "store";

function App() {
  return (
    <StoreContextProvider>
      <div className="App">
        <h1>Shopping List</h1>
        <OrderAndFilter />
        <ShoppingList />
      </div>
    </StoreContextProvider>
  );
}

const OrderAndFilter = observer(function OrderAndFilter() {
  console.log("Render OrderAndFilter");
  const store = useStore();
  return (
    <div className="Container OrderAndFilter">
      <div>
        <label>
          <input
            type="radio"
            checked={store.orderBy === "name"}
            onChange={() => store.orderByName()}
          />
          Order by Item
        </label>
        <label>
          <input
            type="radio"
            checked={store.orderBy === "shop"}
            onChange={() => store.orderByShop()}
          />
          Order by Store
        </label>
      </div>
      <label>
        <input
          type="checkbox"
          checked={store.hideDoneItems}
          onChange={() => store.setHideDoneItems(!store.hideDoneItems)}
        />
        Hide Done
      </label>
    </div>
  );
});

const ShoppingList = observer(function ShoppingList() {
  console.log("Render ShoppingList");

  const store = useStore();
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Shop</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {store.orderedAndFilteredItems.map((si) => (
          <ShoppingItem key={si.id} item={si} />
        ))}
      </tbody>
    </table>
  );
});

type ShoppingItemProps = {
  item: IShoppingItem;
};
const ShoppingItem = observer(function ShoppingItem({ item }: ShoppingItemProps) {
  console.log("Render Shopping Item", item.id);
  return (
    <tr>
      <td>
        <input
          type="text"
          defaultValue={item.name}
          onBlur={(e) => (item.name = e.currentTarget.value)}
        />
      </td>
      <td>
        <select value={item.shop} onChange={(e) => item.updateShop(e.target.value)}>
          <option value="Drugstore">Drugstore</option>
          <option value="Supermarkt">Supermarket</option>
          <option value="Greengrocer">Greengrocer</option>
        </select>
      </td>
      <td>
        <input type="checkbox" checked={item.done} onChange={() => item.toggleDone()} />
      </td>
    </tr>
  );
});

export default App;
