import L from 'leaflet'

import mapMarkerImg from '../assets/icons/navigation.svg'

const MapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize: [30, 40],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default MapIcon