import React from 'react';

export default class FailMessage extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className="failMessageWrapper">
                    <h1 className="failMessage">
                        {this.props.message}
                    </h1>
                </div>
            );
        } else {
            return null;
        }
    }
}