import React, {Component} from 'react';
import './App.css';
import TechnoNews from "./Component/TechnoNews";
import Sport from "./Component/Sport";
import Apple from "./Component/Apple";
import Health from "./Component/Health";
import Science from "./Component/Science";
import Entertainment from "./Component/Entertainment";
import * as ReactDOM from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    static showTechnoNews() {
        ReactDOM.render(<TechnoNews/>, document.getElementById('root'));
    }

    static showSportNews() {
        ReactDOM.render(<Sport/>, document.getElementById('root'));
    }

    static showAppleNews(){
        ReactDOM.render(<Apple/>, document.getElementById('root'))
    }

    static showHealthNews(){
        ReactDOM.render(<Health/>, document.getElementById('root'))
    }

    static showScienceNews() {
        ReactDOM.render(<Science/>, document.getElementById("root"))
    }

    static showEntertainmentNews(){
        ReactDOM.render(<Entertainment/>, document.getElementById("root"))
    }

    render() {
        return (
            (
                <nav className="red lighten-4">
                    <div className="nav-wrapper">
                        <ul className="left">
                            <li><a onClick={App.showAppleNews} href="#root">Apple</a></li>
                            <li><a onClick={App.showSportNews} href="#root">Sport</a></li>
                            <li><a onClick={App.showTechnoNews} href="#root">Technology</a></li>
                            <li><a onClick={App.showHealthNews} href="#root">Health</a></li>
                            <li><a onClick={App.showScienceNews} href="#root">Science</a></li>
                            <li><a onClick={App.showEntertainmentNews} href="#root">Entertainment</a></li>
                            <li className="input-field">
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        );
    }
}

export default App;