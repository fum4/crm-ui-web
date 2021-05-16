import { useState, useMemo } from 'react';
import { OutlinedInput, Button, InputAdornment } from '@material-ui/core';
import { AddAlarm, PersonAdd, Search } from '@material-ui/icons';
import { Dialog } from 'components';
import { labels } from 'utils/constants';
import { isMobile } from 'utils/helpers';
import './styles.scss';

export const Header = ({ onSearch, type }) => {
  const [showDialog, setShowDialog] = useState(false);
  const isDesktop = useMemo(() => !isMobile(), []);
  const handleSearch = (event) => onSearch(event.target.value);

  if (isDesktop) {
    window.addEventListener('scroll', () => {
      const wrapper = document.getElementsByClassName('wrapper')[0];
      const searchInput = wrapper.getElementsByClassName('search-input-container')[0];

      if (window.pageYOffset > 175) {
        wrapper.classList.add('fixed');
        searchInput.classList.add('fullWidth');
      }

      if (window.pageYOffset < 150) {
        wrapper.classList.remove('fixed');
        searchInput.classList.remove('fullWidth');
      }
    });
  }

  return (
    <>
      <div className={`wrapper ${!isDesktop ? 'fixed' : ''}`}>
        <div className={`search-input-container ${!isDesktop ? 'fullWidth' : ''}`}>
          <OutlinedInput
            type='search'
            variant='outlined'
            className='search-input-container__main-input'
            placeholder={type === 'client' ? labels.SEARCH_CLIENT : labels.SEARCH_APPOINTMENT}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position='start'>
                <Search/>
              </InputAdornment>
            }
          />
          {
            isDesktop && (
              <Button
                className='add-new-btn'
                color='primary'
                onClick={() => setShowDialog(true)}
                size='large'
                startIcon={type === 'client' ? <PersonAdd /> : <AddAlarm />}
                variant='contained'>
                {
                  <p>{type === 'client' ? labels.ADD_CLIENT : labels.ADD_APPOINTMENT}</p>
                }
              </Button>
            )
          }
        </div>
      </div>
      {showDialog && (
        <Dialog action='add' setShowModal={setShowDialog} type={type} />
      )}
    </>
  );
};
