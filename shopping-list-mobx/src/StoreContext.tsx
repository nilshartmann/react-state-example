import React, { useContext } from "react";
import shoppingListStore, { IShoppingListStore } from "store";

type IStoreContext = {
  store: IShoppingListStore;
};

const StoreContext = React.createContext<IStoreContext>({ store: shoppingListStore });

type StoreContextProviderProps = { children: React.ReactNode };

export default function StoreContextProvider({ children }: StoreContextProviderProps) {
  return (
    <StoreContext.Provider value={{ store: shoppingListStore }}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const { store } = useContext(StoreContext);
  return store;
}
