import React from 'react';
import { Component } from "react"

export class NewsSearchLine extends Component{
    constructor(props){
        super();
        this.buttonName = props.value;
        this.method = props.method;
    }
    
    render(){
        return (
            <input ref='q' onBlur={this.method} type="text" id="search-line">
            </input>
        )
    }

}