import L from 'leaflet'

import mapMarkerImg from '../assets/icons/presentPlaceIcon.svg'

const MapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize: [30, 40],
    iconAnchor: [30, 40],
    popupAnchor: [0, -60]
})

export default MapIcon