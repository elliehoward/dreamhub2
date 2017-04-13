/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
  function getDreams(success) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  function createDream(data) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function updateDream(data) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function deleteDream(data) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function upvoteDream(data) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams/upvote', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function downvoteDream(data) {
    return fetch('http://dreamhubapi.herokuapp.com/api/dreams/downvote', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    getDreams,
    createDream,
    updateDream,
    upvoteDream,
    downvoteDream,
    deleteDream,
  };
}());
