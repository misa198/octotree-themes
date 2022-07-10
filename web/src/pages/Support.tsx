import { FC } from 'react';
import Page from '../components/common/Page';
import { Container } from '@mui/material';
import HelmetMeta from '../components/common/HelmetMeta';
import { useTranslation } from 'react-i18next';
import {
  SupportBuyMeACoffee,
  SupportDescription,
  SupportTitle,
  SupportWrapper,
} from './Support.style';
import { IconDiamond } from '@tabler/icons';
import Image from 'components/common/Image';
import buyMeACoffee from 'assets/images/buymeacoffee.png';

const SupportPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <HelmetMeta title={t('support.title')} />
      <Container>
        <SupportWrapper>
          <IconDiamond size="128px" stroke="1" />
          <SupportTitle sx={{ mt: 2 }}>{t('support.headTitle')}</SupportTitle>
          <SupportDescription sx={{ mt: 4 }}>
            {t('support.description')}
          </SupportDescription>
          <SupportBuyMeACoffee>
            <a
              href="https://www.buymeacoffee.com/misa1982"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={buyMeACoffee} />
            </a>
          </SupportBuyMeACoffee>
        </SupportWrapper>
      </Container>
    </Page>
  );
};

export default SupportPage;
