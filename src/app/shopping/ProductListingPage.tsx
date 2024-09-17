"use client";
import { Button, Grid2, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductContext } from "../page";
import Header from "./Header";
import { Loader } from "./Loader";
import { ProductProps } from "./product.model";
import ProductCard from "./ProductCard";

export function ProductListingPage() {
  return (
    <div style={{ padding: 20 }}>
      <Header />
      <ProductList />
    </div>
  );
}

export function ProductList() {
  const { productState, productDispatch } = useContext(ProductContext);
  const { category, products, loading, skip, sortBy, sortByOrder } =
    productState;

  useEffect(() => {
    getProducts();
  }, [skip, category, sortBy, sortByOrder]);

  const getProducts = async () => {
    productDispatch({
      type: "SET_LOADING",
      loading: true
    });
    const params = {
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
      const response = await axios(url, {
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

  if (loading) return <Loader />;

  return (
    <div>
      <hr />
      <h2>Product List</h2>
      <Grid2 container spacing={2}>
        {!loading &&
          products?.products?.length > 0 &&
          products?.products?.map((product: ProductProps) => {
            return (
              <Grid2 key={product.title} size={{ lg: 6, md: 12, sm: 12 }}>
                <ProductCard key={product.title} products={product} />
              </Grid2>
            );
          })}
      </Grid2>
      <hr />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          disabled={skip === 0}
          onClick={() =>
            productDispatch({
              type: "SET_SKIP",
              skip: Math.max(skip - 10, 0)
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
