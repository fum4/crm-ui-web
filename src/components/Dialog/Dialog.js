import {ClientDialog, AppointmentDialog} from '..';

const Dialog = ({type, action, values, setShowModal, successHandler}) => {
  return type === 'client' ? (
    <ClientDialog
      action={action}
      setShowModal={setShowModal}
      successHandler={successHandler}
      values={values}
    />
  ) : type === 'appointment' ? (
    <AppointmentDialog
      action={action}
      setShowModal={setShowModal}
      successHandler={successHandler}
      values={values}
    />
  ) : null;
};

export default Dialog;
