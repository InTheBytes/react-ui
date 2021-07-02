import React from "react";
import {Grid} from "@material-ui/core";
import Location from "./Location.js";

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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <h4>{order.restaurant.name}</h4>
        <em>
          <Location address={order.restaurant.location} oneLine={true} />
        </em>
      </Grid>
      <Grid item xs={4}>
        <Location address={order.destination} />
      </Grid>
      <Grid item xs={4}>
        <strong>${calculateTotal()}.00</strong>
      </Grid>
    </Grid>
  );
}

export default OrderListing;
