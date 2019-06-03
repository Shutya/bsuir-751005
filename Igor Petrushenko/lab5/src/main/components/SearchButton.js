import React from 'react';
import BaseButton from './BaseButton';

export default class SearchButton extends BaseButton{
    render(){
        return(
            <input
                type = "button" 
                name = "btn-search" 
                id = "search-btn" 
                value = "Search" 
                onClick = {this.props.onClick}
            />
        )
    }
}