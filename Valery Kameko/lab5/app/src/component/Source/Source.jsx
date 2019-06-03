import React from 'react';
import './Source.less';
import PropTypes from 'prop-types';

export default class Source extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChoosed: false
        }
    }

    handleClick() {
        const { isChoosed } = this.state;
        this.setState({
            ...this.state,
            isChoosed: !isChoosed
        });
        if (this.props.onChangeChoosed)
            this.props.onChangeChoosed(!isChoosed);
    }

    render() {
        const { name } = this.props;

        let className = ['source'];
        if (this.state.isChoosed)
            className.push('choosed');

        return (
            <div onClick={() => this.handleClick()} className={className.join(' ')}>
                <p className="source__name">{name}</p>
            </div>
        )
    }
}

Source.propTypes = {
    onChangeChoosed: PropTypes.func,
    name: PropTypes.string.isRequired
};