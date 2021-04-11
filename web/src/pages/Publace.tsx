import React, { useEffect, useState } from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import { FiX, FiCircle, FiEdit, FiLogOut, FiUsers, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { LatLngExpression } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import '../styles/publace.css'

import publaceLogo from '../assets/publaceLogo.svg'
import Navigation from '../assets/icons/navigation.svg'
import MapIcon from '../utils/mapIcon'
import MapPlaceIcon from '../utils/mapPlaceIcon'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'react-router'
import api from '../services/api'

interface Place {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    descricao: string;
    image_url: string;
}

function Publace() {

    const [showSideHeader, setShowSideHeader] = useState(false)
    const [latLon, setLatLon] = useState<LatLngExpression>([0, 0])
    const [places, setPlaces] = useState<Place[]>([])
    const [selectedPlace, setSelectedPlace] = useState<Place>()

    const { signed, signOut } = useAuth()

    useEffect(() => {

    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            setLatLon([coords.latitude, coords.longitude])

            const response = await api.get('/places', {
                params: {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            })

            setPlaces(response.data)
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

                        {places?.map(place => (
                            <Marker
                                key={place.id}
                                position={[place.latitude, place.longitude]}
                                icon={MapPlaceIcon}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {place.name}
                                    <button
                                        onClick={() => {
                                            setSelectedPlace(place)
                                            setShowSideHeader(true)
                                        }}
                                    >
                                        Ver
                                    </button>
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>

                    {showSideHeader &&
                        <div className="sideHeader">
                            <button
                                id="close-button"
                                onClick={() => {
                                    setShowSideHeader(false)
                                    setSelectedPlace(undefined)
                                }}
                            >
                                <FiX size={35} />
                            </button>
                            <p>{selectedPlace?.name}</p>
                            <img src={selectedPlace?.image_url} alt={selectedPlace?.name} />
                            <div className="placeInfoWrapper">
                                <div className="placeInfo">
                                    <FiUsers size={45} />
                                    <span id="peopleCount">10</span>
                                    <span id="infoDescription">pessoas estão <br /> presentes!</span>
                                </div>
                                <div className="placeInfo">
                                    <FiCheckCircle size={45} />
                                    <span id="peopleCount">10</span>
                                    <span id="infoDescription">pessoas irão!</span>
                                </div>
                                <div className="placeInfo">
                                    <FiInfo size={45} />
                                    <span id="peopleCount">10</span>
                                    <span id="infoDescription">pessoas não <br /> tem certeza!</span>
                                </div>
                            </div>
                            <span id="distance">Você está a <strong>2.5km</strong> de distância do local!</span>

                            <button
                                className="actionButton"
                                onClick={() => { }}
                            >
                                Estou aqui!
                            </button>

                            <button
                                className="actionButton"
                                onClick={() => { }}
                            >
                                Comparecerei!
                            </button>

                            <button
                                className="actionButton"
                                onClick={() => { }}
                            >
                                Talvez eu vá!
                            </button>
                        </div>
                    }
                </div>
            </div>
        ) : <Redirect to="/" />
    )
}

export default Publace