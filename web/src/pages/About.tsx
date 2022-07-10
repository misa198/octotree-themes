import { FC } from 'react';
import Page from 'components/common/Page';
import { Button, IconButton, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelmetMeta from 'components/common/HelmetMeta';
import {
  AboutContactCredits,
  AboutContactItem,
  AboutContactItems,
  AboutDescription,
  AboutSubTitle,
  AboutTitle,
  AboutWrapper,
} from './About.style';
import {
  IconCompass,
  IconBrandGithub,
  IconWorld,
  IconBrandTwitter,
} from '@tabler/icons';
import {
  CREDITS,
  GITHUB_REPO_URL,
  LICENSE,
  MY_GITHUB_URL,
  MY_TWITTER_URL,
  MY_WEBSITE_URL,
} from '../constants/config';

const contacts = [
  {
    icon: IconWorld,
    url: MY_WEBSITE_URL,
  },
  {
    icon: IconBrandGithub,
    url: MY_GITHUB_URL,
  },
  {
    icon: IconBrandTwitter,
    url: MY_TWITTER_URL,
  },
];

const AboutPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <HelmetMeta title={t('about.title')} />
      <Container>
        <AboutWrapper>
          <IconCompass size="128px" stroke="1" />
          <AboutTitle sx={{ mt: 2 }}>{t('about.headTitle')}</AboutTitle>
          <AboutDescription sx={{ mt: 2 }}>
            {t('about.subtitle')}
          </AboutDescription>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<IconBrandGithub />}
              sx={{ mt: 4 }}
            >
              {t('about.github')}
            </Button>
          </a>

          <AboutSubTitle sx={{ mt: 4 }}>{t('about.credits')}</AboutSubTitle>
          <AboutContactCredits>
            <ul>
              {CREDITS.map((item) => (
                <li key={item.repoUrl}>
                  <a href={item.authorUrl} target="_blank" rel="noreferrer">
                    <Typography>@{item.author}</Typography>
                  </a>
                  &nbsp;
                  <Typography>{t('about.for')}</Typography>
                  &nbsp;
                  <a href={item.repoUrl} target="_blank" rel="noreferrer">
                    <Typography>{item.repo}</Typography>
                  </a>
                </li>
              ))}
            </ul>
          </AboutContactCredits>
          <AboutSubTitle sx={{ mt: 4, mb: 2 }}>
            {t('about.license')}
          </AboutSubTitle>
          <a href={LICENSE.url} target="_blank" rel="noreferrer">
            <Typography>{LICENSE.name}</Typography>
          </a>

          <AboutSubTitle sx={{ mt: 4 }}>{t('about.contact')}</AboutSubTitle>
          <AboutContactItems sx={{ mt: 2 }}>
            {contacts.map((c) => (
              <AboutContactItem key={c.url}>
                <a href={c.url} target="_blank" rel="noreferrer">
                  <IconButton>
                    <c.icon />
                  </IconButton>
                </a>
              </AboutContactItem>
            ))}
          </AboutContactItems>
        </AboutWrapper>
      </Container>
    </Page>
  );
};

export default AboutPage;
