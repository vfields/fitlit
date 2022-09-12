function fetchData(repo) {
  return fetch(`http://localhost:3001/api/v1/${repo}`)
      .then(response => response.json());
};

export default fetchData;
