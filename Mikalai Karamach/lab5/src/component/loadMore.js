import React, {PureComponent} from 'react'

export default class LoadMore extends PureComponent {
    render() {
        //style="background-image: url("{}")"
        //console.log('rendering load More', 1)
        return (
            < div
        className = "moreNews" >
            < button
        id = "moreNewsBtn"
        className = "moreNewsBtn" > Load
        more < /button>
        < /div>
    )
    }
}