import { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { Dialog } from "..";
import { labels } from "../../constants";
import Typography from "@material-ui/core/Typography";

const ClientPreview = ({ entry }) => {
  const [showModal, setShowModal] = useState(false);
  const values = [
    {
      id: "client",
      key: "value",
      value: entry._id,
    },
    {
      id: "client",
      key: "isDisabled",
      value: true,
    },
  ];
  useEffect(() => {
    console.log(entry);
  }, [entry]);
  console.log("values", values);
  return (
    <Fragment>
      <Typography>{`${entry.surname} ${entry.name}`}</Typography>
      <Button
        className="add-new-btn pull-right"
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="add-icon" size={13} />
        <p>{labels.APPOINTMENT}</p>
      </Button>
      {showModal && (
        <Dialog
          type="appointment"
          action="add"
          values={values}
          setShowModal={setShowModal}
          successHandler={() => {}}
        />
      )}
    </Fragment>
  );
};

export default ClientPreview;
