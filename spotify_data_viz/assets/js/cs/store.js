import {createStore, combineReducers} from 'redux'
import deepFreeze from 'deep-freeze'

/*
STATE LAYOUT
{
  album_mood: {
    album_name: String,
    album_tracks: List<(Title, {Audio Features})>
  }
  track_analysis: {
    recent_tracks: List<(Title, {Audio Features})>
  }
*/

let empty_album_mood = {
  album_name: "",
  album_tracks: []
}

function album_mood(state = empty_album_mood, action) {
  switch (action.type) {
    case 'UPDATE_ALL':
    case 'UPDATE_ALBUM_MOOD':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

let empty_track_analysis = {
  recent_tracks: []
}

function track_analysis(state = empty_track_analysis, action) {
  switch (action.type) {
    case 'UPDATE_ALL':
    case 'UPDATE_TRACK_ANALYSIS':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}


function root_reducer(state, action) {
  let reducer = combineReducers({
    album_mood,
    track_analysis,
  })
  state = reducer(state, action)
  return deepFreeze(state)
}

let store = createStore(root_reducer)
export default store
