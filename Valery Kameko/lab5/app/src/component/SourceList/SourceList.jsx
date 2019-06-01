import React from 'react';
import './SourceList.less';
import PropTypes from 'prop-types';
import Source from '../Source/Source';

export default class SourceList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choosedSources: []
        }
    }

    changeChoosed(source, isChoosed) {
        const { choosedSources } = this.state;
        const { onChangeChoosed } = this.props;

        let newChoosedSources = [...choosedSources];
        if (!isChoosed) {
            newChoosedSources = newChoosedSources.filter(value => value !== source);
        } else {
            newChoosedSources.push(source);
        }
        this.setState({
            ...this.state,
            choosedSources: newChoosedSources
        })

        if (onChangeChoosed)
            onChangeChoosed(newChoosedSources);
    }

    render() {
        const { sources } = this.props;

        return (
            <div className="sources">
                <div className="sources__container">
                    {sources.map(source => (
                        <Source name={source.name} 
                                onChangeChoosed={(isChoosed) => this.changeChoosed(source, isChoosed)} 
                                key={source.id}/>
                    ))}
                </div>
            </div>
        )
    }
}

SourceList.propTypes = {
    onChangeChoosed: PropTypes.func,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
};