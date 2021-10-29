import React from 'react'

const DashBoardHomeItem = ({ name, num, drafts, cancelled, executing, completed }) => {
    return (<div className="ui raised container segment" style={{height: 200, width: 260, overflow: 'hidden'}}>
        
        <h3 style={{float: 'left', marginRight: 70}}> {name} </h3>
        {name === "My Incidents" ? <i className="bolt icon"></i> : <i className="file image icon"></i>}
        <p style={{float: 'left'}}> {num} </p>

        <hr/>
        
        <div>
            <p style={{marginRight: 120}}> {drafts} Drafts </p>
            <p> {cancelled} Cancelled </p>
            <p> {executing} Executing </p>
            <p> {completed} Completed </p>
        </div>
       
    </div>);
}

export default DashBoardHomeItem;