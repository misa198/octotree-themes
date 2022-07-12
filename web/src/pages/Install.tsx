import { FC } from 'react';
import Page from 'components/common/Page';
import { Container } from '@mui/material';
import {
  InstallPlatforms,
  InstallDescription,
  InstallTitle,
  InstallWrapper,
} from './Install.style';
import {
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandTabler,
  IconFileZip,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import {
  CHROME_ADDON_URL,
  EDGE_ADDON_URL,
  FIREFOX_ADDON_URL,
  GITHUB_RELEASE_URL,
} from 'constants/config';
import PlatformButton from 'components/pages/install/PlatformButton';
import HelmetMeta from 'components/common/HelmetMeta';

const platforms = [
  {
    name: 'Firefox',
    icon: IconBrandFirefox,
    url: FIREFOX_ADDON_URL,
  },
  {
    name: 'Chrome',
    icon: IconBrandChrome,
    url: CHROME_ADDON_URL,
  },
  {
    name: 'Edge',
    icon: IconBrandEdge,
    url: EDGE_ADDON_URL,
  },
  {
    name: 'ZIP',
    icon: IconFileZip,
    url: GITHUB_RELEASE_URL,
  },
];

const InstallPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <HelmetMeta title={t('install.title')} />
      <Container>
        <InstallWrapper>
          <IconBrandTabler size="128px" stroke="1" />
          <InstallTitle sx={{ mt: 2 }}>{t('install.headTitle')}</InstallTitle>
          <InstallDescription sx={{ mt: 1 }}>
            {t('install.headSubtitle')}
          </InstallDescription>
          <InstallPlatforms>
            {platforms.map((item) => (
              <PlatformButton key={item.name} {...item} />
            ))}
          </InstallPlatforms>
        </InstallWrapper>
      </Container>
    </Page>
  );
};

export default InstallPage;
