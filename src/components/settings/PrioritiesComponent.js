import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';

const validationSheme = yup.object().shape({
    Ulica: yup.string().required('You must enter the street name'),
    RedPrioriteta: yup.number().required('You have to enter the priority level').min(1,'Priority cannot be lower than 1').max(5,'Priority cannot be higher than 5')
})

const PrioritiesComponent = () => {

    const onPrioritetAssign = () => {
        alert('Priority assigned!')
    }
    
    return (<div>
        <div className="ui green" style={{ width: 400, marginLeft: 100, marginTop: 10 }}>
            <h4> Add priority for street </h4>
            <hr/>
            <Formik 
            onSubmit={onPrioritetAssign}
            initialValues={{ Ulica: '', RedPrioriteta: 1 }}
            validationSchema={validationSheme}>

            <Form>
                <div style={{marginTop: 20, marginLeft: 30}}>
                    <label htmlFor="Ulica"> Street name: </label>
                    <div className="ui small input focus">
                        <Field type="password" name="Ulica" placeholder="Street name..." style={{ width: 250, marginLeft: 20 }}/>
                    </div>
                    <ErrorMessage name="Ulica">
                        {(msg) => <div style={{ color: "red", marginLeft: 80 }}> {msg} </div>}
                    </ErrorMessage>
                </div>
                <br/>

                <div style={{marginLeft: 30}}>
                    <label htmlFor="RedPrioriteta"> Priority: </label>
                    <div className="ui small input focus">
                        <Field type="number" name="RedPrioriteta" placeholder="Priority..." style={{ width: 250, marginLeft: 47 }}/>
                    </div>
                    <ErrorMessage name="RedPrioriteta">
                        {(msg) => <div style={{ color: "red", marginLeft: 80 }}> {msg} </div>}
                    </ErrorMessage>
                </div>
                <br/>

                <button type="submit" className="ui small primary button" style={{marginLeft: 80, marginTop: 20}}> Apply changes </button>

            </Form>
        </Formik>
        </div>
    </div>);
}

export default PrioritiesComponent;