import React from 'react';
import { useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../store/actions';

const SingleNotification = ({ notification, mode }) => {

    const dispatch = useDispatch();

    const getNotificationColor = () => {
        switch(notification.Tip) {
            case 0: return 'red';
            case 1: return 'yellow';
            case 2: return 'blue';
            case 3: return 'green';
            default: return 'grey';
        }
    }

    const getNotificationIcon = () => {
        switch(notification.Tip) {
            case 0: return <i className="x icon" style={{ color: 'red' }}></i>
            case 1: return <i className="exclamation icon" style={{ color: 'gold' }}></i>
            case 2: return <i className="info circle icon" style={{ color: 'blue' }}></i>
            case 3: return <i className="check icon" style={{ color: 'green' }}></i>
            default: return <div></div>;
        }
    }

    return mode === 'Unread notifications' 
        ? 
        <div className={`ui ${getNotificationColor()} raised container segment`} style={{ width: 600, marginBottom: 15, overflow: 'hidden' }} onClick={() => dispatch(markNotificationAsRead([notification.IdPoruke]))}>
            <div style={{ float: 'left' }}>
                {getNotificationIcon()}
            </div>

            <div style={{ marginLeft: 45, float: 'left', marginRight: 150 }}>
                {notification.Sadrzaj}
            </div>

            <div>
                {notification.Timestamp.substring(0,10)}
            </div>   
        </div>
        : 
        <div className={`ui ${getNotificationColor()} raised container segment`} style={{ width: 600, marginBottom: 15, overflow: 'hidden' }}>
            <div style={{ float: 'left' }}>
                {getNotificationIcon()}
            </div>

            <div style={{ marginLeft: 45, float: 'left', marginRight: 150 }}>
                {notification.Sadrzaj}
            </div>

            <div>
                {notification.Timestamp.substring(0,10)}
            </div>   
        </div>
}

export default SingleNotification;