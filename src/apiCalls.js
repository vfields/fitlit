function fetchData(repo) {
  return fetch(`http://localhost:3001/api/v1/${repo}`)
      .then(response => response.json());
};

function postData(repo, userData) {
  const requestData = {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    };
return fetch(`http://localhost:3001/api/v1/${repo}`, requestData)
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log(" We have a serious problem" , error))
};

export { fetchData, postData }
