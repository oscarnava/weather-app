const subscribers = {};

const FORECAST_AVAILABLE = Symbol('Forecast loaded');
const FETCH_ERROR = Symbol('Error message');

const subscribe = (topic, id, callback) => {
  if (!subscribers[topic]) {
    subscribers[topic] = {};
  }
  subscribers[topic][id] = callback;
};

const unsubscribe = (topic, id) => {
  if (subscribers[topic]) {
    delete subscribers[topic][id];
  }
};

const publish = (topic, message) => {
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
};

const postForecast = (query, units, forecast) => {
  publish(FORECAST_AVAILABLE, { query, units, forecast });
};

const subscribeForecast = (id, callback) => {
  subscribe(
    FORECAST_AVAILABLE,
    id,
    ({ query, units, forecast }, msgId) => callback(query, units, forecast, msgId),
  );
};

const postFetchError = (error, query, units) => {
  publish(FETCH_ERROR, { error, query, units });
};

const subscribeFetchError = (id, callback) => {
  subscribe(
    FETCH_ERROR,
    id,
    ({ error, query, units }, msgId) => callback(error, query, units, msgId),
  );
};

export {
  unsubscribe,

  postForecast,
  subscribeForecast,

  postFetchError,
  subscribeFetchError,

};
