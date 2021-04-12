import React, { useEffect, useState } from 'react'
import { TileLayer, Marker, Popup, MapContainer,  Circle } from 'react-leaflet'
import { FiX, FiCircle, FiLogOut, FiUsers, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { LatLngExpression } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import '../styles/pages/publace.css'

import publaceLogo from '../assets/publaceLogo.svg'
import Navigation from '../assets/icons/navigation.svg'
import MapIcon from '../utils/mapIcon'
import MapPlaceIcon from '../utils/mapPlaceIcon'
import MapPresentPlaceIcon from '../utils/mapPresentPlaceIcon'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'react-router'
import api from '../services/api'
// import Alert from '../components/Alert'

interface Place {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    descricao: string;
    image_url: string;
    distance: number;
    radius: string;
    relations: {
        id: number;
        usuario_id: number;
        place_id: number;
        relation_id: number;
    }[]
}

function Publace() {

    const [showSideHeader, setShowSideHeader] = useState(false)
    const [latLon, setLatLon] = useState<LatLngExpression>([0, 0])
    const [places, setPlaces] = useState<Place[]>([])
    const [selectedPlace, setSelectedPlace] = useState<Place>()
    // const [radius, setRadius] = useState<any>()
    const [placesCount, setPlacesCount] = useState(0)

    const { signed, signOut, user } = useAuth()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            setLatLon([coords.latitude, coords.longitude])

            console.log(coords.latitude, coords.longitude)

            const response = await api.get('/places', {
                params: {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            })

            setPlaces(response.data.serializedPlaces)
            setPlacesCount(response.data.count)
            // const parsedGeoJSON = JSON.parse(response.data.radius)
            // setRadius(parsedGeoJSON)
        })

    }, [])

    // function editRadius() {
    //     return (
    //         <Alert />
    //     )
    // }

    async function signalPresence(relation: string) {
        await api.post('/relation', {
            relation_id: relation === 'at' ? 1 : (relation === 'maybe' ? 2 : 3),
            place_id: selectedPlace?.id
        })

        const updatedPlaces = places.map(place => {
            if (place.id === selectedPlace?.id) {
                place.relations.push({
                    id: place.relations[place.relations.length - 1]?.id + 1,
                    place_id: selectedPlace?.id,
                    relation_id: 1,
                    usuario_id: user?.id ? user.id : 0
                })
            }

            return place
        })

        setPlaces(updatedPlaces)
    }

    async function notAnymore(place_usuario_id: number) {

        const updatedPlaces = places.map(place => {
            place.relations.map(relation => {
                if (relation?.id !== place_usuario_id) {
                    return relation
                }
                return null
            })
            return place
        })

        setPlaces(updatedPlaces)

        await api.delete('/relation', {
            params: {
                place_usuario_id
            }
        })
    }

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
                                    <span>Existem <strong>{placesCount} publaces</strong> em <br /> um raio de 1km</span>
                                </div>
                            </div>
                            {/* <button
                                className="subtitleRight"
                            // onClick={editRadius}
                            >
                                <FiEdit size={25} />
                                <span>Editar <br /> Raio</span>
                            </button> */}
                        </div>

                        <Marker
                            position={latLon}
                            icon={MapIcon}

                        ></Marker>
                        <Circle center={latLon} radius={1000} pathOptions={{ color: '#15D689' }} />

                        {places?.map(place => (
                            place.relations.filter(relation => relation?.usuario_id === user?.id && relation?.relation_id === 1).length === 0 ? (
                                <Marker
                                    key={place.id}
                                    position={[place.latitude, place.longitude]}
                                    icon={MapPlaceIcon}
                                >
                                    <Popup closeButton={false} minWidth={150} maxWidth={150} className="map-popup">
                                        <button
                                            onClick={() => {
                                                setSelectedPlace(place)
                                                setShowSideHeader(true)
                                            }}
                                        >
                                            {place.name}
                                            <div className="littleInfos">
                                                <FiUsers size={20} />
                                                <span>{place.relations.filter(relation => relation?.relation_id === 1).length}</span>
                                                <FiCheckCircle size={20} />
                                                <span>{place.relations.filter(relation => relation?.relation_id === 3).length}</span>
                                            </div>
                                        </button>
                                    </Popup>
                                </Marker>
                            ) : (
                                <Marker
                                    key={place.id}
                                    position={[place.latitude, place.longitude]}
                                    icon={MapPresentPlaceIcon}
                                >
                                    <Popup closeButton={false} minWidth={150} maxWidth={150} className="presentMap-popup">
                                        {place.name}
                                        <div className="presentLittleInfos">
                                            <FiUsers size={20} color="#0A6B44" />
                                            <span>{place.relations.filter(relation => relation?.relation_id === 1).length}</span>
                                            <FiCheckCircle size={20} color="#0A6B44" />
                                            <span>{place.relations.filter(relation => relation?.relation_id === 3).length}</span>
                                        </div>
                                        <span id="whereAmI">Você está aqui!</span>
                                        <button
                                            id="notHereAnymoreButton"
                                            onClick={() => notAnymore(place.relations.filter(relation => relation?.relation_id === 1)[0]?.id)}
                                        >
                                            Não estou mais
                                        </button>
                                    </Popup>
                                </Marker>
                            )
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
                                    <span id="peopleCount">{selectedPlace?.relations.filter(relation => relation?.relation_id === 1).length}</span>
                                    <span id="infoDescription">pessoas estão <br /> presentes!</span>
                                </div>
                                <div className="placeInfo">
                                    <FiCheckCircle size={45} />
                                    <span id="peopleCount">{selectedPlace?.relations.filter(relation => relation?.relation_id === 3).length}</span>
                                    <span id="infoDescription">pessoas irão!</span>
                                </div>
                                <div className="placeInfo">
                                    <FiInfo size={45} />
                                    <span id="peopleCount">{selectedPlace?.relations.filter(relation => relation?.relation_id === 2).length}</span>
                                    <span id="infoDescription">pessoas não <br /> tem certeza!</span>
                                </div>
                            </div>
                            <span id="distance">Você está a <strong>{(selectedPlace.distance).toFixed(2)} km</strong> de distância do local!</span>

                            <button
                                className="actionButton"
                                onClick={() => signalPresence('at')}
                            >
                                Estou aqui!
                            </button>

                            <button
                                className="actionButton"
                                onClick={() => signalPresence('going')}
                            >
                                Comparecerei!
                            </button>

                            <button
                                className="actionButton"
                                onClick={() => signalPresence('maybe')}
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