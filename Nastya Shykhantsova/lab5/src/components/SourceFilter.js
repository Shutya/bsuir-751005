import React from 'react';
import SourceButton from './SourceButton';

export default class SourceFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (    
            <div className="sourceFilterWrapper">
                <nav className="sourceFilter">
                    {
                        this.props.sources.map((source) => 
                            <SourceButton 
                                key={source.id}
                                id={source.id} 
                                name={source.name}
                                toggled={this.props.toggled.has(source.id)}
                                handleInputClick={this.handleClick}
                            />
                        )
                    }
                </nav>
            </div>
        );
    }

    handleClick(e) {
        if (e.target.classList.contains("sourceButton")) {
            this.props.toggle(e.target.id);
            this.props.handleInputClick();
        }
    }
}
