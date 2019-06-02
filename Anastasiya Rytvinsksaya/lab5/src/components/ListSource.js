import React from 'react';
import './style.css';

export default function ListSource(props){
     return(
     <li data-id={props.id} key={props.id} >{props.name}</li>
     );
}