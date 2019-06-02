import React from 'react';
import InputField from './InputField';
import InputButton from './InputButton';

export default class RequestInput extends React.Component {
    render() {
        return (
            <div className="requestWrapper">
                <div className="requestInput">
                    <InputField 
                        handleInputChange={this.props.handleQueryChange}
                        handleEnterPress={this.props.handleRequestExecution}
                    />
                    <InputButton 
                        handleInputClick={this.props.handleRequestExecution}
                        buttonStyle="inputButton"
                    >
                        Search
                    </InputButton>
                </div>
            </div>
        );
    }
}