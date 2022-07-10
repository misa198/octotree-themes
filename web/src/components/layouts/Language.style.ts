import { Box, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';
import AvatarButton from '../common/AvatarButton';

export const LanguageWrapper = styled(Box)(() =>
  sx({
    position: 'fixed',
    right: 16,
    bottom: 16,
  })
);

export const LanguageButton = styled(AvatarButton)(({ theme }) =>
  sx({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  })
);
