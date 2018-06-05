import React, {Component} from 'react';
import Search from './Search';
import PotentialLayer from './PotentialLayer';

export default class WebMapList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            status: ""
        };

        this.updateStatus = this.updateStatus.bind(this);
        this.setListing = this.setListing.bind(this);
    }

    updateStatus (updatedStatus) {
        this.setState({
            status: updatedStatus
        });
    }

    setListing (layers) {
        this.setState({
            potentialLayers: layers
        });
    }

    render () {
        let potentialLayers;
        if (this.state.potentialLayers) {
            potentialLayers = this.state.potentialLayers.map(layer => {
                return <PotentialLayer key={layer.displayName} name={layer.displayName} description={layer.abstract} layer={layer} enabled={layer.enabled} />
            });
        }

        return (
            <div>
                <h5>Web Map Services</h5>
                <p>Specify a service address for a WMS or WMTS data source</p>
                <Search onStatusUpdate={this.updateStatus} onWmsOffering={this.setListing}/>
                <p><i>{this.state.status}</i></p>
                {potentialLayers}
            </div>
        );
    }
}
