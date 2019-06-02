import React from 'react';
import InputButton from './InputButton';

export default class MoreButton extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className="moreButtonWrapper">
                    <InputButton
                        handleInputClick={this.props.moreButtonClick}
                        buttonStyle="moreButton"
                        >
                        Show more 
                    </InputButton>
                </div>
            );
        } else {
            return null;
        }
    }
}