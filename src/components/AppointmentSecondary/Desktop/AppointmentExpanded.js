import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { AttachMoney, Build, LocalHospital, Timelapse, WatchLater } from "@material-ui/icons";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import './styles.scss';

const AppointmentExpanded = ({ entry, setShowEditModal, setShowDeleteModal }) => {
  const isAppointment = entry.type === 'appointment';
  const hasControl = !!entry.control;

  return (
    <ListItem>
      <div className='appointment-secondary__data'>
        {
          isAppointment ? (
            <>
              <WatchLater />
              <ListItemText
                className='appointment-secondary appointment-secondary__appointment'
                primary={entry?.appointment}
              />
            </>
            ) : (
            <>
              <Timelapse />
              <ListItemText
                className='appointment-secondary appointment-secondary__control'
                primary={entry?.date}
              />
            </>
          )
        }
        {
          entry?.treatment && (
            <>
              <LocalHospital />
              <ListItemText
                className='appointment-secondary appointment-secondary__treatment'
                primary={entry?.treatment}
              />
            </>
          )
        }
        {
          entry?.technician && (
            <>
              <Build />
              <ListItemText
                className='appointment-secondary appointment-secondary__technician'
                primary={entry?.technician}
              />
            </>
          )
        }
        {
          entry?.control && (
            <>
              <AttachMoney />
              <ListItemText
                className='appointment-secondary appointment-secondary__price'
                primary={entry?.price}
              />
            </>
          )
        }
        {
          isAppointment && hasControl && (
            <>
              <Timelapse />
              <ListItemText
                className='appointment-secondary appointment-secondary__control'
                primary={entry?.control}
              />
            </>
          )
        }
      </div>
      <div className='appointment-secondary appointment-secondary__action-buttons'>
        <FaPen
          className='appointment-secondary appointment-secondary__edit-icon'
          onClick={() => setShowEditModal(true)}
        />
        <FaTrashAlt
          className='appointment-secondary appointment-secondary__remove-icon'
          onClick={() => setShowDeleteModal(true)}
        />
      </div>
    </ListItem>
  );
};

export default AppointmentExpanded;
