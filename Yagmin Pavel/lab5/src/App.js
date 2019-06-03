import React, {Component} from 'react';
import './App.css';
import Business from "./Component/Business";
import Entertainment from "./Component/Entertainment";
import Health from "./Component/Health";
import Science from "./Component/Science";
import Sports from "./Component/Sports";
import * as ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }

  static showBusinessNews() {
    ReactDOM.render(<Business/>, document.getElementById('root'));
  }

  static showEntertainmentNews() {
    ReactDOM.render(<Entertainment/>, document.getElementById('root'));
  }

  static showHealthNews(){
    ReactDOM.render(<Health/>, document.getElementById('root'))
  }

  static showScienceNews(){
    ReactDOM.render(<Science/>, document.getElementById('root'))
  }

  static showSportsNews() {
    ReactDOM.render(<Sports/>, document.getElementById("root"))
  }

  render() {
    return (
        (
            <nav className="red lighten-4">
              <div className="nav-wrapper">
                <ul className="left">
                  <li><a onClick={App.showBusinessNews} href="#root">Business</a></li>
                  <li><a onClick={App.showEntertainmentNews} href="#root">Entertainment</a></li>
                  <li><a onClick={App.showHealthNews} href="#root">Health</a></li>
                  <li><a onClick={App.showScienceNews} href="#root">Science</a></li>
                  <li><a onClick={App.showSportsNews} href="#root">Sports</a></li>
                </ul>
              </div>
            </nav>
        )
    );
  }
}

export default App;