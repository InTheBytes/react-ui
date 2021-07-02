import React from "react";
import { Grid, List, ListItem, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Location from "./Location.js";
import {formatStatus, formatWindow, formatDate} from "./OrderPipes.js"

function OrderDetails(props) {
  let order = props.order;

  return (
    <Dialog open={props.open} scroll="paper">
      <DialogTitle>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <strong>{order.restaurant.name + " "}</strong>
          </Grid>
          <Grid item xs={12} sm={6}>
            <em>{formatDate(order.windowStart)}</em>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5} md={6}>
            <p>
              {formatStatus(order.status)}
              <br />
              {formatWindow(order.windowStart, order.windowEnd)}
            </p>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Location address={order.destination} oneLine={false}></Location>
          </Grid>
          <Grid item xs={12}>
            <List>
              {order.items.map((item) => (
                <Grid container spacing={1}>
                  <ListItem key={item.id}>
                    <Grid item xs={2}>
                      x{item.quantity}
                    </Grid>
                    <Grid item xs={6}>
                      {item.name}
                    </Grid>
                    <Grid item xs={4}>
                      ${item.quantity * item.price}
                    </Grid>
                  </ListItem>
                </Grid>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDetails;
