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
dotenv.config();
const Map = () => {



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
    /*-----------check is add or update-------------*/
    if (user.requestInfo.id) {
      dispatch(updateRequest({ ...newRequestInfo, id: user.requestInfo.id }));
      updateRequestFB(user.requestInfo.id, newRequestInfo);
    } else {
      const data = await addRequestFB({
        ...newRequestInfo,
        created: firebase.firestore.FieldValue.serverTimestamp()
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
  const handlePopUpClick = () => {
    setInteresed(true);
    const newRequestInfo = {
      ...selected,
      userInteresed: user.userInfo.email,
    };
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
          <p>Chọn vị trí của bạn bằng cách click vào bản đồ</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRequest}
          >
            Hoàn tất
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
              <h3>Tiêu đề : {selected.title}</h3>
              <p>Nội dung : {selected.description}</p>
              <h4>
                Trạng thái :
                {selected.userInteresed
                  ? selected.helped == false
                    ? 'Đã có người quan tâm'
                    : 'Đã được giúp đỡ'
                  : 'Đang chờ giúp đỡ'}
              </h4>
              {interesed && (
                <>
                  <h3>Điện thoại : {selected.phone}</h3>
                  <h3>Địa chỉ : {selected.address}</h3>
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handlePopUpClick}
                disabled={selected.helped || selected.userInteresed}
              >
                Quan tâm
              </Button>
            </Popup>
          )}
        </MapGL>
      </div>
    </div>
  );
};
export default Map;
