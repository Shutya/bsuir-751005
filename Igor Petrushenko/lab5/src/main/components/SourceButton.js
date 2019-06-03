import React from 'react';
import BaseButton from './BaseButton'
import './css/SourceButton.css';

export default class SourceButton extends BaseButton {
    render() {
        let item = {};
        item = this.props.sourcesItem;
        return(
            <button
                className="btn btn__sources"
                id = {this.props.id}
                onClick={() => this.props.onClickFunc(this.props.id)}
                >
                {item.name}
            </button>
        )
    }

}
