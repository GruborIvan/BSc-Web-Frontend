import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApproveUser, GetUnapprovedUsers } from '../../store/actions';
import { unapprovedUsersSelector } from '../../store/selectors/AuthSelector';
import UserNumberToRole from '../../constants/EnumFunctions'
import pictureMapper from '../../constants/PictureHandler';

const AdminPreferences = () => {

    const dispatch = useDispatch();
    const users = useSelector(unapprovedUsersSelector);

    useEffect(() => {
        dispatch(GetUnapprovedUsers()) // eslint-disable-next-line
    },[])

    const userDetailsRendered = users.map((user) => {
        return ( <div className="card" key={user.Username}>
            <div className="content">
                <img className="right floated mini ui image" src={pictureMapper(user.NazivProfilneSlike)} alt="Nema slike"/>
                <div className="header">
                    {user.Username}
                </div>
                <div className="meta">
                    {UserNumberToRole(user.VrsteKorisnika)}
                </div>
                <div className="description" style={{marginBottom: 10}}>
                    Approve user account!
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button" onClick={() => dispatch(ApproveUser({username: user.Username, val: 0}))}>Approve</div>
                        <div className="ui basic red button" onClick={() => dispatch(ApproveUser({username: user.Username, val: 2}))}>Deny</div>
                    </div>
                </div>
            </div>
        </div>
    )})

    return <div>
        <div className="ui cards" style={{marginTop: 70, marginLeft: 180, position: 'fixed'}}>
            {users.length === 0 ? <h1 style={{ marginTop: 20, marginLeft: 30 }}> No users to approve. </h1> : userDetailsRendered}
        </div>
    </div>
}

export default AdminPreferences;