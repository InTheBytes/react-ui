import React from 'react';
import { Container, Grid, Backdrop, CircularProgress, TextField } from '@material-ui/core';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import TimeWindowSelect from './SubmissionComponents/TimeWindowSelect';

function SubmitOrder(props) {

    const [timeWindow, setTimeWindow] = useState({});
    const [order, setOrder] = useState({});
    const [processing, setProcessing] = useState(false);
    const [location, setLocation] = useState({});


    const checkValidation = (key) => {
        return Object.keys(validations).includes(key);
      }

    const onToken = (token) => {
        let url = `${process.env.REACT_APP_SL_API_URL}`
        setProcessing(true);
        
    };

    return (
        <Container component='main' maxWidth='sm'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid container spacing={2}> 
                            <Grid item xs={12}>
                                <DestinationForm updateLocation={setLocation} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TimeWindowSelect changeWindow={(val) => setTimeWindow(val)} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Cart />
                </Grid>
                <Grid item xs={12}>
                    <StripeCheckout
                        amount={stripePrice}
                        label="Pay Now"
                        name="TestDriver"
                        image="https://www.clipartmax.com/png/small/327-3275784_free-stock-box-svg-shipping-pizza-delivery-car-icon.png"
                        description={`Your total is ${price}`}
                        panelLabel="Pay Now"
                        token={onToken}
                        stripeKey={`${process.env.STRIPE_PK}`}
                        currency="USD"
                    />
                </Grid>
            </Grid>
            <Backdrop open={processing}>
                <CircularProgress />
            </Backdrop>
        </Container>
    );
};

export default SubmitOrder;