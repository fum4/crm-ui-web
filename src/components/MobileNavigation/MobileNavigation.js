import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { labels } from '../../constants';
import { isMobile } from 'services/utils';
import { PeopleAlt, Today } from '@material-ui/icons';
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fafafa',
    bottom: 0,
    height: 65,
    position: 'fixed',
    width: '100%'
  }
}));

const routes = {
  0: '/',
  1: '/clients'
};

const MobileNavigation = () => {
  const shouldDisplay = useMemo(() => isMobile(), []);
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event, routeIndex) => {
    setValue(routeIndex);

    history.push(routes[routeIndex]);
  };

  return shouldDisplay ? (
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
          label={ labels.CLIENTS }
          icon={<PeopleAlt />}
      />
    </BottomNavigation>
  ) : (
    <div/>
  );
};

export default MobileNavigation;
