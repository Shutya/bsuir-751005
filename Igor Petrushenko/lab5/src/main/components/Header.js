import React from 'react';
import SearchBar from './SearchBar';
import './css/Header.css';

export default class Header extends React.Component{
    render(){
        return(
            <React.Fragment>
                <header className="top-menu">
                    <div>
                        <p>petrushenko</p>
                    </div>
                    <SearchBar onKeyUp = {this.props.onKeyUp} 
                        onClick = {this.props.onClick}/>
                </header> 
                <div className="bottom-line">
                    <p></p>
                </div>
                <div>
                    <h1 className="title">NEWS PAGE</h1>
                </div>
            </React.Fragment>
        )
    }
}