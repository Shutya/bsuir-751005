import React from 'react';
import BaseInput from './BaseInput';

export default class SearchInput extends BaseInput{
    render(){
        return(
            <input
                type = "text"
                name = "search"  
                id = "search-field" 
                placeholder = "Search..." 
                className = "form-control" 
                onKeyUp = {this.props.onKeyUp}
            />
        )
    }
}