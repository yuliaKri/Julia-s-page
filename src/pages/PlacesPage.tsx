import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { places } from '../data/places';

// Red pin icon (smaller)
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [18, 30],
  iconAnchor: [9, 30],
  popupAnchor: [1, -24],
  shadowSize: [30, 30],
});

const PageWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const TitleBar = styled.div`
  padding: 100px 48px 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
`;

const MapWrapper = styled.div`
  flex: 1;
  min-height: 500px;
  margin: 0 48px 48px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .leaflet-container {
    height: 100%;
    min-height: 500px;
    background: #0a0a0a;
  }

  .leaflet-popup-content-wrapper {
    background: #1a1a2e;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .leaflet-popup-tip {
    background: #1a1a2e;
  }

  .leaflet-popup-content {
    margin: 12px 16px;
    font-family: 'Inter', sans-serif;
  }
`;

const PopupName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #ffffff;
`;

const PopupDescription = styled.p`
  font-size: 13px;
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const PopupImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 6px;
  margin-bottom: 8px;
  display: block;
`;

export const PlacesPage: React.FC = () => {
  return (
    <PageWrapper>
      <TitleBar>
        <Title>Places I've Visited</Title>
        <Subtitle>Pins on a map — stories behind each one.</Subtitle>
      </TitleBar>
      <MapWrapper>
        <MapContainer
          center={[40, -30]}
          zoom={3}
          minZoom={3}
          maxZoom={12}
          maxBounds={[[-85, -180], [85, 180]]}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
          worldCopyJump={false}
          style={{ height: '100%', minHeight: '500px' }}
        >
          {/* Stadia Alidade Smooth Dark — readable dark map with visible labels */}
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />
          {places.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={redIcon}>
              <Popup>
                {place.image && <PopupImage src={place.image} alt={place.name} />}
                <PopupName>{place.name}</PopupName>
                <PopupDescription>{place.description}</PopupDescription>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </PageWrapper>
  );
};
