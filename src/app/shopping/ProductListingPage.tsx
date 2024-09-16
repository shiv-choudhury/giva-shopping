"use client";
import { Button, Rating, Stack, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductContext } from "../page";
import { Header } from "./Header";
import { Loader } from "./Loader";
import { ProductCardProps, ProductProps } from "./product.model";

export function ProductListingPage() {
  const { productState, productDispatch } = useContext(ProductContext);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const response: any = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      productDispatch({
        type: "SET_CATEGORY_LIST",
        categoryList: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <ProductList />
    </div>
  );
}

export function ProductList() {
  const { productState, productDispatch } = useContext(ProductContext);
  const {
    categoryList,
    category,
    products,
    loading,
    skip,
    sortBy,
    sortByOrder,
    cartItems
  } = productState;

  useEffect(() => {
    getProducts();
  }, [skip, category, sortBy, sortByOrder]);

  const getProducts = async () => {
    productDispatch({
      type: "SET_LOADING",
      loading: true
    });
    let params = {
      limit: 10,
      skip: skip,
      sortBy: sortBy,
      order: sortByOrder
    };

    let url = "https://dummyjson.com/products";
    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    try {
      const response: any = await axios(url, {
        params: params
      });
      productDispatch({
        type: "SET_PRODUCT_DETAILS",
        products: response.data,
        loading: false
      });
    } catch (error) {
      productDispatch({
        type: "SET_LOADING",
        loading: false
      });
      console.error(error);
    }
  };

  return (
    <div>
      <Header />

      <h2>Product List</h2>
      <hr />
      {(!loading &&
        products?.products?.map((product: ProductProps) => {
          return <ProductCard products={product} />;
        })) || <Loader />}
      <hr />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          disabled={skip === 0}
          onClick={() =>
            productDispatch({
              type: "SET_SKIP",
              skip: skip - 10
            })
          }
        >
          Previous
        </Button>
        <div>
          Page: {skip / 10 + 1}/{Math.ceil(products?.total / 10)}
        </div>
        <Button
          variant="contained"
          disabled={skip + 10 >= products?.total}
          onClick={() =>
            productDispatch({
              type: "SET_SKIP",
              skip: skip + 10
            })
          }
        >
          Next
        </Button>
      </Stack>
    </div>
  );
}

const ProductCard = (props: ProductCardProps) => {
  const { productState, productDispatch } = useContext(ProductContext);
  const { cartItems } = productState;
  console.log("cartItems", cartItems);

  const { title, description, price, thumbnail, category, rating } =
    props.products;
  return (
    <div className="card-wrap">
      <div className="card">
        <div className="title">{title}</div>
        <Tooltip title={description} placement="top" arrow>
          <Typography noWrap>{description}</Typography>
        </Tooltip>
        <Typography
          variant="caption"
          sx={{ textTransform: "capitalize" }}
          noWrap
        >
          Category: {category}
        </Typography>
        <Rating value={rating} precision={0.1} />
        <b className="price">${price}</b>
        <img src={thumbnail} alt={title} width="auto" height="auto" />
        <Button
          variant="contained"
          onClick={() => {
            console.log("Add To Cart");
            productDispatch({
              type: "SET_CART_ITEMS",
              cartItems: [...cartItems, props.products]
            });
          }}
        >
          Add To Cart
        </Button>
        <Button
          color="error"
          variant="outlined"
          // onClick={() => {
          //   console.log("Remove From Cart");
          //   productDispatch({
          //     type: "REMOVE_FROM_CART",
          //     products: props.products
          //   });
          // }}
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
};
