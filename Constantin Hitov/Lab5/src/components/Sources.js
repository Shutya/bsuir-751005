import React from 'react';
import {Component} from 'react';

export default class SourcesSelect extends Component{
    constructor(params){
        super();
        this.sources = params.sources;
        this.method = params.method;
    }
    render(){
        let key = 0;
        const innerSources = this.sources;
        const articlesList = innerSources.map((x) => <option key = {key++} value = {x.id}>{x.name}</option>);

        return (
            <select className='selectpicker' onChange={this.method} ref='source' id="sources">
                {articlesList}
            </select>
        )
    }
}
