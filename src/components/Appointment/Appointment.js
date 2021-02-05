import {AppointmentPrimary, AppointmentSecondary} from '..';

const Appointment = ({ entry, type, parentId, onUpdate }) => {
  return type === 'primary' ? (
    <AppointmentPrimary entry={entry} />
  ) : (
    <AppointmentSecondary entry={entry} onUpdate={onUpdate} parentId={parentId} />
  );
};

export default Appointment;
