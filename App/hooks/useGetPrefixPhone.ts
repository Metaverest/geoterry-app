import { DEFAULT_PREFIX } from 'App/constants/common';
import countryTelephoneData from 'country-telephone-data';
import { lowerCase } from 'lodash';
import { useEffect, useState } from 'react';
import * as RNLocalize from 'react-native-localize';

const useGetPrefixPhone = () => {
  const [defaultPrefix, setDefaultPrefix] = useState('');
  useEffect(() => {
    const countryCode = RNLocalize.getCountry();
    const countryData = countryTelephoneData.allCountries.find(country => country.iso2 === lowerCase(countryCode));

    // Get the default phone prefix based on the user's country
    const defaultPhonePrefix = countryData?.dialCode || DEFAULT_PREFIX; // Replace XX with a default prefix

    setDefaultPrefix(`+${defaultPhonePrefix}`);
  }, []);
  return defaultPrefix;
};
export default useGetPrefixPhone;
