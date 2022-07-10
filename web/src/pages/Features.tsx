import { FC, useEffect } from 'react';
import Page from 'components/common/Page';
import { Container } from '@mui/material';
import { IconDashboard } from '@tabler/icons';
import {
  FeatureBoxContent,
  FeaturesTitle,
  FeaturesWrapper,
} from './Features.style';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { fetchMarkdownThunk } from 'app/store/features/features/featuresThunk';
import Fallback from 'components/common/Fallback';
import Markdown from '../components/common/Markdown';
import HelmetMeta from '../components/common/HelmetMeta';

const FeaturesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const featureContent = useAppSelector((state) => state.features.content);

  useEffect(() => {
    const url = `/contents/features/${i18n.resolvedLanguage}.md`;
    dispatch(fetchMarkdownThunk(url));
  }, [dispatch, i18n.resolvedLanguage]);

  return (
    <Page>
      <HelmetMeta title={t('features.title')} />
      <Container>
        <FeaturesWrapper>
          <IconDashboard size="128px" stroke="1" />
          <FeaturesTitle sx={{ mt: 2 }}>
            {t('features.headTitle')}
          </FeaturesTitle>
          <FeatureBoxContent>
            {featureContent.loading ? (
              <Fallback />
            ) : (
              <Markdown content={featureContent.data} />
            )}
          </FeatureBoxContent>
        </FeaturesWrapper>
      </Container>
    </Page>
  );
};

export default FeaturesPage;
