import React from 'react';

export default class InputButton extends React.Component {
    render() {
        return (
            <button 
                className={this.props.buttonStyle}
                id={this.props.id}
                onClick={this.props.handleInputClick}
            >
                {this.props.children}
            </button>
        );
    }
}