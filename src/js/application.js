import { qSelect } from './globals';
import * as messager from './messager';
import WeatherWidget from './weather_widget';

// const mainContainer = qSelect('#app-container');
const widgetContainer = qSelect('#widget-container');
const fetchBtn = qSelect('#btn-fetch');
const locationEdit = qSelect('#txt-location');
const unitsSelector = qSelect('#sel-units');

function fetchForecast() {
  if (locationEdit.value) {
    const widget1 = new WeatherWidget(widgetContainer, locationEdit.value, unitsSelector.value);
  }
}

export default function main() {
  fetchBtn.addEventListener('click', fetchForecast);
  locationEdit.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;
    fetchForecast();
    event.preventDefault();
  });

  messager.subscribeForecast('main', () => { locationEdit.value = ''; });

  // const div = createDiv({ textContent: 'Loading...' });
  // mainContainer.appendChild(div);

  const widget1 = new WeatherWidget(widgetContainer, 'Morelia, mx');

}
