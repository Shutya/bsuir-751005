import React from 'react';
import InputButton from './InputButton';

export default class SourceButton extends React.Component {
    render() {
        return (
            <InputButton
                buttonStyle={`sourceButton${this.props.toggled ? " activeFilter" : ""}`}
                id={this.props.id}
                handleInputClick={this.props.handleInputClick}
            >
                {this.props.name}
            </InputButton>
        );
    }
}