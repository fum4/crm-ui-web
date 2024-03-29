import { useState, useEffect } from 'react';
import { AppointmentCollapsable, AppointmentExpanded, Dialog } from 'components';
import { isMobile } from 'utils/helpers';
import './styles.scss';

export const AppointmentSecondary = ({ entry, isNext }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState([]);

  useEffect(() => {
    const config = [
      {
        id: 'client',
        key: 'value',
        value: entry.clientId
      },
      {
        id: 'client',
        key: 'isDisabled',
        value: true
      }
    ];

    const excludeFields = ['appointmentId', 'clientId', 'type'];

    Object.keys(entry).forEach((key) => {
      if (!excludeFields.includes(key)) {
        config.push({
          id: key,
          key: 'value',
          value: entry[key]
        });
      }
    });

    setDialogConfig(config);
  }, [entry]);

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
            config={dialogConfig}
          />
        )
      }
      {
        showDeleteDialog && (
          <Dialog
            action='delete'
            setShowModal={setShowDeleteDialog}
            type={entry.type}
            config={{ _id: entry._id }}
          />
        )
      }
    </div>
  );
};
