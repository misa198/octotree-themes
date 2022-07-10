import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container } from '@mui/material';
import {
  IntroductionContainer,
  IntroductionDescription,
  IntroductionInstallBtn,
  IntroductionLogo,
  IntroductionSectionWrapper,
  IntroductionTitle,
} from './IntroductionSection.style';
import logo from 'assets/images/logo.png';
import { IconBrandGithub, IconBrandTabler } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { GITHUB_REPO_URL } from 'constants/config';

const IntroductionSection: FC = () => {
  const { t } = useTranslation();
  return (
    <IntroductionSectionWrapper>
      <Container>
        <IntroductionContainer>
          <IntroductionLogo src={logo} />
          <IntroductionTitle>{t('index.name')}</IntroductionTitle>
          <IntroductionDescription variant="body1">
            {t('index.description')}
          </IntroductionDescription>
          <Link to="/install">
            <IntroductionInstallBtn
              color="primary"
              variant="contained"
              startIcon={<IconBrandTabler size="1.8rem" />}
            >
              {t('home.install')}
            </IntroductionInstallBtn>
          </Link>
          <Box sx={{ mt: 4 }}>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IconBrandGithub />}
              >
                {t('about.github')}
              </Button>
            </a>
          </Box>
        </IntroductionContainer>
      </Container>
    </IntroductionSectionWrapper>
  );
};

export default IntroductionSection;
