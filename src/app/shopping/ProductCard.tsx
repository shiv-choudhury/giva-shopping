"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Rating,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../page";
import { ProductCardProps, ProductProps } from "./product.model";
import { useRouter } from "next/navigation";

const ProductCard = (props: ProductCardProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { productState, productDispatch } = useContext(ProductContext);
  const { cartItems } = productState;
  const {
    title,
    description,
    price,
    thumbnail,
    category,
    rating,
    id,
    returnPolicy,
    warrantyInformation,
    shippingInformation,
    reviews
  } = props.products;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2, mr: 2 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            View Detail
          </Button>
        </Grid2>
      </Grid2>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Product Detail</DialogTitle>
        <DialogContent sx={{ background: "#cecdcd" }}>
          <img src={thumbnail} alt={title} width="auto" height="auto" />
          <Box>
            <Rating value={rating} precision={0.1} />
          </Box>
          <Typography variant="h5">{title}</Typography>
          <Typography>{description}</Typography>
          <Typography>Category: {category}</Typography>
          <Typography>Price: ${price}</Typography>
          <Typography>Return Policy: {returnPolicy}</Typography>
          <Typography>Warranty Information: {warrantyInformation}</Typography>
          <Typography>Shipping Information: {shippingInformation}</Typography>
          <Typography variant="h6">Reviews:</Typography>
          <Grid2 container spacing={2} direction={"row"}>
            {reviews &&
              reviews.length > 0 &&
              reviews.map(
                (review: {
                  rating: number;
                  comment: string;
                  reviewerName: string;
                }) => {
                  return (
                    <Grid2 key={review.reviewerName} size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle1">
                        {review.reviewerName}
                      </Typography>
                      <Box>
                        <Rating value={review.rating} precision={0.1} />
                      </Box>
                      <Typography variant="caption">
                        {review.comment}
                      </Typography>
                    </Grid2>
                  );
                }
              )}{" "}
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCard;
