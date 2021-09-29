import React from 'react';

const WorkRequestMenu = ({setCurrentForm,currentForm}) => {
    
    return (<div className="ui vertical pointing menu" style={{ width: 150, marginTop: 50 }}>

        <button className={`ui green button item ${currentForm === 0 ? 'active' : ''}`} style={{width: '100%'}}  onClick={() => setCurrentForm(0)}>
          Basic Information
        </button>

        <button className={`ui green button item ${currentForm === 1 ? 'active' : ''}`} style={{width: '100%'}} onClick={() => setCurrentForm(1)}>
          History of state changes
        </button>

        <button className={`ui green button item ${currentForm === 2 ? 'active' : ''}`} style={{width: '100%'}} onClick={() => setCurrentForm(2)}>
          Multimedia attachments
        </button>

        <button className={`ui green button item ${currentForm === 3 ? 'active' : ''}`} style={{width: '100%'}}  onClick={() => setCurrentForm(3)}>
          Equipment
        </button>

        <button className={`ui green button item ${currentForm === 4 ? 'active' : ''}`} style={{width: '100%'}}  onClick={() => setCurrentForm(4)}>
          Switching instructions
        </button>

      </div>
    );
}

export default WorkRequestMenu;