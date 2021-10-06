import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetCalls } from '../../store/actions';
import { callSelector } from '../../store/selectors/AuthSelector';
import Paginator from '../Paginator';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from '../../store/selectors/AuthSelector';

const CallsComponent = () => {

    const dispatch = useDispatch();
    const calls = useSelector(callSelector);

    const { push } = useHistory();

    const user = useSelector(loggedUserSelector);

    const [currentPage,setCurrentPage] = useState(1);   // eslint-disable-next-line
    const [postsPerPage,setPostsPerPage] = useState(5);

    if (user === undefined || user === null) {
        push('/Unauthorized')
    }

    useEffect(() => {
        dispatch(GetCalls('Razlog'));  // eslint-disable-next-line
    },[])

    // Get current incidents..
    const indexOfLastIncident = currentPage * postsPerPage;
    const indexOfFirstIncident = indexOfLastIncident - postsPerPage;
    const currentIncidents = calls.slice(indexOfFirstIncident, indexOfLastIncident); 

    const callsRendered = currentIncidents.map(call => {
        return <tr key={call.Id}>
            <td> {call.Razlog} </td>
            <td> {call.Kvar} </td>
            <td> {call.UsernameKor === '' ? <i style={{color: 'green'}}> Anonimna prijava poziva </i> : call.UsernameKor} </td>
            <td> {call.Komentar} </td>
            <td> {call.IncidentId === '' ? <i style={{color: 'green'}}> None </i> : call.IncidentId} </td>
        </tr>
    })

    return (<div style={{ backgroundColor: 'grey', height: 720 }}> 
        <div style={{marginLeft: 150, height: 550}}>
        <div className="ui raised container segment" style={{paddingLeft: 20,marginTop: 100, position: 'fixed', width: 1280, right: 1, left: 150, height: 520}} >
            {/* TABELA */}
            <h2 className="ui header" style={{ marginLeft: 15, marginTop: 10 }}> All Calls </h2>
            <table className="ui sortable celled green table" style={{marginTop: 40}}>
                    <thead>
                        <tr>
                            <th>
                                Razlog
                                <button type="button" style={{ marginLeft: 10, width: 32 }} onClick={() => dispatch(GetCalls('Razlog'))}>
                                    <i className="caret down icon"></i>
                                </button>
                            </th>
                            <th>
                                Kvar
                                <button type="button" style={{ marginLeft: 10, width: 32 }} onClick={() => dispatch(GetCalls('Kvar'))}>
                                    <i className="caret down icon"></i>
                                </button>
                            </th>
                            <th>
                                Username korisnika
                                <button type="button" style={{ marginLeft: 10, width: 32 }} onClick={() => dispatch(GetCalls('UsernameKor'))}>
                                    <i className="caret down icon"></i>
                                </button>
                            </th>
                            <th>
                                Komentar
                                <button type="button" style={{ marginLeft: 10, width: 32 }} onClick={() => dispatch(GetCalls('Kvar'))}>
                                    <i className="caret down icon"></i>
                                </button>
                            </th>
                            <th>
                                Incident Id
                                <button type="button" style={{ marginLeft: 10, width: 32 }} onClick={() => dispatch(GetCalls('IncidentId'))}>
                                    <i className="caret down icon"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {callsRendered}
                    </tbody>
                </table>

                <div style={{ marginTop: 30 }}>
                    <Paginator incidentsPerPage={postsPerPage} totalIncidents={calls.length} changePage={(num) => setCurrentPage(num)} />
                </div>
        </div>
    </div>
    </div>);
}

export default CallsComponent;