import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { addRequestFB, updateRequestFB } from 'Api/firebasedb';
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from 'custom/Layers';
import dotenv from 'dotenv';
import {
  addInteresedRequest,
  addRequest,
  setRequest,
  updateRequest,
} from 'features/user/userSlice';
import redPin from 'public/img/pin.png';
import bluePin from 'public/img/pin2.png';
import brownPin from 'public/img/pin3.png';
import MapGL, {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import {token} from 'Api/user';
import { getDateTime } from 'custom/format';
dotenv.config();
const Map = () => {

console.log("render")
  const dispatch = useDispatch();
  const size = 40;
  const user = useSelector((state) => state.user);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 21.030653,
    longitude: 105.84713,
    zoom: 12,
  });
  const [interesed, setInteresed] = useState(false);
  const [marker, setMarker] = useState({ lng: 105.857792, lat: 21.024092 });
  const [selected, setSelected] = useState(null);
  const allMarker = user.requestOfAllUser;
  /*------cluster data-------- */
  const geojson = {
    type: 'FeatureCollection',
    features: user.requestOfAllUser.map((item) => {
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [item.lng, item.lat] },
      };
    }),
  };

  /*----------add or updeate request of user to redux and firebase db----------*/
  const handleAddRequest = async () => {
    const newRequestInfo = {
      ...user.requestInfo,
      lat: marker.lat,
      lng: marker.lng,
      helped: false,
      userEmail: user.userInfo.email,
      userInteresed: '',
    };
    /*-----------check is add or update -------------*/
    if (user.requestInfo.id) {
      dispatch(updateRequest({ ...newRequestInfo, id: user.requestInfo.id }));
      updateRequestFB(user.requestInfo.id, newRequestInfo);
    } else {
      const data = await addRequestFB({
        ...newRequestInfo,
        created: getDateTime()
      });
      dispatch(addRequest({ 
        ...newRequestInfo, 
        id: data ,
      }));
    }

    dispatch(setRequest({}));
  };

  /*-----------event user click to map--------------*/
  const handleMapClick = (e) => {
    if (user.requestInfo.phone) {
      setMarker({
        lng: e.lngLat[0],
        lat: e.lngLat[1],
      });
    } 
    /*------------cluster click----------*/
    else {
      const feature = e.features[0];
      const clusterId = feature?.properties.cluster_id;
      if (feature && clusterId) {
        const mapboxSource = mapRef.current.getMap().getSource('earthquakes');
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }
          setViewport({
            ...viewport,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom,
            transitionDuration: 500,
          });
        });
      }
    }
  };
  const handleMarkerClick = (marker) => {
    if (!user.requestInfo.phone) {
      setInteresed(false);
      setSelected(marker);
    }
  };
  /*--------open popup info for each marker and update status request if user click interesed---------- */
  const handlePopUpClick = () => {
    setInteresed(true);
    const newRequestInfo = {
      ...selected,
      userInteresed: user.userInfo.email,
      
    };
    setSelected(newRequestInfo);
    updateRequestFB(selected.id, newRequestInfo);
    dispatch(addInteresedRequest(newRequestInfo));
    dispatch(updateRequest(newRequestInfo));
  };

  const onMarkerDragEnd = useCallback((event) => {
    setMarker({
      lng: event.lngLat[0],
      lat: event.lngLat[1],
    });
  }, []);
  /*-----set map center if update request-----------*/
  useEffect(() => {
    if (user.requestInfo.id) {
      const item = user.userAllRequest.find(
        (item) => item.id == user.requestInfo.id,
      );
      console.log(item);
      setMarker({
        lng: item.lng,
        lat: item.lat,
      });
      setViewport({
        ...viewport,
        longitude: item.lng,
        latitude: item.lat,
      });
    }
    return () => {
      dispatch(setRequest({}));
      console.log('unmount');
    };
  }, []);

  return (
    <div>
      {user.requestInfo.phone && (
        <>
          <p>Ch???n v??? tr?? c???a b???n b???ng c??ch click v??o b???n ?????</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRequest}
          >
            Ho??n t???t
          </Button>
        </>
      )}

      <div>
        <MapGL
          {...viewport}
          mapboxApiAccessToken={token}
          mapStyle="mapbox://styles/quantran8/ckxfn98is2qdt14qma16ydu84"
          width="100%"
          height="750px"
          onClick={handleMapClick}
          onViewportChange={(viewport) => setViewport(viewport)}
          ref={mapRef}
        >
          <NavigationControl />
          <GeolocateControl
            style={{ left: 0, top: 60 }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />

          <Source
            id="earthquakes"
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
          {user.requestInfo.phone ? (
            <Marker
              key={marker.lng}
              latitude={marker.lat}
              longitude={marker.lng}
              draggable
              onDragEnd={onMarkerDragEnd}
              onClick={() => handleMarkerClick(marker)}
            >
              <div
                style={{
                  transform: `translate(${-size / 2}px,${-size}px)`,
                  cursor: 'pointer',
                }}
              >
                <img src={redPin} width="50px" />
              </div>
            </Marker>
          ) : viewport.zoom > 11 ? (
            allMarker.map((item, index) => (
              <Marker
                key={index}
                latitude={item.lat}
                longitude={item.lng}
                onClick={() => handleMarkerClick(item)}
              >
                <div
                  style={{
                    transform: `translate(${-size / 2}px,${-size}px)`,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={
                      item.helped == true
                        ? bluePin
                        : item.userInteresed
                        ? brownPin
                        : redPin
                    }
                    alt="no img"
                    width="50px"
                  />
                </div>
              </Marker>
            ))
          ) : (
            ''
          )}

          {selected && (
            <Popup
              latitude={selected.lat}
              longitude={selected.lng}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelected(null)}
            >
              <h3>Ti??u ????? : {selected.title}</h3>
              <p>N???i dung : {selected.description}</p>
              <h4>
                Tr???ng th??i :
                {selected.userInteresed
                  ? selected.helped == false
                    ? '???? c?? ng?????i quan t??m'
                    : '???? ???????c gi??p ?????'
                  : '??ang ch??? gi??p ?????'}
              </h4>
              {interesed && (
                <>
                  <h3>??i???n tho???i : {selected.phone}</h3>
                  <h3>?????a ch??? : {selected.address}</h3>
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handlePopUpClick}
                disabled={selected.helped==true?true:(selected.userInteresed?true:false)}
              >
                Quan t??m
              </Button>
            </Popup>
          )}
        </MapGL>
      </div>
    </div>
  );
};
export default Map;
