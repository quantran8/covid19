import { Button } from '@material-ui/core';
import { getAllRequest } from 'Api/firebasedb';
import { setUser } from 'auth/slice';
import { FirestoreDB } from 'firebase/index';
import img from "public/img/img.jpg";
import React, { useEffect, useState,useRef } from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup,Source,Layer } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from 'custom/Layers';
const Map = () => {
    
    const dispatch = useDispatch();
    const size=40;
    const user = useSelector((state) => state.user);
    const mapRef = useRef(null);
    const [viewport, setViewport] = useState({
        latitude: 21.030653,
        longitude: 105.847130,
        zoom: 12
      });
    const [care,setCare] = useState(false)
    const [marker,setMarker] = useState({lngLat:[105.857792, 21.024092]});
    const [allMarker,setAllMarker] = useState([])
    const [geojson,setGeojson] = useState([])
    const [selected,setSelected] = useState(null)

    const getData = async () => {
      const data = await getAllRequest()
      setAllMarker(data); 
      setGeojson({
        type : 'FeatureCollection',
        features : data.map(item => {
          return {type: 'Feature', geometry: {type: 'Point', coordinates: [item.lng, item.lat]}}
        })
      })
    }
    const handleAddRequest = () => {
      const newHelperInfo = {
        ...user.HelperInfo,
        lat:marker.lngLat[1],
        lng:marker.lngLat[0],
        userEmail:user.email
      } 
      FirestoreDB.collection("users").add(newHelperInfo);
      dispatch(setUser({...user,HelperInfo:{}}));
      getData();
    }
    const handleMapClick = (e) => {
      if( user.HelperInfo?.phone){
        setMarker(e);
      }
      else{
        const feature = e.features[0];
        const clusterId = feature?.properties.cluster_id;
        if( feature && clusterId){
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
            transitionDuration: 500
          });
        });
        }
      }
    }
    const handleMarkerClick = (marker) => {
      setCare(false)
      setSelected(marker)
    }
   
    useEffect( async () => {
      getData();
    },[])
   
      return (
        
        <div>
          {user.HelperInfo?.phone && 
           <>
            <p>Chọn vị trí của bạn bằng cách click vào bản đồ</p>
           <Button variant="contained" color="primary" onClick={handleAddRequest}>
             Hoàn tất
           </Button>
           </>
          }
       
        <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken='pk.eyJ1IjoicXVhbnRyYW44IiwiYSI6ImNreGZtczRyczFvMHMydG1mbXdtcTN4b2sifQ.YXqnq8nI8SXYgE-Y7a0ThQ'
          mapStyle="mapbox://styles/quantran8/ckxfn98is2qdt14qma16ydu84"
          width="100%"
          height="700px"
          onClick={handleMapClick}
          onViewportChange={(viewport) => setViewport(viewport)}
          ref={mapRef}
        >
        
          <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            auto
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
            {
              
            viewport.zoom > 10 ?
            user.HelperInfo?.phone?
            <Marker 
          key={marker.lngLat[0]}
          latitude={marker.lngLat[1]}
          longitude={marker.lngLat[0]}
          onClick={()=>handleMarkerClick(marker)}
          >
          <div
          style={{ transform: `translate(${-size / 2}px,${-size}px)` ,cursor: 'pointer'}}
          >
           <img src={img} width='50px'/>
           </div>
          </Marker>
          :
            allMarker.map((item,index)=> 
            <Marker 
          key={index}
          latitude={item.lat}
          longitude={item.lng}
          onClick={()=>handleMarkerClick(item)}
          >
          <div
          style={{ transform: `translate(${-size / 2}px,${-size}px)` ,cursor: 'pointer'}}
          >
           <img src={img} width='50px'/>
           </div>
          </Marker>
            ) 
            :''
            }
            
         
           {selected&&
           <Popup
           latitude={selected.lat}
           longitude={selected.lng}
           closeButton={true}
           closeOnClick={false}
           onClose={()=>setSelected(null)}
           >
               <h1>{selected.title}</h1>
               <p>{selected.description}</p>
               {
                 care &&
                 <>
                   <h3>{selected.phone}</h3>
                   <h3>{selected.address}</h3>
                 </>
               }
               <Button variant="contained" color="primary" onClick={() => setCare(true)}>Quan tâm</Button>

           </Popup>
           }
        </ReactMapGL>
        </div>
        </div>
      )
}
export default Map;
