const subscribers = {};

const FORECAST_AVAILABLE = Symbol('Forecast loaded');
const FETCH_ERROR = Symbol('Error message');

function subscribe(topic, id, callback) {
  if (!subscribers[topic]) {
    subscribers[topic] = {};
  }
  subscribers[topic][id] = callback;
}

function unsubscribe(topic, id) {
  if (subscribers[topic]) {
    delete subscribers[topic][id];
  }
}

function publish(topic, message) {
  if (subscribers[topic]) {
    const followers = subscribers[topic];
    const ids = Object.getOwnPropertySymbols(followers).concat(Object.keys(followers));
    // debugger;
    ids.forEach((id) => {
      // For messaging debugging purposes
      // eslint-disable-next-line no-console
      console.log('Messager-Publish:', {
        topic: topic.description,
        id,
        message: JSON.stringify(message),
      });
      followers[id](message, id);
    });
  }
}

function postForecast(query, units, forecast) {
  publish(FORECAST_AVAILABLE, { query, units, forecast });
}

function subscribeForecast(id, callback) {
  subscribe(
    FORECAST_AVAILABLE,
    id,
    ({ query, units, forecast }, msgId) => callback(query, units, forecast, msgId),
  );
}

function postFetchError(error, query, units) {
  publish(FETCH_ERROR, { error, query, units });
}

function subscribeFetchError(id, callback) {
  subscribe(
    FETCH_ERROR,
    id,
    ({ error, query, units }, msgId) => callback(error, query, units, msgId),
  );
}

export {
  unsubscribe,

  postForecast,
  subscribeForecast,

  postFetchError,
  subscribeFetchError,

};
