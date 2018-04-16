import store from './cs/store'

class Server {
  authorize(data) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', '/api/v1/authorize')
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xmlhttp.onload = () => {
      var resp = JSON.parse(xmlhttp.responseText)
      console.log('api.authorize()')
      console.log(resp)
      store.dispatch({
        type: 'UPDATE_USER_TOKEN',
        data: resp
      })
    }
    xmlhttp.send()
  }
}

export default new Server()
