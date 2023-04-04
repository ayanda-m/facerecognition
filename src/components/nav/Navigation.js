import React from "react";

function Navigation({ onRouteChange, isSignedIn }) {

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className="f5 link dim black pointer ba br-pill b--orange pa3">Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f5 link dim black pointer ba br-pill b--orange pa3">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f5 link dim black pointer ba br-pill b--orange pa3">Register</p>
            </nav>
        )
    }
}
export default Navigation;