import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React from 'react';
import { emailValidator } from '../Authentication/ValidatorRegEx';

export function ProfileEditor(props) {

    const cancel = () => {
        setOpen(false);
    }

    return (
        <Dialog open={props.open} aria-labelledby={props.title}>
            <DialogTitle id={props.title}>{props.title}</DialogTitle>
            <DialogContent children={props.child} />
            <DialogActions>
                <Button onClick={props.onCancel} color="secondary">
                    Cancel
                </Button>
                <Button onClick={props.onSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export function ContactInformationForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const profile = props.profile;

    let regex = emailValidator

    const submit = (evt) => {
        evt.preventDefault();
        setisLoading(true)

        profile.email = evt.target.elements.username.value;

        axios.put(`${process.env.REACT_APP_SL_API_URL}/user/${profile.userId}`, {

        })

    }

    const handleSubmit = props.onSubmit;

    return (
        <></>
    );
};


export function PasswordChangeForm(props) {

    return (
        <></>
    );
};