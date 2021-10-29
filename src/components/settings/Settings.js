import React from 'react';
import ChangePasswordComponent from './ChangePasswordComponent';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from '../../store/selectors/AuthSelector';
import PrioritiesComponent from './PrioritiesComponent';

const Settings = () => {

    const { push } = useHistory();

    const user = useSelector(loggedUserSelector);
    
    if (user === undefined || user === null) {
        push('/Unauthorized')
    }

    return (<div style={{ backgroundColor: 'grey', height: 720 }}> 
        <div className="ui raised container segment" style={{width: 1200, top: 100, left: 70, height: 580, overflow: 'hidden'}}>
            <div style={{ float: 'left' }}>
                <ChangePasswordComponent/>
            </div>
            {user.VrsteKorisnika === 'ADMINISTRATOR' ? 
                <div style={{ float: 'left' }}>
                    <PrioritiesComponent/>
                </div>
                :
                <div></div>
            }
        </div>
    </div>)
}

export default Settings;