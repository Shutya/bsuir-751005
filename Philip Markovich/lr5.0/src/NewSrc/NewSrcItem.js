import React from 'react';
import "./NewSrc.css";

const NewSrcItem = props => {
   
    return(
        <li className = {`src sources=${props.src}&`} >
            <div >
                {props.name}
            </div>
        </li>
    );

}

export default NewSrcItem;