import * as messager from './messager';

const OW_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APPID = '109ed252bc2ef5d8afa8346ccc6d45dd';

export default async function fetchInfo(query = 'Morelia, Mx') {
  const resp = await fetch(`${OW_URL}?q=${query}&appid=${APPID}`);
  const forecast = await resp.json();
  messager.postForecast(forecast);
}
