/* eslint-disable no-new */
import { qSelect } from './globals';
import * as messager from './messager';
import WeatherWidget from './weather_widget';

const MAIN_ID = Symbol('main');

// const mainContainer = qSelect('#app-container');
const widgetContainer = qSelect('#widget-container');
const fetchBtn = qSelect('#btn-fetch');
const locationEdit = qSelect('#txt-location');
const unitsSelector = qSelect('#sel-units');
const errorMsg = qSelect('#error-msg');

const fetchForecast = () => {
  if (locationEdit.value) {
    new WeatherWidget(widgetContainer, locationEdit.value, unitsSelector.value);
    errorMsg.textContent = '';
  } else {
    errorMsg.textContent = 'Please provide a location to search';
  }
};

const main = () => {
  fetchBtn.addEventListener('click', fetchForecast);
  locationEdit.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;
    fetchForecast();
    event.preventDefault();
  });

  messager.subscribeForecast(MAIN_ID, () => {
    locationEdit.value = '';
  });

  messager.subscribeFetchError(MAIN_ID, (error) => {
    errorMsg.textContent = error;
  });

  new WeatherWidget(widgetContainer, 'Morelia, mx');
};

export default main;
