import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { AssignUserToCrew, GetClans, GetCrews } from '../../store/actions';
import { ClanoviSelector, CrewSelector } from '../../store/selectors/AuthSelector';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from '../../store/selectors/AuthSelector';

const CrewComponent = () => {

    const dispatch = useDispatch();
    const crews = useSelector(CrewSelector);
    const clanovi = useSelector(ClanoviSelector);

    const [selectedCrew,setSelectedCrew] = useState(1);
    const [selectedClan,setSelectedClan] = useState(1);

    const { push } = useHistory();

    const user = useSelector(loggedUserSelector);
    
    if (user === undefined || user === null) {
        push('/Unauthorized')
    }

    const onAssignCrew = () => {
        const payload = { CrewId: selectedCrew, UserId: selectedClan }
        dispatch(AssignUserToCrew(payload)); // eslint-disable-next-line
    }

    useEffect(() => {
        dispatch(GetCrews());
        dispatch(GetClans());   // eslint-disable-next-line
    },[])

    const renderedCrews = crews.map(c => {
        const word = selectedCrew === c.Id ? 'active' : '';
        return <button key={c.Id} className={`ui green button item ${word}`} onClick={() => setSelectedCrew(c.Id)}> {c.NazivEkipe} </button>
    })

    const renderedClanovi = clanovi.map(clan => {
        const word = selectedClan === clan.Id ? 'active' : '';
        return <button key={clan.Id} className={`ui green button item ${word}`} onClick={() => setSelectedClan(clan.Id)}> {clan.Username} </button>
    })

    return <div style={{ backgroundColor: 'grey', height: 720 }}> 
        <div style={{marginLeft: 150, height: 550}}>
        <div className="ui white container" style={{ marginTop: 70, position: 'fixed', width: 1000, right: 1, left: 90, height: 510}}>

            <table className="ui raised green segment" style={{ marginLeft: 50, marginTop: 60, width: 850 }}>
                
                <tr>
                    <td colSpan="4">
                        <div className="ui center aligned header" style={{ marginBottom: 40 }}>
                            <h2> Select crew and crew member to add to this crew </h2>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4 style={{ marginLeft: 50 }}> Crews </h4>
                        <div className="ui vertical pointing menu" style={{ width: 125, float: 'left' }}>
                            {renderedCrews}
                        </div>
                    </td>

                    <tr>
                        <i class="angle huge double right icon" style={{ marginTop: 100, height: 120, width: 80 }}></i>
                    </tr>
                    
                    <td>
                    <h4> Crew members without a crew </h4>
                        <div className="ui vertical pointing menu" name="usi" style={{ width: 125, float: 'left', marginLeft: 50, marginTop: 30 }}>
                            {clanovi.length > 0 ? renderedClanovi : <div> No available crew members </div>}
                        </div>
                    </td>

                    <td>
                        <button className="ui inverted green button" type="button" style={{ marginLeft: 50, marginTop: 70 }} onClick={() => onAssignCrew()}> Assign </button>
                    </td>
                </tr>
          

                <div style={{ overflow: 'hidden', marginTop: 80, marginLeft: 140 }}>
                
                </div>

            </table>

        </div>
    </div>
    </div>
}

export default CrewComponent;