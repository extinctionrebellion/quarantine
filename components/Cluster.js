import React from 'react';
import { Source, Layer } from 'react-map-gl';


class Cluster extends React.Component {
    
    render()  {

        const { data, type } = this.props;
        const dataSelection = data.filter((item) => item.type === type )
        const color = type === 'quarantine' ? '#FF7F50' : '#90EE90';

        const geojson = {
            type: 'FeatureCollection',
            features: dataSelection.map((item) => ({ 
                type: item.type,
                geometry: { type: 'Point', coordinates: [item.lng, item.lat] }
            })),
        };
        
        const clusterLayer = {
            id: `cluster-layer-${type}`,
            type: 'circle',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': color,
                'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
            }
        }

        const clusterCountLayer = {
            id: `cluster-count-${type}`,
            type: 'symbol',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        };

        const unclusteredPointLayer = {
            id: `unclustered-point-${type}`,
            type: 'circle',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': color,
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        };
        
        return (
            <Source
                type="geojson"
                data={geojson}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
            </Source>
        )
    }
}

export default Cluster;