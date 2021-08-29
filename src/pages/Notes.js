import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import NoteCard from "../comps/NoteCard"
import Masonry from "react-masonry-css"

export default function Notes() {
  /////////////////////////////
  //////////S T A T E /////////
  /////////////////////////////
  const [notes, setNotes] = useState([])
  /////////////////////////////
  //////////useEffect /////////
  /////////////////////////////

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
  }, [fetch])

  /////////////////////////////
  //////////handler /////////
  /////////////////////////////

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    })

    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }
  return (
    <Container maxWidth="sm">
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.details}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
