import axios from 'axios';

export function createUser(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data,
      url: `/signup`,
    }).then((response) => {
      resolve(response.data);
    });
  })
}

export function signIn(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data,
      url: `/signin`,
    }).then((response) => {
      resolve(response.data);
    });
  })
}

export function dashboard() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': sessionStorage.getItem('ds_token'),
        'X-CSRF-Token': $('meta[name="csrf-token"]').getAttribute('content')
      },
      url: `/dashboard`
    }).then((response) => {
      resolve(response.data);
    });
  })
}

export function referral(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'token': sessionStorage.getItem('ds_token')
      },
      data,
      url: `/refer`
    }).then((response) => {
      resolve(response.data);
    })
  })
}
