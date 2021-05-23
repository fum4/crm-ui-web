import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Tabs, makeStyles, Fab, Zoom } from '@material-ui/core'
import { AddAlarm, PersonAdd, SupervisedUserCircle, AssignmentTurnedIn, Today as CalendarIcon } from '@material-ui/icons';
import { Dialog } from 'components';
import { Today, Clients, Calendar } from 'screens';

const useStyles = makeStyles(() => ({
  tabs: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: '#1a1a1a',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 999
  },
  tab: {
    color: '#FFFFFF'
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    width: 70,
    height: 70
  },
}));

const Home = () => {
  const classes = useStyles();
  const [screenIndex, setScreenIndex] = useState(1);
  const [showAddAppointmentDialog, setShowAddAppointmentDialog] = useState(false);
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const handleChange = (event, value) => setScreenIndex(value);

  const fabConfigs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddAlarm />,
      label: 'Add',
      onClick: () => setShowAddAppointmentDialog(true)
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddAlarm />,
      label: 'Add',
      onClick: () => setShowAddAppointmentDialog(true)
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: <PersonAdd />,
      label: 'Add',
      onClick: () => setShowAddClientDialog(true)
    },
  ];

  const transitionDuration = {
    enter: 200,
    exit: 200,
  };

  return (
    <div>
      <Tabs
        variant='fullWidth'
        value={screenIndex}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab icon={<CalendarIcon/>} className={classes.tab} />
        <Tab icon={<AssignmentTurnedIn/>} className={classes.tab} />
        <Tab icon={<SupervisedUserCircle/>} className={classes.tab} />
      </Tabs>
      <SwipeableViews
        enableMouseEvents
        index={screenIndex}
        onChangeIndex={setScreenIndex}
      >
        <Calendar/>
        <Today/>
        <Clients/>
      </SwipeableViews>
      {fabConfigs.map((fab, index) => fab && (
        <Zoom
          key={index}
          in={screenIndex === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${screenIndex === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={fab.onClick}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
      {
        showAddAppointmentDialog && (
          <Dialog action='add' type='appointment' setShowModal={setShowAddAppointmentDialog} />
        )
      }
      {
        showAddClientDialog && (
          <Dialog action='add' type='client' setShowModal={setShowAddClientDialog} />
        )
      }
    </div>
  );
}

export default Home;
