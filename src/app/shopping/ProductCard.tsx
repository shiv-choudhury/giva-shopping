"use client";
import {
  Box,
  Button,
  Grid2,
  Rating,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { useContext } from "react";
import { ProductContext } from "../page";
import { ProductCardProps, ProductProps } from "./product.model";

const ProductCard = (props: ProductCardProps) => {
  const { productState, productDispatch } = useContext(ProductContext);
  const { cartItems } = productState;

  const { title, description, price, thumbnail, category, rating } =
    props.products;

  const alreadyInCart = cartItems.find(
    (item: ProductProps) => item.title === props.products.title
  );
  return (
    <div className="card" key={title}>
      <Grid2 container direction="row" spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <img src={thumbnail} alt={title} width="auto" height="auto" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="h5">{title}</Typography>
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
          <Box>
            <Rating value={rating} precision={0.1} />
          </Box>
          <Typography variant="h6">${price}</Typography>
          <Stack direction="column"></Stack>
          <Button
            fullWidth
            disabled={alreadyInCart}
            variant="contained"
            sx={{ mb: 2, mr: 2 }}
            onClick={() => {
              if (!alreadyInCart) {
                productDispatch({
                  type: "SET_CART_ITEMS",
                  cartItems: [...cartItems, props.products]
                });
              }
            }}
          >
            Add To Cart
          </Button>
          {alreadyInCart && (
            <Button
              fullWidth
              sx={{ mb: 2, mr: 2 }}
              color="error"
              variant="contained"
              onClick={() => {
                productDispatch({
                  type: "SET_CART_ITEMS",
                  cartItems: cartItems.filter(
                    (item: ProductProps) => item.title !== props.products.title
                  )
                });
              }}
            >
              Remove from Cart
            </Button>
          )}
          <Button fullWidth variant="outlined" sx={{ mb: 2, mr: 2 }}>
            View Detail
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ProductCard;
