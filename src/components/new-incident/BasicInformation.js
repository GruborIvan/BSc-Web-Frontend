import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { editIncidentSelector, loggedUserSelector } from '../../store/selectors/AuthSelector';
import { AddNewIncident, SaveBasicInfo, SaveEditIncident } from '../../store/actions';

const validationSheme = yup.object().shape({
    AffectedPeople : yup.number().required('Required!').min(0,'Must be > 0'),
    Voltage: yup.number().required('Required!').min(0,'Must be > 0'),
    ATA: yup.string().required('Required!'),
    Description: yup.string().required('Required').min(3,'Too short!')
})

const BasicInformation = ({ incidentId, setHeaderPosted, setCurrentPage, setIncidentId }) => {

    var initValues;
    const user = useSelector(loggedUserSelector);
    const editIncident = useSelector(editIncidentSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editIncident !== null) {
            dispatch(SaveEditIncident(editIncident.ID));
            setIncidentId(editIncident.ID);
            setHeaderPosted(true);
        }   // eslint-disable-next-line
    },[])
  
    if (editIncident === null || editIncident === undefined) {
        initValues = { AffectedPeople: 0, IncidentType: '', ATA: '', Prioritet: 0, ETR: '', Confirmed: false, Pozivi: 0, ETA: '', Voltage: 0, Description: '', IdKorisnika: '' }
    }
    else {
        setHeaderPosted(true);
        initValues = { AffectedPeople: editIncident.AffectedPeople, IncidentType: editIncident.IncidentType, ATA: editIncident.ATA, 
        Prioritet: editIncident.Prioritet, ETR: editIncident.ETR, Confirmed: false, Pozivi: editIncident.Pozivi, ETA: editIncident.ETA, 
        Voltage: editIncident.Voltage, Description: editIncident.Description, IdKorisnika: editIncident.IdKorisnika }
    }


    const onFormSubmit = (values,{resetForm}) => {
        resetForm();
        const vals = values;
        vals.ID = editIncident === null ? incidentId : editIncident.ID;
        vals.Status = 'Active';
        vals.VremeRada = values.ATA;
        vals.Confirmed = true;
        vals.Calls = 0;
        vals.IncidentType = vals.IncidentType === '' ? 'PLANIRANI_INCIDENT' : vals.IncidentType;
        if (editIncident === null) {
            dispatch(AddNewIncident(vals,'ADD'))
        }
        else {
            vals.VremeIncidenta = vals.ATA;
            dispatch(AddNewIncident(vals,'UPDATE'))
        }
        
        dispatch(SaveBasicInfo(vals));
        setHeaderPosted(true);
        setCurrentPage(1);
    };

    return (<div className="ui green segment">
        <Formik 
            enableReinitialize
            initialValues={initValues}
            validationSchema={validationSheme}
            onSubmit={onFormSubmit}>

            {({setFieldValue}) => (
                
                <Form className="ui form">

                    <table>
                        <thead></thead>
                        <tbody>
                            
                            <tr>
                                <td> <p style={{marginRight: 35}}> Incident ID: </p> </td>
                                <td> <p style={{marginRight: 120}} onChange={(e) => setFieldValue(e.target.value)}> { editIncident === null || editIncident === undefined ? incidentId : editIncident.ID} </p>  </td>
                                <td> Affected customers: </td>
                                <td>
                                    <div style={{ float: "left" }}>
                                        <Field type="number" defaultValue={initValues.AffectedPeople} name="AffectedPeople" placeholder="0" style={{ width: 150, marginLeft: 30 }}/>
                                        <ErrorMessage name="AffectedPeople">
                                            {(msg) => <div style={{ color: "red", marginLeft: 40 }}> {msg} </div>}
                                        </ErrorMessage>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td> <p style={{marginTop: 20}}> Type: </p> </td>
                                <td>
                                    <select name="ATA" defaultValue={initValues.IncidentType} className="ui dropdown" style={{marginTop: 15, width: 165}} onChange={(e) => setFieldValue("IncidentType",e.target.value)}>
                                        <option value="PLANIRANI_INCIDENT">Planirani incident</option>
                                        <option value="NEPLANIRANI_INCIDENT">Neplanirani incident</option>
                                    </select>
                                </td>
                                <td> <p style={{marginTop: 20}}> ATA (Arrival Time): </p> </td>
                                <td>
                                    <input type="date" defaultValue={initValues.ATA.substring(0,10)} name="outagetime" style={{ width: 150, marginLeft: 30, height: 38, marginTop: 15}} onChange={(e) => setFieldValue('ATA',e.target.value)} />
                                </td>
                            </tr>

                            <tr>
                                <td><p style={{marginTop: 20}}>Priority:</p></td>
                                <td>
                                    <select defaultValue={initValues.Prioritet} className="ui dropdown" style={{marginTop: 15, width: 165}} onChange={(e) => setFieldValue('Prioritet',parseInt(e.target.value))}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </td>
                                <td><p style={{marginTop: 20}}>ETR:</p></td>
                                <td>
                                    <input id="ETR" defaultValue={initValues.ETR.substring(0,10)} type="date" name="ETR" style={{ width: 150, marginLeft: 30, height: 38, marginTop: 18 }} onChange={(e) => setFieldValue('ETR',e.target.value)} />
                                </td>
                            </tr>

                            <tr>
                                <td><p style={{marginTop: 20}}>ETA:</p></td>
                                <td>
                                    <input id="ETA" defaultValue={initValues.ETA.substring(0,10)} type="date" name="ETA" style={{ width: 150, height: 38, marginTop: 18 }} onChange={(e) => setFieldValue("ETA",e.target.value)} />
                                </td>
                                <td><p style={{marginTop: 20}}>Dodela resavanja:</p></td>
                                <td>
                                    <select className="ui dropdown" defaultValue={initValues.IdKorisnika} style={{marginTop: 15, width: 165}} onChange={(e) => setFieldValue('IdKorisnika',e.target.value)}>
                                        <option value="0"> --- </option>
                                        <option value={user.Username}>Self assign</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td><p style={{marginTop: 20}}>Voltage [kV]:</p></td>
                                <td>
                                    <Field type="number" defaultValue={initValues.Voltage} style={{width: 150, marginTop: 20}} name="Voltage" />
                                    <ErrorMessage name="Voltage">
                                        {(msg) => <div style={{ color: "red", marginLeft: 40 }}> {msg} </div>}
                                    </ErrorMessage>
                                </td>
                                <td><p style={{marginTop: 20}}>Vreme incidenta:</p></td>
                                <td>
                                    <input id="SheduledTime" defaultValue={initValues.ATA.substring(0,10)} type="date" name="SheduledTime" style={{ width: 170, height: 38, marginTop: 18, marginLeft: 30 }} 
                                        onChange={(e) => setFieldValue('VremeIncidenta',e.target.value)}/>
                                </td>
                            </tr>

                            <tr>
                                <td><p style={{marginTop: 20}}>Description</p></td>
                                <td colSpan="2">
                                    <Field type="text" defaultValue={initValues.Description} name="Description" placeholder="Description.." style={{ width: 300, marginTop: 12 }}/>
                                </td>
                                <td>
                                    <ErrorMessage name="Description">
                                        {(msg) => <div style={{ color: "red" }}> {msg} </div>}
                                    </ErrorMessage>
                                </td>
                            </tr>
   
                        </tbody>
                    </table>

                    <button className="ui small primary button" type="submit" style={{ marginLeft: 20, marginTop: 20 }}> 
                        <i className="save icon"></i>
                        SAVE INFO 
                    </button>
                </Form>
            )}
        </Formik>
    </div>);
}

export default BasicInformation;