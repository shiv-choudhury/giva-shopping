"use client";
import { createContext, useReducer } from "react";
import { ProductListingPage } from "./shopping/ProductListingPage";
import {
  ProductStateAction,
  ProductStateTypes
} from "./shopping/product.model";

export const ProductContext = createContext<any>({
  categoryList: []
});

function productReducer(state: ProductStateTypes, action: ProductStateAction) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_PRODUCT_DETAILS":
      return { ...state, products: action.products, loading: action.loading };
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.categoryList
      };
    case "SET_CATEGORY":
      return { ...state, category: action.category };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.sortBy };
    case "SET_SORT_BY_ORDER":
      return { ...state, sortByOrder: action.sortByOrder };
    case "SET_SKIP":
      return { ...state, skip: action.skip };
    case "SET_PARAMS":
      return { ...state, params: action.params };
    case "SET_CART_ITEMS": {
      return { ...state, cartItems: action.cartItems };
    }
    default:
      return state;
  }
}

export default function ShoppingApp() {
  const initialState: ProductStateTypes = {
    categoryList: [],
    products: {
      limit: 10,
      products: [],
      skip: 0,
      total: 0
    },
    skip: 0,
    loading: false,
    params: {},
    category: "",
    sortBy: undefined,
    sortByOrder: undefined,
    cartItems: []
  };

  const [productState, productDispatch] = useReducer(
    productReducer,
    initialState
  );

  return (
    <div>
      <ProductContext.Provider
        value={{
          productState,
          productDispatch
        }}
      >
        <ProductListingPage />
      </ProductContext.Provider>
    </div>
  );
}

// https://dummyjson.com/products?limit=10&skip=10
// https://dummyjson.com/products/category-list'
