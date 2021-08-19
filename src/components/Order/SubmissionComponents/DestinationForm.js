import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react';

function DestinationForm(props) {

    const [validations, setValidations] = useState({});
    const [unit, setUnit] = useState("")
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    
    const statesList = [
        "AL", "AK", "AZ", "AR", "CA", 
        "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", 
        "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO",
        "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH",
        "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT",
        "VA", "WA", "WV", "WI", "WY"
    ]

    const checkValidations = (key) => {
        return Object.keys(validations).includes(key);
    }

    const addValidation = (name, text) => {
        let newValidation = Object.assign({}, validations);
        newValidation[name] = text;
        setValidations(newValidation);
    }

    const validate = (boolExp, setter, val, name, text) => {
        delete validations[name];
        if (boolExp) {
            setter(val);
        } else {
            addValidation(name, text);
        }
    }

    const updateAddress = (newAddress) => {
        let addressList = newAddress.split(' ');
        let boolCheck = newAddress.trim().length > 0 && addressList.length >= 2;
        validate(
            boolCheck && !isNaN(addressList[0]),
            setUnit, addressList.shift().trim(),
            'address', "Please include both the street and your unit"
        )
        validate(
            boolCheck && isNaN(addressList.join(' ')),
            setStreet, addressList.join(' ').trim(),
            'address', "Please include both the street and your unit"
        )
    }

    const updateCity = (newCity) => {
        validate(
            newCity.trim().length > 0, 
            setCity, newCity.trim(), 
            'city', "A valid city name must be included"
        )
    }

    const updateZip = (newZip) => {
        validate(
            newZip.trim().length === 5 && !isNaN(newZip.trim()),
            setZip, newZip.trim(),
            'zip', "Please enter a valid 5-digit zip code"
        )
    }

    const updateState = (newState) => {
        setState(newState);
    }

    useEffect(() => {
        let values = [unit, street, city, state, zip]
        for (let val in values) {
            if (val.length === 0) return
        }
        props.updateLocation({
            unit: unit,
            street: street,
            city: city,
            state: state,
            zip: zip
        })
    }, [unit, street, city, state, zip])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    required
                    fullWidth
                    aria-label='address'
                    label='Street Address'
                    name='Address'
                    error={checkValidations("address")}
                    helperText={validations["address"]}
                    onChange={(event) => setTimeout(() => updateAddress(event.target.value), 1000)}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField 
                    required
                    aria-label='city'
                    label='City'
                    name='City'
                    error={checkValidations("city")}
                    helperText={validations["city"]}
                    onChange={(event) => setTimeout(() => updateCity(event.target.value), 1000)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    fullWidth
                    aria-label='zip-code'
                    label='Zip Code'
                    name='Zip Code'
                    error={checkValidations("zip")}
                    helperText={validations["zip"]}
                    onChange={(event) => setTimeout(() => updateZip(event.target.value), 1000)}
                />
            </Grid>
            <Grid item xs={4}>
                <Select 
                    required
                    aria-label='state'
                    value={state}
                    onChange={(event) => updateState(event.target.value)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select State</MenuItem>
                    {statesList.map((item) => 
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    )}
                </Select>
            </Grid>
        </Grid>
    );
}

export default DestinationForm;
