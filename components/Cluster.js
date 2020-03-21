import React from 'react';
import { Source, Layer } from 'react-map-gl';


class Cluster extends React.Component {
    
    render()  {

        const { data, type } = this.props;
        const dataSelection = data.filter((item) => item.type === type )

        const geojson = {
            type: 'FeatureCollection',
            features: dataSelection.map((item) => ({ 
                type: item.type,
                geometry: { type: 'Point', coordinates: [item.lng, item.lat] }
            })),
        };

        return (
            <Source
                type="geojson"
                data={geojson}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer />

            </Source>
        )
    }
}

export default Cluster;