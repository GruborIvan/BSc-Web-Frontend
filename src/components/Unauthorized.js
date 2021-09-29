import React from 'react';
import { useHistory } from 'react-router';

const Unauthorized = () => {

    const { push } = useHistory()

    return <div style={{ backgroundColor: 'grey', height: 720 }}> 
        <div className="ui raised container segment" style={{ width: 1000,  position: 'fixed', top: 100, left: 280 }}>
        <h1 className="ui header" style={{ marginLeft: 400, marginTop: 40 }}> Are you lost? </h1>
        <img src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg?compress=1&resize=400x300" alt="Unauthorized.jpg" style={{ marginLeft: 280 }}/>
        <br/>
        <br/>
        <br/>
        <button className="ui inverted green button" onClick={() => push('/')} style={{ marginLeft: 400, marginTop: 40, marginBottom: 50 }}> Return to login page </button>
    </div>
    </div>
}

export default Unauthorized;