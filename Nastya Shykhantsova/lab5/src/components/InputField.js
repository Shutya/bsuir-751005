import React from 'react';

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    render() {
        return (
            <input 
                type="text" 
                className="inputField"
                onChange={this.props.handleInputChange}
                onKeyUp={this.handleKeyUp}
            />
        );
    }

    handleKeyUp(e) {
        e.preventDefault();
        if (e.keyCode === 13) 
            this.props.handleEnterPress();
    }
}