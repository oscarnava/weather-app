/* eslint-disable camelcase */
import * as messager from './messager';
import { fetchInfoTest as fetchForecast, TEMP_UNITS } from './fetch_info';
import {
  createDiv,
  createHead2,
  createImg,
  toggleClass,
} from './globals';

const WEATHER_ICON_URL = 'http://openweathermap.org/img/wn';

export default class WeatherWidget {
  constructor(container, query, units = TEMP_UNITS[0]) {
    this.id = Symbol(query);
    this.head = createHead2({ className: 'header', textConten: 'Loading...' });
    this.icon = createImg({ className: 'icon' });
    this.temp = createDiv({ className: 'temp' });
    this.tMax = createDiv({ className: 'max-temp' });
    this.tMin = createDiv({ className: 'min-temp' });
    this.desc = createDiv({ className: 'description' });

    container.append(createDiv({ className: 'weather-widget' }, [
      this.head,
      this.icon,
      this.temp,
      this.tMax,
      this.tMin,
      this.desc,
    ]));

    messager.subscribeForecast(this.id, (fcQuery, fcUnits, forecast) => {
      if (fcQuery !== query || fcUnits !== units) return;

      const {
        name,
        sys: { country },
        weather: [{ description, icon }],
        main: { temp, temp_min, temp_max },
      } = forecast;

      toggleClass(this.temp, fcUnits, TEMP_UNITS);
      toggleClass(this.tMax, fcUnits, TEMP_UNITS);
      toggleClass(this.tMin, fcUnits, TEMP_UNITS);

      this.head.textContent = `${name}, ${country}`;
      this.icon.src = `${WEATHER_ICON_URL}/${icon}@2x.png`;
      this.temp.textContent = Math.round(+temp);
      this.tMin.textContent = Math.round(+temp_min);
      this.tMax.textContent = Math.round(+temp_max);
      this.desc.textContent = description;
    });

    if (query) {
      fetchForecast(query, units);
    }
  }
}
