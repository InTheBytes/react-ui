import React, { useState, useEffect } from "react";
import { Grid, List, ListItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import OrderListing from "./OrderListing.js";
import OrderDetails from "./OrderDetails.js";

import "./OrderHistory.css";

function OrderHistory(props) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({});
  const [detailsOpened, setDetailsOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  function fetchPage() {
    console.log("Fetching page...");
    axios
      .get(`${process.env.REACT_APP_SL_API_URL}/order`, {
        headers: { Authentication: props.auth },
        params: {
          page: page - 1,
          pageSize: 5,
        },
      })
      .then((resp) => {
        console.log(resp);
        setResult(resp.data);
        console.log("After set");
        console.log(result);
      });
  }

  useEffect(() => {
    console.log("re-rendering...");
  });

  useEffect(() => {
    fetchPage();
  }, []);

  useEffect(() => {
    console.log("Re-rendering page...");
    fetchPage();
  }, [page]);

  useEffect(() => {
    if (detailsOpened != null) {
      setDetailsOpened(true);
    }
  }, [selectedOrder]);

  const changePage = (e, val) => {
    setPage(val);
  };

  const checkBeforeRender = (bool, jsx) => {
    if (bool) {
      return jsx;
    } else return null;
  };

  const closeDetails = () => {
    setSelectedOrder(null);
    setDetailsOpened(false);
  };

  return (
    <div className="orderHistory">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            {result.content?.map((data) => (
              <ListItem
                key={data.id}
                button
                onClick={() => setSelectedOrder(data)}
              >
                <OrderListing order={data} />
              </ListItem>
            ))}
          </List>
          {checkBeforeRender(
            result.totalPages > 1,
            <Pagination
              page={page}
              count={result.totalPages}
              onChange={changePage}
            />
          )}
        </Grid>
      </Grid>
      {checkBeforeRender(
        selectedOrder != null,
        <OrderDetails
          open={detailsOpened}
          order={selectedOrder}
          close={closeDetails}
        ></OrderDetails>
      )}
    </div>
  );
}

export default OrderHistory;
