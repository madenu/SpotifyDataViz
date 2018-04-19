import {
  createStore,
  combineReducers
} from 'redux'
import deepFreeze from 'deep-freeze'

/*
STATE LAYOUT
{
  album_mood: {
    album_name: String,
    album_tracks: List<{name: String, valence: Number, tempo: Number})>
  }
  album_search: {
    query: String,
    results, List<{name: String, id: String}>
  }
  track_analysis: {
    recent_tracks: List<{name: String,
      features: {valence: Number,
                 instrumentalness: Number,
                 speechiness: Number,
                 dance: Number,
                 energy: Number}}>
  }
  album_list: List<{album_id: String, album_name: String, artist_name: String, times_searched: Integer }
  user_list: List<{user_id: String, access_token: String, refresh_token: String, timestamp: UTC DateTime
}
*/

let empty_album_mood = {
  album_name: "",
  album_tracks: [],
}

function album_mood(state = empty_album_mood, action) {
  switch (action.type) {
    case 'UPDATE_ALBUM_MOOD':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

let empty_album_search = {
  query: "",
  results: []
}

function album_search(state = empty_album_search, action) {
  switch (action.type) {
    case 'UPDATE_ALBUM_SEARCH':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

function album_list(state = [], action) {
  switch (action.type) {
    case 'ALBUMS_LIST':
      return [...action.albums];
    default:
      return state;
  }
}

let empty_track_analysis = {
  recent_tracks: []
}

function track_analysis(state = empty_track_analysis, action) {
  switch (action.type) {
    case 'UPDATE_TRACK_ANALYSIS':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

let empty_radar = {
    danceability: 0,
    energy: 0,
    valence: 0,
    instrumentalness: 0,
    speechiness: 0
}

function radar_chart(state = empty_radar, action) {
    switch(action.type) {
        case 'UPDATE_RADAR':
            return Object.assign({}, state, action.data)
        default:
            return state
    }
}

function user_list(state = [], action) {
    switch (action.type) {
        case 'USERS_LIST':
            return [...action.users];
        default:
            return state;
    }
}

function root_reducer(state, action) {
  let reducer = combineReducers({
    album_mood,
    album_search,
    album_list,
    track_analysis,
    radar_chart,
    user_list
  })
  state = reducer(state, action)
  return deepFreeze(state)
}

let store = createStore(root_reducer)
export default store
