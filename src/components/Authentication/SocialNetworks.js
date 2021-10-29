import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { AddExternalLogin, LoginUser } from '../../store/actions';
 
const clientId = "553661382916-gcsp5mk585ef446nh9tner5i1eo6t0q3.apps.googleusercontent.com";
 
function App() {
 
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { push } = useHistory();
  
  const handleLoginSuccess = (response) => {
    //console.log('TU SAM');
    //const data = { username: 'admin@app.com', password: 'Ivangrubor.98', 'grant_type' : 'password' }
    //const payload = {data: data, loginCallback: () => push('/dashboard/home')}
    //dispatch(LoginUser(payload))
  }
 
  const handleLoginFailure = error => {
    //console.log('TU SAM');
    //const data = { username: 'ivan.grubor@gmail.com', password: 'Ivangrubor.98', 'grant_type' : 'password' }
    //const payload = {data: data, loginCallback: () => push('/dashboard/home')}
    //dispatch(LoginUser(payload))
  }
 
  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  }
 
  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }
 
  const handleRequest = () => {
    setLoading("Loading...");
  }
 
  const handleAutoLoadFinished = () => {
    setLoading();
  }
 
  return (
    <div>
      {user ? <div>
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={() => handleLogoutSuccess()}
          onFailure={() => handleLogoutFailure()}
        />
        
      </div>
       :
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        /> }
        <div>
            
        </div>
    </div>
  );
}
 
export default App;