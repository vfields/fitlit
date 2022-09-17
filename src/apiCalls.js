function fetchData(repo) {
  return fetch(`http://localhost:3001/api/v1/${repo}`)
      .then(response => {
          if (response.ok) {
          return response.json();
         }
      throw new Error('Not a 200 status');
     })
       .catch(error => {
       alert('Oops, something went wrong. Try refreshing your page.');
       })
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
