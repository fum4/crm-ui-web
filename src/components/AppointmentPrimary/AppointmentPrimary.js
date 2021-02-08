import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12
  },
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
});

const AppointmentPrimary = ({entry}) => {
  const classes = useStyles();
  const {name, surname} = entry;
  const {appointment, date, control, price, treatment, technician} = entry.appointment;

  return (
    <Card className='appointment-primary' variant='outlined'>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {appointment}
        </Typography>
        <Typography component='h2' variant='h5'>
          {date}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`${surname} ${name}`}
        </Typography>
        <Typography component='p' variant='body2'>
          {control}
        </Typography>
        <Typography component='p' variant='body2'>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AppointmentPrimary;
