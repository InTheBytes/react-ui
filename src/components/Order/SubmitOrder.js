import React from 'react';
import { Container, Grid } from '@material-ui/core';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function SubmitOrder(props) {

    return (
        <Container component='main' maxWidth='sm'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                        
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Cart />
                </Grid>
                <Grid item xs={12}>
                    <StripeCheckout />
                </Grid>
            </Grid>
        </Container>
    );
};

export default SubmitOrder;