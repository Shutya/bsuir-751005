import React from 'react';
import { Component } from "react"

export  class MoreNewsButton extends Component{
    constructor(props){
        super();
        this.buttonName = props.value;
        this.onClick = props.onClick;
        this.state={
            isVisible: true
        }
    }
    
    render(){
        const button = this.state.isVisible && <button onClick={this.onClick} name="find-news" className="btn btn-success" id="find-news">{this.buttonName}</button>;
        return (
            <div>
                {button}
            </div>
        )
    }

    Refresh = (gotNewsCount, newsPerRequest, newsCount, maxNewsCount) => {
        console.log(gotNewsCount);
        console.log(newsPerRequest);
        console.log(newsCount);
        console.log(maxNewsCount);
        if(gotNewsCount < newsPerRequest || newsCount >= maxNewsCount){
            console.log('Invisability');
            this.MakeInvisible();
        }
        else    
            this.MakeVisible();


    }
    
    MakeInvisible = () => {
        this.setState({
            isVisible: false
        },
        () => console.log("Invisability!"))
    }

    MakeVisible = () => {
        this.setState({
            isVisible: true
        })
    }

}


