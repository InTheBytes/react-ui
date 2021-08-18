import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { Container, Grid, Backdrop, CircularProgress, Card, Typography, ButtonGroup, TextField, Button } from '@material-ui/core';
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import TimeWindowSelect from './SubmissionComponents/TimeWindowSelect';
import Cart from '../Cart/Cart';
import DestinationForm from './SubmissionComponents/DestinationForm';
import CartContext from '../Cart/CartContext';
import AuthContext from '../Authentication/AuthContext';

function SubmitOrder(props) {

    const [auth, setAuth] = useState("");
    const [timeWindow, setTimeWindow] = useState({});
    const [location, setLocation] = useState({});
    const [price, setPrice] = useState(0);
    const [tip, setTip] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [payEnabled, setPayEnabled] = useState(false);
    const [items, setItems] = useState([]);
    const [profile, setProfile] = useState(null)

    const history = useHistory();

    useEffect(() => {
        let ready = true;
        let locProps = Object.keys(location);
        ['unit', 'street', 'city', 'state', 'zip'].forEach((x) => {
            ready = (ready && locProps.includes(x) && location[x].length > 0)
        });
        setPayEnabled(ready && Object.entries(timeWindow).length > 0 && price > 0 && items.length > 0)
    }, [timeWindow, location, price, items])

    useEffect(() => {
        if (auth.length > 0) {
            axios.get(`${process.env.REACT_APP_SL_API_URL}/user/profile`, {
                headers: {"authentication": auth}
            }).then(
                (resp) => (setProfile(resp.data))
            )
        }
    }, [auth])

    const onToken = async (token) => {
        setProcessing(true);
        console.log(auth)
        console.log(items)

        const { data } = await axios.post(`${process.env.REACT_APP_SL_API_URL}/order`,
            {
                destination: {
                    unit: location.unit,
                    street: location.street,
                    city: location.city,
                    state: location.state,
                    zipCode: parseInt(location.zip)
                },
                restaurantId: "",
                customerId: profile.userId,
                windowStart: moment(timeWindow.start).format('YYYY-MM-DD HH:mm:ss'),
                windowEnd: moment(timeWindow.end).format('YYYY-MM-DD HH:mm:ss'),
                items: items
            },
            {headers: {'authentication': `${auth}`}
            
        });
        
        axios.post(
            `${process.env.REACT_APP_SL_API_URL}/payment/stripe`,
            {
                amount: price,
                token,
                currency: "USD",
                orderId: data.id,
                tip: tip
            }
        ).then(
            (resp) => {
                alert("Order submitted successfully!");
                history.push(`/order/${data.id}`);
            }
        )
    };

    return (
        <Container component='main' maxWidth='sm'>
            <AuthContext.Consumer>
                {(context) => {if (auth.length === 0) setAuth(context.auth)}}
            </AuthContext.Consumer>
            <CartContext.Consumer>
                {(context) => {
                    let cartItems = Object.values(context.cart);
                    let subtotal = cartItems.reduce((val, item) => val += item['price'] * item['quantity'], 0);
                    if (JSON.stringify(items) !== JSON.stringify(cartItems)) {
                        setItems(cartItems);
                    }
                    if (subtotal !== price) {
                        setPrice(Number(subtotal));
                    }
                }}
            </CartContext.Consumer>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid container spacing={2}> 
                            <Grid item xs={12}>
                                <DestinationForm updateLocation={setLocation} aria-label='destination-form'/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} />
                        <Grid item xs={12}>
                            <TimeWindowSelect changeWindow={setTimeWindow} aria-label='time-select'/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Card> 
                            <Grid item xs={12}>
                                <Cart />
                            </Grid>
                            <Grid item xs={12} align='right'>
                                <Typography variant='h5' aria-label='subtotal'>
                                    Subtotal: ${Number(price).toFixed(2)}
                                </Typography>
                                <ButtonGroup
                                    size='small'
                                    aria-label='tip-control'
                                >
                                    <Button aria-label='ten-percent-tip' onClick={() => setTip(price * 0.1)}>10%</Button>
                                    <Button aria-label='fifteen-percent-tip' onClick={() => setTip(price * 0.15)}>15%</Button>
                                    <Button aria-label='twenty-percent-tip' onClick={() => setTip(price * 0.2)}>20%</Button>
                                    <TextField 
                                        aria-label='tip-value'
                                        name='tip-value'
                                        value={`$${tip.toFixed(2)}`} 
                                        onChange={(event) => {
                                            if (event.target.value !== tip) setTip(event.target.value)
                                        }}
                                    />
                                    <Typography variant='caption' aria-label='tip-instruction'>
                                        Select a percentage or enter a custom tip
                                    </Typography>
                                </ButtonGroup>
                                <Typography variant='h4' aria-label='total'>
                                    Total: ${Number(price + tip).toFixed(2)}
                                </Typography>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} align='center'>
                    <StripeCheckout
                        aria-label='checkout'
                        disabled={!payEnabled}
                        amount={(price + tip) * 100}
                        label="Pay Now"
                        name="TestDriver"
                        image="https://www.clipartmax.com/png/small/327-3275784_free-stock-box-svg-shipping-pizza-delivery-car-icon.png"
                        description={`Your total is $${(price + tip).toFixed(2)}`}
                        panelLabel="Pay Now"
                        token={onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_PK}
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