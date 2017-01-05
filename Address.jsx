import React, { Component, PropTypes } from 'react';

import Input from './Input';
import Select from './Select';


export const addressMapping = (inputs, name = 'address') => {
  const map = {};
  if (inputs[`${name}_line1`] || inputs[`${name}_line2`]) {
    map.line1 = inputs[`${name}_line1`];
    map.line2 = inputs[`${name}_line2`];
    map.city = {
      name: inputs[`${name}_city`],
      state: { country: { code: 'US' } },
    };
    map.zip = inputs[`${name}_postal_code`];

    const country = inputs[`${name}_country`];
    if (country) {
      map.city.state.country.code = country;
    }

    const state = inputs[`${name}_state`];
    if (isNaN(parseInt(state, 10))) {
      map.city.state.code = state;
    } else {
      map.state.pk = parseInt(state, 10);
    }
  }

  if (`${name}_lat` in inputs && `${name}_lng` in inputs) {
    const lat = parseFloat(inputs[`${name}_lat`]);
    const lng = parseFloat(inputs[`${name}_lng`]);
    if (!isNaN(lat) && !isNaN(lng)) {
      map.coords = {
        type: 'Point',
        coordinates: [lng, lat],
      };
    }
  }

  if (Object.keys(map).length > 0) {
    return map;
  }
  return null;
};

export const reverseAddressMapping = (values, name = 'address') => {
  if (values) {
    const map = {};
    map[`${name}_line1`] = values.line1;
    map[`${name}_line2`] = values.line2;
    map[`${name}_city`] = values.city.name;
    map[`${name}_postal_code`] = values.zip;

    if (values.city.state) {
      map[`${name}_state`] = values.city.state.name;
    }

    if (values.city.state.country) {
      if (values.city.state.country.code === 'US') {
        map[`${name}_state`] = values.city.state.code;
      }
      map[`${name}_country`] = values.city.state.country.code;
    }

    if (values.location) {
      map[`${name}_lat`] = values.location.coordinates[1];
      map[`${name}_lng`] = values.location.coordinates[0];
    }

    return map;
  }
  return null;
};

export const addressEqual = (addr1, addr2) => {
  if (addr1 && addr2) {
    if (addr1.line1 !== addr2.line1) return false;
    if (addr1.line2 !== addr2.line2) return false;
    if (addr1.city !== addr2.city) return false;
    if (addr1.state.pk !== addr2.state.pk) return false;
    if (addr1.postal_code !== addr2.postal_code) return false;
    if (addr1.country.pk !== addr2.country.pk) return false;

    if (addr1.coords && addr2.coords) {
      if (addr1.coords.coordinates[0] !== addr2.coords.coordinates[0]) return false;
      if (addr1.coords.coordinates[1] !== addr2.coords.coordinates[1]) return false;
    } else if (addr1.coords || addr2.coords) {
      return false;
    }
  } else if (addr1 !== addr2) {
    return false;
  }
  return true;
};

export const addressValid = (addr) => {
  if (addr) {
    if (!addr.line1) return false;
    if (!addr.city) return false;
    if (!addr.country.pk) return false;
  }
  return false;
};

class Address extends Component {

  static propTypes = {
    address: PropTypes.object,
    includeCoordinates: PropTypes.bool,
    serverError: PropTypes.any,
    includeCountry: PropTypes.bool,
    name: PropTypes.string,
    required: PropTypes.bool,
    countries: PropTypes.array,
    countriesByKey: PropTypes.object,
    states: PropTypes.array,
    statesByKey: PropTypes.object,
    defaultCountry: PropTypes.string,
    defaultCity: PropTypes.string,
    defaultState: PropTypes.string,
    isUSKey: PropTypes.any,
  };

  static defaultProps = {
    address: {
      line1: '',
      line2: '',
      city: {
        state: {
          name: '',
          code: '',
          country: {
            name: '',
            code: '',
          },
        },
      },
      postal_code: '',
      coords: {
        coordinates: [null, null],
      },
    },
    name: 'address',
    includeCoordinates: false,
    serverError: null,
    includeCountry: true,
    states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'], // eslint-disable-line max-len
    statesByKey: { AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming' }, // eslint-disable-line max-len
    countries: ['US'],
    countriesByKey: { US: 'United States' },
    isUSKey: 'US',
  };

  constructor(props) {
    super(props);
    this.state = {
      line1Required: this.props.required,
      restRequired: this.props.required,
      isUS: this.countryIsUS(props.defaultCountry),
    };
    this._handleLatLngChange = this.handleLatLngChange.bind(this);
  }

  countryIsUS(country) {
    return country === this.props.isUSKey;
  }

  handleLatLngChange(value) {
    const req = value && true;
    this.setState({
      line1Required: req,
      restRequired: req,
    });
  }

  render() {
    const {
      name,
      address,
      required,
      countries,
      countriesByKey,
      states,
      statesByKey,
      includeCoordinates,
      defaultCountry,
      defaultCity,
      defaultState,
      includeCountry } = this.props;
    const requiredProp = {};
    if (required || this.state.restRequired) {
      requiredProp.required = 'isDefaultRequiredValue';
    }
    const line1Required = {};
    if (required || this.state.line1Required) {
      line1Required.required = 'isDefaultRequiredValue';
    }

    return (
      <fieldset className={`address ${this.state.isUS ? 'layout-us' : 'layout-intl'}`}>

        <legend>Address</legend>

        { this.props.serverError ?
          <div className='alert alert-danger'>
            <strong>Error: </strong>{ this.props.serverError }
          </div>
        : '' }

        { includeCountry ?
          <Select
            name={`${name}_country`}
            label='Country'
            value={address.city.state.country.code || defaultCountry || ''}
            wrapperClasses='address-component country'
            onChange={(value) => this.setState({ isUS: this.countryIsUS(value) })}
            options={countries ? countries.map(key => ({
              key,
              value: countriesByKey[key],
            })) : []}
            {...requiredProp}
          />
        : null }

        <Input
          name={`${name}_line1`}
          label='Line 1'
          value={address.line1}
          wrapperClasses='address-component line1'
          onChange={(value) => this.setState({ restRequired: value && true })}
          {...line1Required}
        />

        <Input
          name={`${name}_line2`}
          label='Line 2'
          value={address.line2}
          wrapperClasses='address-component line2'
        />

        <div className='city-state-zip'>
          <Input
            name={`${name}_city`}
            label='City'
            value={address.city.name || defaultCity || ''}
            wrapperClasses='address-component city'
            {...requiredProp}
          />


          { this.state.isUS ?
            <Select
              name={`${name}_state`}
              label='State'
              value={address.city.state.code || defaultState || ''}
              wrapperClasses='address-component state'
              options={states ? states.map(key => ({
                key,
                value: statesByKey[key],
              })) : []}
              {...requiredProp}
            />
          :
            <Input
              name={`${name}_state`}
              label='Region'
              value={address.city.state.name || defaultState || ''}
              wrapperClasses='address-component state'
            />
          }

          { this.state.isUS ?
            <Input
              name={`${name}_postal_code`}
              label='Zip Code'
              validations={{ matchRegexp: /^\d{5}(?:\-\d{4})?$/ }}
              validationError='Must be a valid U.S. zip code.'
              value={address.zip}
              wrapperClasses='address-component postal-code'
              {...requiredProp}
            />
          :
            <Input
              name={`${name}_postal_code`}
              label='Postal Code'
              value={address.zip}
              wrapperClasses='address-component postal-code'
              {...requiredProp}
            />
          }
        </div>

        { includeCoordinates ?
          <fieldset className='coordinates'>

            <p className='form-text help-block'>
              If you know this place's latitude and longitude coordinates, enter them here.
              Otherwise, we'll calculate them from the place's address.
            </p>

            <Input
              type='number'
              name={`${name}_lat`}
              value={address.coords.coordinates[1]}
              label='Latitude'
              onChange={this._handleLatLngChange}
              validations='isFloat'
              validationError='Must be a valid decimal number.'
              step={0.000001}
            />

            <Input
              type='number'
              name={`${name}_lng`}
              value={address.coords.coordinates[0]}
              label='Longitude'
              onChange={this._handleLatLngChange}
              validations='isFloat'
              validationError='Must be a valid decimal number.'
              step={0.000001}
            />

          </fieldset>
        : null }

      </fieldset>
    );
  }
}

export default Address;
