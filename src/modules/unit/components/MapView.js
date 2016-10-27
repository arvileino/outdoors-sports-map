// @flow
import React, {Component, PropTypes} from 'react';
import {View} from './View.js';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitMarker = translate()(({position, name, address, www, description, t}) => (
  <Marker position={position}>
    <Popup>
      <PopupContent name={name} address={address} www={www} description={description} t={t}/>
    </Popup>
  </Marker>));

const PopupContent = ({name, address, www, description, t}) => (
  <div className="view-popup__content">
    <h3>{name}</h3>
    <h4>{address}</h4>
    <p><strong>{t('LIST.STATE')}:</strong> {t('LIST.UNKNOWN')}</p> {/*TODO: replace hard coding with real condition*/}
    <p>{description}</p>
    <p><a href={www} target="_blank">{t('VIEW.POPUP.OPENING_HOURS')}</a></p>
  </div>);

export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  constructor(props) {
    super(props);

  }

  render() {
    const {position, units, selected} = this.props;
    return (
      <View id="map-view" className="map-view" isSelected={selected}>
        <Map zoomControl={false} center={position} zoom={12} >
          <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            units && units.map(
              (unit, index) =>
                <UnitMarker
                  position={unit.location.coordinates.reverse()}
                  www={getAttr(unit.www_url)}
                  name={getAttr(unit.name)}
                  address={getAttr(unit.street_address)}
                  description={getAttr(unit.description)}
                  key={index} />)}
        </Map>
      </View>
    );
  }
}