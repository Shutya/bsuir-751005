import React from 'react';
import { Component } from "react"

export default class NewsSearchButton extends Component{
    constructor(props){
        super();
        this.buttonName = props.value;
        this.Reset = this.method;
    }
    
    render(){
        return (
            <div>
                <button name="find-news" onClick={this.Reset} className="find-news" id="find-news">{this.buttonName}</button>
            </div>
        )
    }

}