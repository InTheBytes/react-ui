import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import React, {useState} from 'react';

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
            tryUpdate();
        } else {
            addValidation(name, text);
        }
    }

    const updateAddress = (newAddress) => {
        let addressList = newAddress.split(' ');
        let boolCheck = newAddress.trim().length > 0 && addressList.length >= 2;
        validate(
            boolCheck && !isNaN(addressList[0]),
            setUnit, addressList.shift(),
            'address', "Please include both the street and your unit"
        )
        validate(
            boolCheck && isNaN(addressList.join(' ')),
            setStreet, addressList.join(' '),
            'address', "Please include both the street and your unit"
        )
    }

    const updateCity = (newCity) => {
        validate(
            newCity.trim().length > 0, 
            setCity, newCity, 
            'city', "A valid city name must be included"
        )
    }

    const updateZip = (newZip) => {
        validate(
            newZip.length == 5 && !isNaN(newZip),
            setZip, newZip,
            'zip', "Please enter a valid 5-digit zip code"
        )
    }

    const updateState = (newState) => {
        setState(newState);
        tryUpdate();
    }

    const tryUpdate = () => {
        let values = [unit, street, city, state, zip]
        for (let val in values) {
            if (val.length == 0) return
        }
        props.updateLocation({
            unit: unit,
            street: street,
            city: city,
            state: state,
            zip: zip
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    required
                    fullWidth
                    aria-label='address'
                    name='Address'
                    error={checkValidations("address")}
                    helperText={validations["address"]}
                    onChange={(event) => setTimeout(() => updateAddress(event.target.value), 1000)}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField 
                    required
                    fullWidth
                    aria-label='city'
                    name='City'
                    error={checkValidations("city")}
                    helperText={validations["city"]}
                    onChange={(event) => setTimeout(() => updateCity(event.target.value), 3000)}
                />
            </Grid>
            <Grid item xs={3}>
                <Select 
                    aria-label='state'
                    value={state}
                    onChange={(event) => updateState(event.target.value)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select State</MenuItem>
                    {statesList.map((item) => 
                        <MenuItem value={item}>{item}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    fullWidth
                    aria-label='zip-code'
                    name='Zip Code'
                    error={checkValidations("zip")}
                    helperText={validations["zip"]}
                    onChange={(event) => setTimeout(() => updateZip(event.target.value), 3000)}
                />
            </Grid>
        </Grid>
    );
}

export default DestinationForm;
