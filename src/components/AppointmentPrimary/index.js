import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AppointmentPrimary = ({ entry }) => {
  const classes = useStyles();
  const { name, surname } = entry;
  const { appointment, date, control, price, treatment, technician } = entry.appointment;

  return (
    <Card className='appointment-primary' variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { appointment }
        </Typography>
        <Typography variant="h5" component="h2">
          { date }
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          { `${surname} ${name}` }
        </Typography>
        <Typography variant="body2" component="p">
          { control }
        </Typography>
        <Typography variant="body2" component="p">
          { price }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AppointmentPrimary;
