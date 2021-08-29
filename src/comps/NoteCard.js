import React from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"

import CardContent from "@material-ui/core/CardContent"
import { Avatar, IconButton, makeStyles, Typography } from "@material-ui/core"
import { DeleteOutline } from "@material-ui/icons"
import { blue, green, orange, purple, yellow } from "@material-ui/core/colors"

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return orange[400]
      }
      if (note.category === "reminders") {
        return green[500]
      }
      if (note.category === "todos") {
        return purple[400]
      }
      if (note.category === "money") {
        return blue[900]
      }
      return blue[500]
    },
  },
})

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note)
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteCard
