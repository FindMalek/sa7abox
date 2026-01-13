import { useTranslations } from 'next-intl';

export default  function Page() {
  const t = useTranslations('metadata');
  return <div>{t('title')}</div>;
}