import BaseButton from './BaseButton';
import React from 'react';

export default class LoadMoreButton extends BaseButton{
    render(){
        return(
            <button
                id = "btn-load-more"
                onClick = {this.props.onClick}
                hidden = {this.props.hidden}>
                Load More    
            </button>
        )
    }
}