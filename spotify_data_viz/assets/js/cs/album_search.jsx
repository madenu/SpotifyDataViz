import React from 'react'
import {Button, Label, Input, Form} from 'reactstrap'
import {connect} from 'react-redux'

function AlbumSearch(props) {

  function update(ev) {
    let query = ev.target.value
    let action = {
      type: "UPDATE_ALBUM_SEARCH",
      data: {query: query}
    }
    props.dispatch(action)
  }

  function searchAlbum() {
    console.log("searchAlbum", props.album)
    props.channel.push("album_search", {
      album: props.album_search.query,
      token: props.token
    }).receive("ok", (data) => {
      console.log("update_album_search", data)
      props.dispatch({type: "UPDATE_ALBUM_SEARCH", data: {results: data.results}})
    })
  }

  // TODO make the ul a list of clickable items
  return (<div>
    <Form>
      <Label for='album'>Album Name</Label>
      <Input name='album' type='text' value={props.album_search.query} onChange={update}/>
      <Button className={"btn btn-primary"} onClick={searchAlbum}>Search</Button>
    </Form>
    <ul>{props.album_search.results.map(x => x.name)}</ul>
  </div>)
}

function propsFromState(state) {
  return {album_search: state.album_search}
}

export default connect(propsFromState)(AlbumSearch)
