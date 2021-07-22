import React from "react";
import {Grid} from "@material-ui/core";
import Location from "./Location.js";
import {formatDate} from "./OrderPipes.js";

function OrderListing(props) {
  const order = props.order;

  const calculateTotal = () => {
    let total = 0
    order.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <em>{formatDate(order.windowStart, true)}</em>
      </Grid>
      <Grid item xs={4}>
        <strong>{order.restaurant.name}</strong>
      </Grid>
      <Grid item xs={4}>
        <Location address={order.destination} />
      </Grid>
      <Grid item xs={2}>
        <strong>${calculateTotal()}.00</strong>
      </Grid>
    </Grid>
  );
}

export default OrderListing;
