import {
  Input,
  MenuItem,
  Select,
  Switch,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { useContext, useEffect } from "react";
import { ProductContext } from "../page";
import axios from "axios";
// import { ProductContext } from "./ProductListingPage";

export function Header() {
  const { productState, productDispatch } = useContext(ProductContext);

  const { categoryList, category, sortBy, sortByOrder, cartItems } =
    productState;
  console.log("cartItems", cartItems);

  useEffect(() => {
    getCategoryList();
  }, [cartItems]);

  const getCategoryList = async () => {
    try {
      const response: any = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      productDispatch({
        type: "SET_CATEGORY_LIST",
        categoryList: response.data
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const sortByList: string[] = ["price", "rating", "title"];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    sortByOrder: string
  ) => {
    if (sortByOrder !== null) {
      // setAlignment(newAlignment);
      productDispatch({
        type: "SET_SORT_BY_ORDER",
        sortByOrder: sortByOrder
      });
    }
  };
  const totalPrice = cartItems?.reduce((a: any, b: any) => a + b.price, 0);
  return (
    <div>
      <h1>Product Listing</h1>
      <span>Filter by category:</span>
      <Select
        value={category}
        onChange={(e) => {
          productDispatch({
            type: "SET_CATEGORY",
            category: e.target.value
          });
          console.log("changed", e.target.value);
        }}
        input={<Input />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categoryList?.map((category: string) => {
          return (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          );
        })}
      </Select>
      <span>Sort By:</span>
      <Select
        value={sortBy}
        onChange={(e) => {
          productDispatch({
            type: "SET_SORT_BY",
            sortBy: e.target.value
          });
          console.log("sort by", e.target.value);
        }}
        input={<Input />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {sortByList?.map((sortby: string) => {
          return (
            <MenuItem key={sortby} value={sortby}>
              {sortby}
            </MenuItem>
          );
        })}
      </Select>
      <ToggleButtonGroup
        // disabled
        size="small"
        color="primary"
        value={sortByOrder}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="asc">Asc</ToggleButton>
        <ToggleButton value="desc">Desc</ToggleButton>
      </ToggleButtonGroup>
      <span>Product count: {cartItems?.length}</span>
      <span>Total: ${totalPrice.toFixed(2)}</span>
    </div>
  );
}
