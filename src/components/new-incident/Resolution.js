import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewResolution, GetResolution } from '../../store/actions';
import { editIncidentSelector, editResolutionSelector } from '../../store/selectors/AuthSelector';

const validationSheme = yup.object().shape({
    Cause: yup.string().required('Required'),
    SubCause: yup.string().required('Required'),
    Construction: yup.string().required('Required'),
    Material: yup.string().required('Required'),
})

const Resolution = ({ setCurrentPage, headerPosted, incidentId }) => {

    let initialValues = { };
    const dispatch = useDispatch();
    const editResolution = useSelector(editResolutionSelector);
    const editIncident = useSelector(editIncidentSelector);

    useEffect(() => {
        if (editIncident !== null && editIncident !== undefined) {
            dispatch(GetResolution(editIncident.ID))
        }
        else {
            //dispatch(GetResolution(incidentId))  
        }   // eslint-disable-next-line
    },[])

    if (editResolution === null) {
        initialValues = { Cause: '', SubCause: '', Construction: '', Material: '' }
    }
    else {
        initialValues = { Cause: editResolution.Cause, SubCause: editResolution.SubCause, Construction: editResolution.Construction, Material: editResolution.Material }
    }

    const onFormSubmit = (values,{resetForm}) => {
        resetForm();
        if (editIncident === null) {
            if (!headerPosted) {
                alert('Header is not posted, failed!');
            }
        }
        let vals = values;
        vals.IncidentId = editIncident.ID;
        dispatch(AddNewResolution(vals));
        setCurrentPage(3);
    }
    
    return <div className="ui very padded green segment" style={{marginLeft: 50, width: 500, paddingLeft: 70}}>

        <Formik onSubmit={onFormSubmit}
            initialValues={{ Cause: '', SubCause: '', Construction: '', Material: '' }}
            validationSchema={validationSheme}>

        {({setFieldValue}) => (
            <Form>

                <label htmlFor="cause"> Cause: </label>
                <select className="ui dropdown" name="Cause" defaultValue={initialValues.Cause} style={{width: 160, marginLeft: 114}} onChange={(e) => setFieldValue('Cause',e.target.value)}>
                    <option value=""> -- </option>
                    <option value="Weather"> Weather </option>
                    <option value="Human factor"> Human factor </option>
                    <option value="Failure"> Failure </option>
                </select>
                <ErrorMessage name="Cause">
                    {(msg) => <div style={{ color: "red", marginLeft: 100 }}> {msg} </div>}
                </ErrorMessage>

                <br/>

                <label htmlFor="subcause"> Subcause: </label>
                <select className="ui dropdown" name="subcause" defaultValue={initialValues.SubCause} style={{width: 160, marginTop: 30, marginLeft: 94}} onChange={(e) => setFieldValue('SubCause',e.target.value)}>
                    <option value=""> -- </option>
                    <option value="Thunder"> Thunder </option>
                    <option value="Hurricane"> Hurricane </option>
                    <option value="Lightning"> Lightning </option>
                    <option value="Snow"> Snow </option>
                </select>
                <ErrorMessage name="SubCause">
                    {(msg) => <div style={{ color: "red", marginLeft: 100 }}> {msg} </div>}
                </ErrorMessage>

                <br/>

                <label htmlFor="consType"> Construction Type: </label>
                <select className="ui dropdown" name="consType" defaultValue={initialValues.Construction} style={{width: 160, marginTop: 30, marginLeft: 40}} onChange={(e) => setFieldValue('Construction',e.target.value)}>
                    <option value=""> -- </option>
                    <option value="1">Underground</option>
                    <option value="0">Above ground</option>
                </select>
                <ErrorMessage name="Construction">
                    {(msg) => <div style={{ color: "red", marginLeft: 100 }}> {msg} </div>}
                </ErrorMessage>

                <br/>

                <label htmlFor="material"> Material: </label>
                <select className="ui dropdown" name="material" defaultValue={initialValues.Material} style={{width: 160, marginTop: 30, marginLeft: 100}} onChange={(e) => setFieldValue('Material',e.target.value)}>
                    <option value=""> -- </option>
                    <option value="Metal">Metal</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Wood">Wood</option>
                </select>
                <ErrorMessage name="Material">
                    {(msg) => <div style={{ color: "red", marginLeft: 100 }}> {msg} </div>}
                </ErrorMessage>

                <br/>

                <button className="ui primary button" type="submit" style={{ marginTop: 30, marginLeft: 80 }}> 
                    <i className="save icon"></i>
                    Save resolution
                </button>

            </Form>
        )}
        </Formik>
    </div>
}

export default Resolution;