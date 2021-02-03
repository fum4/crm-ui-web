import { ClientDialog, AppointmentDialog } from "../";

const Dialog = ({ type, action, values, setShowModal, successHandler }) => {
  return type === "client" ? (
    <ClientDialog
      action={action}
      values={values}
      setShowModal={setShowModal}
      successHandler={successHandler}
      type={type}
    />
  ) : type === "appointment" ? (
    <AppointmentDialog
      action={action}
      values={values}
      setShowModal={setShowModal}
      successHandler={successHandler}
      type={type}
    />
  ) : null;
};

export default Dialog;
