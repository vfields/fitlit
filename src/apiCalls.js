// Your fetch requests will live here!
function fetchData(repo) {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${repo}`)
      .then(response => response.json());
};

export default fetchData;
