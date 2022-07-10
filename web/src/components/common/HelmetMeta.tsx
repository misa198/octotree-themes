import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface Props {
  title?: string;
  description?: string;
}

const HelmetMeta: FC<Props> = ({ title, description }) => {
  const { i18n, t } = useTranslation();

  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
    >
      <title>{title ? `${title} | ${t('index.name')}` : t('index.name')}</title>
      <meta
        name="description"
        content={description || t('index.description')}
      />
    </Helmet>
  );
};

export default HelmetMeta;
