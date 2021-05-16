import { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Fab, makeStyles } from '@material-ui/core';
import { PeopleAlt, Today, AddAlarm, PersonAdd } from '@material-ui/icons';
import { Dialog } from 'components';
import { labels } from 'utils/constants';
import { isMobile } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fafafa',
    bottom: 0,
    position: 'fixed',
    width: '100%'
  }
}));

const routes = {
  0: '/',
  2: '/clients'
};

const icons = {
  '/': <AddAlarm/>,
  '/clients': <PersonAdd/>
};

const dialogTypes = {
  '/': 'appointment',
  '/clients': 'client'
};

const defaults = {
  dialogType: 'appointment',
  icon: <AddAlarm/>
};

export const MobileNavigation = () => {
  const shouldDisplay = useMemo(() => isMobile(), []);
  const [value, setValue] = useState(0);
  const [currentRoute, setCurrentRoute] = useState('/');
  const [showDialog, setShowDialog] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event, routeIndex) => {
    if (routeIndex === 1) {
      setShowDialog(true);
    } else {
      setValue(routeIndex);
      history.push(routes[routeIndex]);
    }
  };

  useEffect(() => {
    setCurrentRoute(history.location.pathname);
  }, [history.location.pathname]);

  return shouldDisplay ? (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label={ labels.TODAY }
          icon={<Today />}
        />
        <BottomNavigationAction
          icon={
            <Fab color='primary'>
              { icons[history.location.pathname] || defaults.icon }
            </Fab>
          }
        />
        <BottomNavigationAction
          label={ labels.CLIENTS }
          icon={<PeopleAlt />}
        />
      </BottomNavigation>
      {showDialog && (
        <Dialog
          action='add'
          setShowModal={setShowDialog}
          type={dialogTypes[currentRoute] || defaults.dialogType}
        />
      )}
    </>
  ) : (
    <div/>
  );
};
