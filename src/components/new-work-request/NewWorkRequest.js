import React, { useState } from 'react';
import DocumentBasicInformationComponent from './DocumentBasicInformationComponent';
import DocumentEquipmentComponent from './DocumentEquipmentComponent';
import DocumentHistoryComponent from './DocumentHistoryComponent';
import MultimediaAttachments from './MultimediaAttachments';
import SwitchingInstructions from './SwitchingInstructions';
import WorkRequestMenu from './WorkRequestMenu';

const NewWorkRequest = () => {

    const [currentPage,setCurrentPage] = useState(0);

    const renderedPage = () => {
        switch(currentPage) {
            case 0 : return (<div>
                <h1> Basic information </h1>
                <DocumentBasicInformationComponent/>
            </div>)
            case 1 : return (<div>
                <h1> History of state changes </h1>
                <DocumentHistoryComponent/>
            </div>)
            case 2 : return (<div>
                <h1> Multimedia attachments </h1>
                <MultimediaAttachments/>
            </div>)
            case 3 : return (<div>
                <h1> Equipment </h1>
                <DocumentEquipmentComponent/>
            </div>)
            case 4 : return (<div>
                <h1> Switching instructions </h1>
                <SwitchingInstructions/>
            </div>)
            default: return <div></div>
        }
    }

    return (<div style={{ backgroundColor: 'grey', height: 720 }}> 
    <div style={{marginLeft: 150, height: 550}}>
        <div className="ui container segment" style={{paddingLeft: 20,marginTop: 95, position: 'fixed', width: 1200, right: 1, left: 120, height: 580, overflow: 'hidden'}}>
            <div style={{ float: 'left', marginTop: 35 }}>
                <WorkRequestMenu setCurrentForm={setCurrentPage} currentForm={currentPage} />
            </div>
            <div style={{float: 'left', marginLeft: 300, marginTop: 20}}>
                {renderedPage()}
            </div>
        </div>
    </div>
    </div>)
}

export default NewWorkRequest;