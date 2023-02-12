import axios from 'axios';

export function signup() {
  return new Promise((reject, resolve) => {
    axios.post('/signup', {
      email: 'ayush@gmail.com'
    }).then((response) => {
      console.log("response-->", response.data)
    })
  })
}
