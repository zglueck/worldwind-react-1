import React, {Component} from 'react';
import MapService from '@zglueck/worldwind-map-service';
import 'bootstrap';

export default class Search extends Component {

    constructor (props) {
        super(props);
        this.state = {
            buttonStateEnabled: true
        };
        this.url = "";

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.mapService = new MapService();
    }
    
    handleClick (e) {
        this.setState({
            buttonStateEnabled: false
        });

        if (this.props.onStatusUpdate) {
            this.props.onStatusUpdate("querying server...");
        }

        this.mapService.queryService(this.url)
            .then(results => {
                
                // set the status
                if (this.props.onStatusUpdate) {
                    this.props.onStatusUpdate("Service Offerings:");
                }

                if (this.props.onWmsOffering) {
                    this.props.onWmsOffering(results);
                }

                this.setState({
                    buttonStateEnabled: true
                });
            })
            .catch(e => {
                console.log(e);

                // set the status
                if (this.props.onStatusUpdate) {
                    this.props.onStatusUpdate("Service Error");
                }

                this.setState({
                    buttonStateEnabled: true
                });
            }); 
    }

    handleChange (e) {
        this.url = e.target.value;
    }

    render () {
        let searchButton;
        if (this.state.buttonStateEnabled) {
            searchButton = <button className="btn btn-outline-success" type="button" onClick={this.handleClick}>
                                <span className="fas fa-search" aria-hidden="true"></span>
                           </button>
        } else {
            searchButton = <button className="btn btn-outline-success" type="button" onClick={this.handleClick} disabled>
                                 <span className="fas fa-search" aria-hidden="true"></span>
                           </button>
        }

        return (
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="text" placeholder="enter the WMS or WMTS service address" aria-label="WMS or WMTS service address" onChange={this.handleChange}/>
                {searchButton}
            </form>
        );
    }
}
