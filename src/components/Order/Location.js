import React from 'react';

function Location(props) {
    const address = props.address;

    function oneLine() {
      if (props.oneLine) {
        return(<>, </>)
      } else return <br />;
    }

    return (
      <>
        <p>
          {address.unit +" "+ address.street}{oneLine()}
          {address.city + ", " + address.state + " " + address.zipCode}
        </p>
      </>
    );
}

export default Location;