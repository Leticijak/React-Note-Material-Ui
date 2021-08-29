import React from "react"

import { makeStyles } from "@material-ui/styles"
import { Drawer, Typography } from "@material-ui/core"
import List from "@material-ui/core/List"

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { AddCircleOutline, SubjectOutlined } from "@material-ui/icons"
import { useHistory, useLocation } from "react-router"

const drawerWidth = 240

const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
  active: {
    backgroundColor: "#f9f9f9",
  },
})

export default function Layout({ children }) {
  /////// useLocation ///////
  const location = useLocation()

  /////////history //////
  const history = useHistory()

  //////////s t y l e s //////

  const classes = useStyles()

  /////////Dummy data //////

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutline color="secondary" />,
      path: "/create",
    },
  ]
  return (
    <div className={classes.root}>
      {/* app bar */}
      <Drawer
        variant="permanent"
        className={classes.drawer}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Typography variant="h5">Ben's Notes</Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* side draw */}
      <div className={classes.page}>{children}</div>
    </div>
  )
}
