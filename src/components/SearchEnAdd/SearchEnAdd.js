import {Fragment, useState} from 'react';
import {fade, withStyles} from '@material-ui/core/styles';
import {InputBase, Button} from '@material-ui/core';
import {Dialog} from '..';
import {FaPlus} from 'react-icons/fa';
import './styles.scss';
import {labels} from '../../constants';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const SearchEnAdd = ({handleSearch, actionSuccessHandler, type}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div className='search-input-container'>
        <BootstrapInput
          className='search-input-container__main-input'
          onChange={(ev) => handleSearch(ev.target.value)}
        />
        <Button
          className='add-new-btn'
          color='primary'
          size='large'
          variant='contained'
          onClick={() => setShowModal(true)}>
          <FaPlus className='add-icon' size={13} />
          <p>{type === 'client' ? labels.ADD_CLIENT : labels.ADD_APPOINTMENT}</p>
        </Button>
      </div>
      {showModal && (
        <Dialog action='add' setShowModal={setShowModal} successHandler={actionSuccessHandler} type={type} />
      )}
    </Fragment>
  );
};

export default SearchEnAdd;
