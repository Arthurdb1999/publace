import React, { useEffect, useState } from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import { FiX, FiCircle, FiEdit, FiLogOut } from 'react-icons/fi'
import { LatLngExpression } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import '../styles/publace.css'

import publaceLogo from '../assets/publaceLogo.svg'
import Navigation from '../assets/icons/navigation.svg'
import MapIcon from '../utils/mapIcon'
import MapPlaceIcon from '../utils/mapPlaceIcon'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'react-router'

function Publace() {

    const [showSideHeader, setShowSideHeader] = useState(true)
    const [latLon, setLatLon] = useState<LatLngExpression>([0, 0])
    const { signed, signOut } = useAuth()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setLatLon([coords.latitude, coords.longitude])
        })
    }, [])

    return (
        signed ? (
            <div id="page-map">
                <div className='header'>
                    <img src={publaceLogo} alt="publace" />
                    <button onClick={signOut}>
                        <FiLogOut size={35} />
                    </button>
                </div>

                <div className='content'>
                    <MapContainer
                        center={[-27.8146158, -50.3228624]}
                        zoom={15}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                            tileSize={256}
                            attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
                            maxZoom={18}
                            id='mapbox/light-v10'
                            accessToken='pk.eyJ1IjoiYXJ0aHVyZGIxOTk5IiwiYSI6ImNrZzdkZmpiajA2ZXEyeW16OXZ6N200a2wifQ.SPOZk5iCSDYWLNqS62uB8w'
                        />
                        <div className="subtitles">
                            <div className="subtitleLeft">
                                <div className="subtitle">
                                    <img src={Navigation} alt="Localização atual" />
                                    <span>Localização atual</span>
                                </div>
                                <div className="subtitle">
                                    <FiCircle color='#15D689' size={30} />
                                    <span>Existem <strong>2 publaces</strong> em <br /> um raio de 3km</span>
                                </div>
                            </div>
                            <button
                                className="subtitleRight"
                                onClick={() => { }}
                            >
                                <FiEdit size={25} />
                                <span>Editar <br /> Raio</span>
                            </button>
                        </div>

                        <Marker
                            position={latLon}
                            icon={MapIcon}
                        ></Marker>

                        {
                            <Marker
                                position={latLon}
                                icon={MapPlaceIcon}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    Joca Neves
                                </Popup>
                            </Marker>
                        }

                    </MapContainer>
                    {showSideHeader &&
                        <div className="sideHeader">
                            <button
                                onClick={() => setShowSideHeader(false)}
                            >
                                <FiX size={35} />
                            </button>
                            <p>Praça Joca Neves</p>
                        </div>
                    }
                </div>
            </div>
        ) : <Redirect to="/" />
    )
}

export default Publace