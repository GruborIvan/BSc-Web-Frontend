import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AddCall, AddNotification } from '../../store/actions';
import { Link } from 'react-router-dom';
import makeId from '../../constants/RandomGenerator'

const validationSheme = yup.object().shape({
    Razlog : yup.string().min(5,'Too short').max(22,'Too long').required('Required'),
    Komentar : yup.string().min(5,'Too short').max(22,'Too long').required('Required'),
    Kvar : yup.string().min(5,'Too short').max(22,'Too long').required('Required'),
})

const AnonymousCalls = () => {

    const dispatch = useDispatch();

    const onFormSubmit = (values,{resetForm}) => {
        resetForm();
        const vals = values;
        vals.IncidentId = '';
        vals.UsernameKor = '';
        dispatch(AddCall(vals))
        alert('Anonymous call registered!')

        const notification = { IdPoruke: 'POR_' + makeId(4), IdKorisnika: 'Anonymous', Sadrzaj: 'Anonymous call registered', Tip: 1, Procitana: 0, Timestamp: '2021-10-29 00:00:00.000' }
        dispatch(AddNotification(notification));
    };


    return <div style={{ backgroundColor: 'grey', height: 720 }}>  
    <div className="ui container segment" style={{ marginTop: 70, height: 500 }}>
        <Link to="/" className="ui green inverted button" style={{ marginLeft: 180 }}> Return to login screen </Link>
        <h1 style={{ marginLeft: 400 }}> Register anonymous call </h1>

        <div className="ui green segment" style={{ width: 700, marginLeft: 170, marginTop: 50 }}> 
        <Formik
            onSubmit={onFormSubmit}
            initialValues={{Razlog: '', Komentar: '', Kvar: ''}}
            validationSchema={validationSheme}>
            
            <Form className="ui form">
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td> Reason: </td>
                            <td>
                                <div style={{ float: "left" }}>
                                    <Field type="text" name="Razlog" placeholder="Reason..." style={{ width: 450, marginLeft: 30 }}/>
                                    <ErrorMessage name="Razlog">
                                        {(msg) => <div style={{ color: "red", marginLeft: 80 }}> {msg} </div>}
                                    </ErrorMessage>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td> <p style={{marginTop: 20}}>Comment:</p></td>
                            <td>
                                <div style={{ float: "left", marginTop: 20 }}>
                                    <Field type="text" name="Komentar" placeholder="Comment..." style={{ width: 450, marginLeft: 30 }}/>
                                    <ErrorMessage name="Komentar">
                                        {(msg) => <div style={{ color: "red", marginLeft: 80 }}> {msg} </div>}
                                    </ErrorMessage>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td> <p style={{marginTop: 20}}>Hazard:</p></td>
                            <td>
                                <div style={{ float: "left", marginTop: 20 }}>
                                    <Field type="text" name="Kvar" placeholder="Hazard..." style={{ width: 450, marginLeft: 30 }}/>
                                    <ErrorMessage name="Kvar">
                                        {(msg) => <div style={{ color: "red", marginLeft: 80 }}> {msg} </div>}
                                    </ErrorMessage>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                
                <div style={{marginLeft: 340, marginTop: 20}}>
                    <button className="ui primary button" type="submit"> Add Call </button>
                    <button className="ui secondary button" type="reset" style={{marginLeft: 10}}> Cancel </button>
                </div>
                
            </Form>
        </Formik>
    </div>

    </div>
    </div>
}

export default AnonymousCalls;