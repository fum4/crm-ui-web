import { useState, useEffect } from 'react';
import { Dialog } from '..';
import { isMobile } from 'services/utils';
import AppointmentCollapsable from "./AppointmentCollapsable";
import AppointmentExpanded from "./AppointmentExpanded";
import './styles.scss';

const AppointmentSecondary = ({ entry, parentId, isNext }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    formValues.push({
      id: 'client',
      key: 'value',
      value: parentId
    });

    formValues.push({
      id: 'client',
      key: 'isDisabled',
      value: true
    });

    const excludeFields = ['appointmentId', 'clientId', 'type', '__v'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        formValues.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setFormValues(formValues);
  }, [formValues, entry, parentId]);

  return (
    <div className={`appointments-container-secondary__item ${isNext ? 'isNext' : ''}`}>
      {
        isMobile() ? (
          <AppointmentCollapsable
            entry={entry}
            isNext={isNext}
            setShowEditDialog={setShowEditDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        ) : (
          <AppointmentExpanded
            entry={entry}
            setShowEditDialog={setShowEditDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        )
      }
      {
        showEditDialog && (
          <Dialog
            action='edit'
            setShowModal={setShowEditDialog}
            type={entry.type}
            values={formValues}
          />
        )
      }
      {
        showDeleteDialog && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteDialog}
            type={entry.type}
            values={{ _id: entry._id }}
          />
        )
      }
    </div>
  );
};

export default AppointmentSecondary;
