import React from 'react'
import Plot from 'react-plotly.js'
import {connect} from 'react-redux'
import {
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form
} from 'reactstrap'

export function AlbumMood(props) {
  function update(ev) {
    let query = ev.target.value
    let action = {
      type: "UPDATE_ALBUM_SEARCH",
      data: {
        query: query
      }
    }
    props.dispatch(action)
  }

  function searchAlbum() {
    console.log("searchAlbum()")
    props.channel.push("album_search", {
      album: props.album_search.query,
      token: props.token
    }).receive("ok", (data) => {
      console.log("update_album_search", data)
      props.dispatch({
        type: "UPDATE_ALBUM_SEARCH",
        data: {
          results: data.results
        }
      })
    })
  }

  function getAlbum(album) {
    console.log("getAlbum", album)
    props.channel.push("album_mood", {
      albumID: album,
      token: props.token
    }).receive("ok", (data) => {
      console.log("update_album_mood", data)
      props.dispatch({type: "UPDATE_ALBUM_MOOD", data: data})
    })
  }

  function plotAlbum(album) {
    console.log('plotAlbum')
    getAlbum(album)
    window.scrollTo(0, 0)
  }

  let results = props.album_search.results.map(result => <Card key={result.id}>
    <CardBody>
      <h3>{result.name}</h3>
      <h4>{result.artists}</h4>
      <Button onClick={() => plotAlbum(result.id)}>Plot</Button>
    </CardBody>
  </Card>)

  return (<div>
    <Plot data={[
        {
          x: props.album_mood.album_tracks.map(x => x.name),
          y: props.album_mood.album_tracks.map(x => x.valence),
          type: 'scatter',
          mode: 'lines',
          name: 'valence',
          marker: {
            color: 'blue'
          }
        }, {
          x: props.album_mood.album_tracks.map(x => x.name),
          y: props.album_mood.album_tracks.map(x => x.tempo),
          type: 'scatter',
          mode: 'lines',
          name: 'tempo (normalized)',
          marker: {
            color: 'green'
          }
        }
      ]} layout={{
        title: props.album_mood.album_name
      }}/>
    <div>
      <Form>
        <Label for='album'>Album Name</Label>
        <Input name='album' type='text' value={props.album_search.query} onChange={update}/>
        <Button className={"btn btn-primary"} onClick={searchAlbum}>Search</Button>
      </Form>
      <ul>{results}</ul>
    </div>
  </div>)
}

function propsFromState(state) {
  return {album_mood: state.album_mood, album_search: state.album_search}
}

export default connect(propsFromState)(AlbumMood)
