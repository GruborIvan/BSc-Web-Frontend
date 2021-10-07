import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { incidentSelector } from '../../store/selectors/AuthSelector';
import { GetIncidents } from '../../store/actions';

const validationSheme = yup.object().shape({

})

const DocumentBasicInformationComponent = () => {

    const dispatch = useDispatch();
    const incidents = useSelector(incidentSelector);

    useEffect(() => {
        dispatch(GetIncidents('all'))
    },[])

    const onFormSubmit = (values,{resetForm}) => {

    }

    const renderedIncidentIds = incidents.map(inc => {
        return <option value={inc.ID}> {inc.ID} </option>
    })

    return <div style={{ marginTop: 30 }}>
        <Formik onSubmit={onFormSubmit} 
            validationSchema={validationSheme}
            initialValues={{ Type: '', Company: '', PhoneNo: '' }}>

            {({setFieldValue}) => (
            
            <Form className="ui form">
                <table>
                    <tr>
                        <td> <h3> Type: </h3> </td>
                        <td>
                            <select name="ATA" className="ui dropdown" style={{marginTop: 15, width: 165}} onChange={(e) => setFieldValue("Type",e.target.value)}>
                                <option value="PLANIRANI_INCIDENT">Planirani incident</option>
                                <option value="NEPLANIRANI_INCIDENT">Neplanirani incident</option>
                            </select> 
                        </td>
                        <td> <h3 style={{ marginLeft: 80 }}> Company: </h3> </td>
                        <td>
                            <div style={{ marginLeft: 20 }}> 
                                <Field type="text" name="Company" placeholder="Description.." style={{ marginTop: 12 }}/>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td> <h3> Status: </h3> </td>
                        <td> <h4> Draft. </h4> </td>
                        <td> <h3 style={{ marginLeft: 80 }}> Phone No: </h3> </td>
                        <td>
                            <Field type="text" name="PhoneNo" placeholder="Description.." style={{ marginTop: 12 }}/>
                        </td>
                    </tr>

                    <tr>
                        <td> <h3> Incident: </h3> </td>
                        <td>
                            <select name="Incident" className="ui dropdown" style={{marginTop: 5, width: 165}} onChange={(e) => setFieldValue("Type",e.target.value)}>
                                {renderedIncidentIds}
                            </select>
                        </td>
                        <td> <h3 style={{ marginLeft: 80 }}> Date created: </h3> </td>
                        <td>
                        <input id="ETA" type="date" name="ETA" style={{ width: 150, height: 38, marginTop: 5 }} onChange={(e) => setFieldValue("DateCreated",e.target.value)} />
                        </td>
                    </tr>

                    <tr>
                        <td> <h3> Work request: </h3> </td>
                        <td> </td>
                        <td> <h3 style={{ marginLeft: 80 }}> Field crew: </h3> </td>
                        <td> </td>
                    </tr>

                    <tr>
                        <td> <h3> Type of work: </h3> </td>
                        <td> </td>
                        <td> <h3 style={{ marginLeft: 80 }}> Start date/time: </h3> </td>
                        <td> </td>
                    </tr>

                    <tr>
                        <td> <h3> Created by: </h3> </td>
                        <td> </td>
                        <td> <h3 style={{ marginLeft: 80 }}> End date/time: </h3> </td>
                        <td> </td>
                    </tr>

                    <tr>
                        <td> <h3> Purpose: </h3> </td>
                        <td colSpan="3"> </td>
                    </tr>

                    <tr>
                        <td> <h3> Purpose: </h3> </td>
                        <td colSpan="3"> </td>
                    </tr>

                    <tr>
                        <td> <h3> Purpose: </h3> </td>
                        <td colSpan="3"> </td>
                    </tr>

                </table>
            </Form>
            )}
        </Formik>
    </div>
}

export default DocumentBasicInformationComponent;