import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core'; //The 'useMediaQuery' will help to make our map more responsive;
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';
import mapStyle from './mapStyle';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles(); //Call it as 'Hook'
    const isDesktop = useMediaQuery('(min-width: 600px)'); //This will be False if the width of device larger than 600px

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyle }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {/*Places Data*/}
                {places?.map((place, i) => (
                    <div className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>

                                    <img 
                                        className={classes.pointer} 
                                        src={place.photo ? place.photo.images.large.url : 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} 
                                        alt={place.name}
                                    />

                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}

                {/*Weather Data*/}
                {
                    weatherData?.list?.map((data, i) => (
                        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px"/>
                        </div>
                    ))
                }
            </GoogleMapReact>
        </div>
    );
}

export default Map;