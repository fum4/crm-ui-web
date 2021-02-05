import {Fragment, useState} from 'react';
import {fade, withStyles} from '@material-ui/core/styles';
import {InputBase, Button} from '@material-ui/core';
import {Dialog} from '..';
import {FaPlus} from 'react-icons/fa';
import './styles.scss';
import {labels} from '../../constants';

const BootstrapInput = withStyles((theme) => ({
  input: {
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
    },
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    borderRadius: 4,
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
    fontSize: 16,
    padding: '10px 12px',
    position: 'relative',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    width: 'auto'
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
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
          onClick={() => setShowModal(true)}
          size='large'
          variant='contained'>
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