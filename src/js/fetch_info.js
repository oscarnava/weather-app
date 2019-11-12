import * as messager from './messager';

const OW_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APPID = '109ed252bc2ef5d8afa8346ccc6d45dd';
const TEMP_UNITS = ['metric', 'imperial'];

const TEST_INFO = '{"coord":{"lon":-101.19,"lat":19.7},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":61.9,"pressure":1026,"humidity":82,"temp_min":60.8,"temp_max":63},"visibility":11265,"wind":{"speed":3.36,"deg":200},"clouds":{"all":75},"dt":1573580727,"sys":{"type":1,"id":7139,"country":"MX","sunrise":1573563089,"sunset":1573603588},"timezone":-21600,"id":3995402,"name":"Morelia","cod":200}';

async function fetchInfo(query, units = TEMP_UNITS[0]) {
  try {
    const resp = await fetch(`${OW_URL}?q=${query}&appid=${APPID}&units=${units}`);
    const forecast = await resp.json();
    messager.postForecast(query, units, forecast);
  } catch (error) {
    messager.postFetchError(error, query, units);
  }
}

async function fetchInfoTest(query, units = TEMP_UNITS[0]) {
  messager.postForecast(query, units, JSON.parse(TEST_INFO));
}

export { fetchInfo, fetchInfoTest, TEMP_UNITS };
