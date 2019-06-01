import React, {Component} from 'react';

export class NoMatchLine extends Component{
    constructor(){
        super();
        this.state = {
            isVisible: false
        };
    }

    render(){
        const p = this.state.isVisible && <p>There are no articles matching your request</p>
        return (
            <div className='no-match'>
                {/* <img src='../images/badRequest.jpg'></img> */}
                {p}
            </div>
        )
    }

    MakeVisible = () => {
        this.setState({
            isVisible: true
        }
        );
    }

    MakeInvisible = () => {
        this.setState({
            isVisible: false
        }
        );
    }
}