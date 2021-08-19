import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

function TimeWindowSelect(props) {

    const [windowOptions, setWindowOptions] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        let isAvailableToday = moment().hour() <= 20
        let start = isAvailableToday ? moment().hour() : 8;
        let dayOffset = isAvailableToday ? 0 : 1
        let options = []
        while (start <= 20) {
            options.push({
                'start': moment(start, 'HH').add(dayOffset, 'days').toDate(),
                'end': moment(++start, 'HH').add(dayOffset, 'days').toDate()
        })}
        setWindowOptions(options);
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value)
        props.changeWindow(windowOptions[event.target.value]);
    }

    const renderSection = (start, endExclusive) => {
        let subOptions = windowOptions.slice(start, endExclusive)
        return (
            <Grid item xs={6}>
                {subOptions.map((option) => (
                    <FormControlLabel 
                        key={option["start"]}
                        aria-label={`time-${moment(option['start']).hour()}`}
                        value={`${windowOptions.indexOf(option)}`} 
                        control={<Radio />} 
                        label={`${moment(option['start']).format("h")} - ${moment(option['end']).format('h a')}`} />
                ))}
            </Grid>
        )
    }
    const renderInColumns = () => {
        return (
            <> 
                {renderSection(0, 7)}
                {renderSection(7, windowOptions.length)}
            </>
        )
    }

    return (
        <FormControl component='fieldset'>
            {windowOptions && (<>
                <FormLabel component='h6' aria-label='time-label'>Time Window for {moment(windowOptions[0]["start"]).format("MMM, Do")}</FormLabel>
                <RadioGroup 
                    aria-label='time-window' 
                    name='time-window' 
                    value={value} 
                    onChange={handleChange}
                >
                    <Grid container spacing={1}>
                    {windowOptions && (windowOptions.length > 7) ? (
                        renderInColumns()
                    ) : (
                        windowOptions.map((item) => 
                            <FormControlLabel 
                                key={item['start']}
                                aria-label={`time-${moment(item['start']).hour()}`}
                                value={`${windowOptions.indexOf(item)}`} 
                                control={<Radio />} 
                                label={`${moment(item['start']).format("h")} - ${moment(item['end']).format('h a')}`} />)
                        )}
                    </Grid>
                </RadioGroup>
            </>)}
        </FormControl>
    )
}

export default TimeWindowSelect;