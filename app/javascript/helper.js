export function checkToken() {
  if (sessionStorage.getItem("ds_token") && sessionStorage.getItem("user")) {
    return true
  } else {
    return location.href = 'login'
  }
}

export function checkLogin() {
  if (!sessionStorage.getItem("ds_token") || !sessionStorage.getItem("user")) {
    sessionStorage.removeItem('ds_token')
    sessionStorage.removeItem('user')
    return true
  } else {
    return history.back();
  }
}