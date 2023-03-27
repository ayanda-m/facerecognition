import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png"
import "./Logo.css"

function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt>
                <div className="ba b--pink br-100 tilt pa3" style={{ height: '150px', width: '150px', marginLeft: '100px' }}>
                    <img style={{ paddingTop: '5px' }} src={brain} alt='' />
                </div>
            </Tilt>
        </div>
    )

}
export default Logo;