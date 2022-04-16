import { useEmitEvent } from '@/hooks/socket/useEmitEvent';
import useTranslation from '@/hooks/useTranslation';
import { Page } from '@/typings/page';
import Head from 'next/head';

export const Home: Page = () => {
  const { t, changeLanguage, locale } = useTranslation();
  const { response, sendEvent } = useEmitEvent(`status:ok`, {
    status: `test`,
  });

  const handleClickLanguage = () => {
    sendEvent();

    if (locale == `ptBr`) {
      changeLanguage(`enUs`);
    } else {
      changeLanguage(`ptBr`);
    }
  };

  return (
    <div>
      <Head>
        <title>Misior | Home</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/logo/mitg-icon.svg" />
      </Head>
      <button onClick={handleClickLanguage}>{t(`home/template`)}</button>
      <span>{response?.message}</span>
    </div>
  );
};

export default Home;
