import React from 'react';
import PropTypes from 'prop-types';

import './Search.less';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }
    }

    handleQueryChange(query) {
        this.setState({
            ...this.state,
            query
        })
    }

    handleSearchClicked() {
        const { onSearchClicked } = this.props;
        if (onSearchClicked)
            onSearchClicked(this.state.query);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }

    render() {
        const { query } = this.state;

        return (
            <div className="search">
                <input 
                        type="search" 
                        className="search__search-input" 
                        value={query}
                        onChange={event => this.handleQueryChange(event.target.value)} />
                <button className="search__search-button" onClick={() => this.handleSearchClicked()}>Search</button>
            </div>
        );
    }
}

Search.propTypes = {
    onSearchClicked: PropTypes.func
}