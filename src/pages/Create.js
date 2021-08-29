import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"

import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import { makeStyles } from "@material-ui/core/styles"

import { useState } from "react"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
})

export default function Create() {
  const history = useHistory()
  /////////////////////////////
  //////////s t y l e s //////
  /////////////////////////////
  const classes = useStyles()

  /////////////////////////////
  //////////S T A T E /////////
  /////////////////////////////
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [detailsError, setDetailsError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [category, setCategory] = useState("todos")

  /////////////////////////////
  //////////h a n d l e r s ///
  /////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title === "") {
      setTitleError(true)
    }
    if (details === "") {
      setDetailsError(true)
    }

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"))
    }
  }

  return (
    <Container>
      <Typography as="h6" color="textSecondary" component="h2" gutterBottom>
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          minRows={4}
          fullWidth
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel label="Money" value="money" control={<Radio />} />
            <FormControlLabel label="Todos" value="todos" control={<Radio />} />
            <FormControlLabel
              label="Reminders"
              value="reminders"
              control={<Radio />}
            />
            <FormControlLabel label="Work" value="work" control={<Radio />} />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}
