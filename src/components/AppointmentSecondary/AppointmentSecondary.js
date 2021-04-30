import { useState, useEffect } from 'react';
import { Dialog } from '..';
import { isMobile } from 'services/utils';
import AppointmentCollapsable from "./Mobile/AppointmentCollapsable";
import AppointmentExpanded from "./Desktop/AppointmentExpanded";
import './styles.scss';

const AppointmentSecondary = ({ entry, parentId, isNext }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    <>
      {
        isMobile() ? (
          <AppointmentCollapsable
            entry={entry}
            isNext={isNext}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : (
          <AppointmentExpanded
            entry={entry}
            isNext={isNext}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        )
      }
      {
        showEditModal && (
          <Dialog
            action='edit'
            setShowModal={setShowEditModal}
            type={entry.type}
            values={formValues}
          />
        )
      }
      {
        showDeleteModal && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteModal}
            type={entry.type}
            values={{ _id: entry._id }}
          />
        )
      }
    </>
  );
};

export default AppointmentSecondary;
