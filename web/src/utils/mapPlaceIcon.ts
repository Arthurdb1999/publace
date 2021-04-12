import L from 'leaflet'

import mapMarkerImg from '../assets/icons/placeIcon.svg'

const MapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize: [30, 40],
    iconAnchor: [30, 40],
    popupAnchor: [-15, -30]
})

export default MapIcon