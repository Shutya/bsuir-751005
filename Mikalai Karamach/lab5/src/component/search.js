import React, {PureComponent} from 'react'

export default class Search extends PureComponent {
    render() {
        return (
            < div
        id = "search"
        className = "search" >
            < input
        className = "searchInput"
        name = "searchInput"
        type = "text"
        id = "searchInput" / >
            < button
        id = "searchBtn"
        className = "searchBtn" > search < /button>
            < /div>
    )
    }
}