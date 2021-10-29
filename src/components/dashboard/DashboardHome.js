import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DashboardSelector, loggedUserSelector } from '../../store/selectors/AuthSelector';
import DashBoardHomeItem from './DashboardHomeItem';
import Chart from "react-google-charts";
import { LoadDashboard } from '../../store/actions';

const DashBoardHome = () => {

    const dispatch = useDispatch();
    const dashboard = useSelector(DashboardSelector);
    const user = useSelector(loggedUserSelector);
    const { push } = useHistory()

    let incidentsNum = 5;
    let workPlansNum = 10;
    let safetyDocsNum = 11;
    
    if (user === null || user === undefined) {
        push('/')
    }

    useEffect(() => {
        if (user === null || user === undefined) {
            push('/')
        }  // eslint-disable-next-line

        dispatch(LoadDashboard())
    },[])

    if (dashboard === null) {
        return <div></div>
    }

    return (<div style={{marginLeft: 150, height: 550}}>
        
        <table style={{marginLeft: 100, marginTop: 120, position: 'fixed'}}>
            <thead></thead>
            <tbody>
                <tr>
                    <td>
                        <DashBoardHomeItem name="My Incidents" 
                                num={incidentsNum} 
                                drafts={dashboard.MyIncidentsDrafts === null ? 0 : dashboard.MyIncidentsDrafts} 
                                cancelled={dashboard.MyIncidentsCancelled} 
                                executing={dashboard.MyIncidentsExecuting} 
                                completed={dashboard.MyIncidentsCompleted}
                        />
                    </td>

                    <td><div style={{ width: 50 }}></div></td>
                    
                    <td>
                        <div style={{marginLeft: 50}}>
                            <DashBoardHomeItem name="My Work plans" 
                                num={workPlansNum}
                                drafts={dashboard.MyWorkPlansDrafts} 
                                cancelled={dashboard.MyWorkPlansCancelled} 
                                executing={dashboard.MyWorkPlansExecuting} 
                                completed={dashboard.MyWorkPlansCompleted}
                            />
                        </div>
                    </td>

                    <td><div style={{ width: 50 }}></div></td>

                    <td>
                        <div style={{marginLeft: 50}}>
                            <DashBoardHomeItem name="My Safety docs" 
                                num={safetyDocsNum}
                                drafts={dashboard.MySafetyDocumentsDrafts} 
                                cancelled={dashboard.MySafetyDocumentsCancelled} 
                                executing={dashboard.MySafetyDocumentsExecuting} 
                                completed={dashboard.MySafetyDocumentsCompleted}
                            />
                        </div>
                    </td>

                </tr>

                <tr>
                    <td colSpan="1">
                        <div style={{marginLeft: 50, marginTop: 70}}>
                            <DashBoardHomeItem name="Incidents" 
                                num={safetyDocsNum}
                                drafts={dashboard.IncidentsDrafts} 
                                cancelled={dashboard.IncidentsCancelled} 
                                executing={dashboard.IncidentsExecuting} 
                                completed={dashboard.IncidentsCompleted}
                            />
                        </div>
                    </td>

                    <td><div style={{ width: 50 }}></div></td>

                    <td>
                        <div style={{ paddingLeft: 60, marginTop: 80 }}>
                    <Chart width={'300'} height={'200'} chartType="PieChart" loader={<div>Loading Chart</div>}
                        data={[
                            ['Dokumenti', 'Broj'],
                            ['Incidenti', incidentsNum],
                            ['Planovi Rada', workPlansNum],
                            ['Bezbedni Dokumenti', safetyDocsNum],
                        ]}
                        options={{
                            title: 'Daily Activities',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                        </div>
                    </td>

                    <td><div style={{ width: 50 }}></div></td>

                    <td>
                        <div style={{marginLeft: 50, marginTop: 70}}>
                            <DashBoardHomeItem name="Documents" 
                                num={safetyDocsNum}
                                drafts={dashboard.DocumentsDrafts} 
                                cancelled={dashboard.DocumentsCancelled} 
                                executing={dashboard.DocumentsExecuting} 
                                completed={dashboard.DocumentsCompleted}
                            />
                        </div>
                    </td>
                
                </tr>
                
            </tbody>
        </table>

    </div>)
}

export default DashBoardHome;