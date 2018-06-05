import React, {Component} from 'react';

export default class PotentialLayer extends Component {

    constructor (props) {
        super(props);

        this.onBaseClick.bind(this);
        this.onOverlayClick.bind(this);
    }


    onBaseClick (e) {
        console.log('add to base');
    }

    onOverlayClick (e) {
        console.log('add to overlay');
    }

    render () {
        return (
            <div>
                <h5>{this.props.name}</h5>
                <p>{this.props.description}</p>
                <button 
                    type="button" 
                    onClick={this.onBaseClick}>
                    Add to Base
                </button>
                <button 
                    type="button" 
                    onClick={this.onOverlayClick}>
                    Add to Overlay
                </button>
            </div>
        );
    }
}
