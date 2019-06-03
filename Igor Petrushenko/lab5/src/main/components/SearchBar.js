import React from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export default class SearchBar extends React.Component{
    render(){
        return(
            <div>
                <p></p>
                <i className="fa fa-search"></i>
                <SearchInput onKeyUp = {this.props.onKeyUp}/>
                <SearchButton onClick = {this.props.onClick}/>
                <p></p>
            </div>
        )
    }
}