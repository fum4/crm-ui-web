import { ClientDialog, AppointmentDialog } from '..';

const Dialog = ({ type, action, values, setShowModal, successHandler }) => {
  return (
    <AppointmentDialog
      action={action}
      setShowModal={setShowModal}
      successHandler={successHandler}
      type={type}
      values={values}
    />
  );
};

export default Dialog;
