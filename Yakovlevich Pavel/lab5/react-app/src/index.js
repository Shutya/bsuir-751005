import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { LoadSources } from './MainProcedures.js'

let selectedSource = "";


async function LoadPage(){
    console.log('Load Page');
    let sources = await LoadSources();
    render(<App sources={sources}/>, document.getElementById('root'));
}


LoadPage();