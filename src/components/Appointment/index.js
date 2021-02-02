import { AppointmentPrimary, AppointmentSecondary } from '../';

const Appointment = ({ entry, type, parentId }) => {
  return (
    type === 'primary' ? (
      <AppointmentPrimary entry={entry} />
    ) : (
      <AppointmentSecondary entry={entry} parentId={parentId} />
    )
  );
}

export default Appointment;
