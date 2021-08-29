import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import NoteCard from "../comps/NoteCard"

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
  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid md={3} sm={6} xs={12} item key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
