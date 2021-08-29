import React from "react"

import { makeStyles } from "@material-ui/styles"
import { Drawer, Typography } from "@material-ui/core"
import List from "@material-ui/core/List"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { AddCircleOutline, SubjectOutlined } from "@material-ui/icons"
import { useHistory, useLocation } from "react-router"
import { format } from "date-fns"
import Avatar from "@material-ui/core/Avatar"

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
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
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  }
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

      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMM Y")}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Typography className={classes.title} variant="h5">
            Ben's Notes
          </Typography>
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
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
