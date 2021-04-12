import L from 'leaflet'

import mapMarkerImg from '../assets/icons/navigation.svg'

const MapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize: [30, 40],
    iconAnchor: [15, 20],
})

export default MapIcon