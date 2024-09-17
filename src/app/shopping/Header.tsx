import {
  Grid2,
  Input,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductContext } from "../page";

export default function Header() {
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
      productDispatch({
        type: "SET_SORT_BY_ORDER",
        sortByOrder: sortByOrder
      });
    }
  };
  const totalPrice = cartItems?.reduce((a: any, b: any) => a + b.price, 0);
  return (
    <div>
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid2 container spacing={2} direction="row">
          <Grid2>
            <span>Filter by category:</span>
            <Select
              sx={{ minWidth: 120 }}
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
                  <MenuItem key={`category-${category}`} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid2>
          <Grid2>
            <span>Sort by:</span>
            <Select
              sx={{ minWidth: 120 }}
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
                  <MenuItem key={`sortby-${sortby}`} value={sortby}>
                    {sortby}
                  </MenuItem>
                );
              })}
            </Select>

            <ToggleButtonGroup
              sx={{ ml: 2 }}
              size="small"
              color="primary"
              value={sortByOrder}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="asc">Asc</ToggleButton>
              <ToggleButton value="desc">Desc</ToggleButton>
            </ToggleButtonGroup>
          </Grid2>
        </Grid2>
        <Grid2>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">
              In cart: <b>{cartItems?.length}</b>
            </Typography>
            <Typography variant="h6">
              Total cost: <b>$ {totalPrice.toFixed(2)}</b>
            </Typography>
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
}
