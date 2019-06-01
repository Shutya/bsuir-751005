import React from 'react';
import ReactDOM from 'react-dom';
import "./Header.css";
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            request: ""
        };
    }

    render(){
        let handler = this.props.findHandler;
        return(
            <header>
                <div className="header_item">
                    <h1> News by Filimon</h1>
                </div>
                <div className = "spacer">

                </div>
                <div className="header_item">
                        <input type="text" name="request" id="request" className="demoInputBox" placeholder="Your request" 
                        onChange = {e => this.setState({request: e.target.value})}/>
                        <button id="btn_search" type="button"  className="btn_search" onClick={(e) => handler(this.state.request)}> Search </button>
                </div>
            </header>        
        );
    }    
}

export default Header;