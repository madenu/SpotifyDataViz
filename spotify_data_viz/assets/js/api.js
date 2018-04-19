import store from './cs/store';

class TheServer {
  request_albums() {
    if (window.user_id) {
      $.ajax("/api/v1/albums", {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: (resp) => {
          store.dispatch({
            type: 'ALBUMS_LIST',
            albums: resp.data,
          });
        },
      });
    }
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }
}

export default new TheServer();
