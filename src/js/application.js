import * as messager from './messager';
import { warn, qSelect, createDiv } from './globals';
import fetchInfo from './fetch_info';

const mainContainer = qSelect('#app-container');

export default function main() {
  const div = createDiv({ textContent: 'Loading...' });
  mainContainer.appendChild(div);
  messager.subscribeForecast('main', (forecast) => {
    warn(forecast);
    div.textContent = forecast.name;
  });
  fetchInfo('Morelia, mx');
}
