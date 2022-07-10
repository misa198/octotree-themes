import { FC, useState, MouseEvent } from 'react';
import { LanguageWrapper, LanguageButton } from './Language.style';
import { IconLanguage } from '@tabler/icons';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const languages = [
  {
    key: 'en',
    label: 'English',
  },
  {
    key: 'vi',
    label: 'Tiếng Việt',
  },
];

const Language: FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (l: string) => {
    i18n.changeLanguage(l);
    handleClose();
  };

  return (
    <LanguageWrapper>
      <LanguageButton
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconLanguage />
      </LanguageButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: 'translateY(-70px) !important',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            top: 100,
            '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -10,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {languages.map((l) => (
          <MenuItem key={l.key} onClick={() => changeLanguage(l.key)}>
            <Typography>{l.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </LanguageWrapper>
  );
};

export default Language;
