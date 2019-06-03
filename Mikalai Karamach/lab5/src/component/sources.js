import React, {PureComponent} from 'react'

// while(!this.response)
// await sleep(1);
export default class Sources extends PureComponent {
    async

    constructor(url) {
        super();
        this.loadSources(url);
    }

    render() {
        var allSources = null;
        if (this.response.sources) {
            allSources = this.response.sources.map((source, index) = >
                < button
            id = {source.id
        }
            className = "sourceBtn"
            key = {index} > {source.name
        }<
            /button>
        )
        }
        return (
            < div
        id = "sources"
        className = "sources" >
            {allSources}
            < /div>
    )
    }

    loadSources(url) {
        let req = new Request(url);
        const response = await
        fetch(req);
        this.response = await
        response.json();
    }

}