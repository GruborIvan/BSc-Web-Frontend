import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { AddExternalLogin } from '../../store/actions';
 
const clientId = "553661382916-gcsp5mk585ef446nh9tner5i1eo6t0q3.apps.googleusercontent.com";
 
function App() {
 
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  
  const handleLoginSuccess = (response) => {
    console.log(response);
    //let userInfo = {email : response.profileObj.email, date: '', ime: response.profileObj.givenName, prz: response.profileObj.familyName, role: 'CLANEKIPE'};
    //dispatch(AddExternalLogin(userInfo))
    
    //const resp = axios.post("http://localhost:8000/api/Account/AddExternalLogin", response);
    //console.log("Login Success ", resp);
    //setUser(resp.profileObj);
    //setLoading();
  }
 
  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
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