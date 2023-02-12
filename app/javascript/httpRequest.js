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
