import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles, 
    Container, 
    Table, 
    TableBody, 
    TableRow, 
    TableCell, 
    Typography, 
    MobileStepper, 
    Grid } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../Authentication/AuthContext';

const useStyles = makeStyles((theme) => ({
    stepper: {
        width: "200%",
        transform: "scale(1, 3)",
        color: "#2699FB",
        backgroundColor: "white"
    }
}))

export function OrderTrackingWrapper(props) {
    const { id } = useParams()

    return (
        <AuthContext.Consumer>
            {(value) => <InProgressOrder auth={value.auth} id={id} />}
        </AuthContext.Consumer>
    )
}

export function InProgressOrder(props) {
    const classes = useStyles()
    const history = useHistory()

    const [order, setOrder] = useState({})
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        function fetchOrder() {    
            axios.get(`${process.env.REACT_APP_SL_API_URL}/order/${props.id}`, {
                headers: { Authentication: props.auth }})
                .then(
                    (resp) => {
                        setOrder(resp.data)
                        let code = Number(resp.data.status.split(' ')[0])
                        if (code !== 4 && code !== 5) {   
                            let clock = setTimeout(() => fetchOrder(), 15000)
                            setTimer(clock)
                        }
                    }, (err) => {
                        if (err.response?.status === 401 || err.response?.status === 403) {
                            alert('Not authorized to track this order')
                            history.push('/error')
                        }
                    }
                )
        }
        if (props.auth.length && props.auth.length > 0 && !timer) {
            fetchOrder()
        }
    }, [props.auth, timer, props.id, history])

    useEffect(() => {
        return () => clearTimeout(timer)
    })

    const getDisplay = () => {
        let title
        let step
        switch (Number(order.status.split(' ')[0])) {
            case 0:
            case 1:
                title = 'Your order has been sent'
                step = 0
                break
            case 2:
                title = 'Your order is ready'
                step = 1
                break
            case 3:
                title = `${order.driver?.name.split(" ")[0]} is on their way with your order!`
                step = 2
                break
            case 4:
                title = `${order.driver?.name.split(" ")[0]} has arrived with your order!`
                step = 3
                break
            case 5:
                title = "Order has been cancelled"
                step = -1
                break
            default:
        }
        return {
            title: title,
            step: step
        }
    }

    return (
        <Container component='main' maxWidth='sm'>
             <>{order?.id &&
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography component='p' variant='h2'>
                            {getDisplay().title}
                        </Typography>
                        <Typography component='p' variant='caption'>
                            Delivery from {order.restaurant.name} scheduled for {`${moment(order.windowStart).format('LT')} - ${moment(order.windowEnd).format('LT')}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {getDisplay().step >= 0 ?
                            (<MobileStepper
                                className={classes.stepper}
                                variant='progress'
                                steps={4}
                                activeStep={getDisplay().step}
                                position='static'
                            />) : <></>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Table>
                            <TableBody>
                            {order.items.map((item) => {
                                return (
                                <TableRow key={item.name}>
                                    <TableCell>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        ${Number(item.quantity * item.price).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            )})}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            }</>
        </Container>
    );
};