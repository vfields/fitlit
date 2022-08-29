// Your fetch requests will live here!
function fetchData(url) {
  return fetch(url)
      .then(promise => promise.json());
};

export default fetchData;

