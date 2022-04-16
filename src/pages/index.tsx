import { useEmitEvent } from '@/hooks/socket/useEmitEvent';
import useTranslation from '@/hooks/useTranslation';
import { selectIsLoading, setLoading } from '@/store/slicers';
import { Page } from '@/typings/page';
import Head from 'next/head';
import { useSelector, useStore } from 'react-redux';

export const Home: Page = () => {
  const { t, changeLanguage, locale } = useTranslation();
  const { response, sendEvent } = useEmitEvent(`status:ok`, {
    status: `test`,
  });
  const store = useStore();

  const isLoading = useSelector(selectIsLoading());

  const handleClickLanguage = () => {
    sendEvent();
    store.dispatch(setLoading(!isLoading));

    if (locale == `ptBr`) {
      changeLanguage(`enUs`);
    } else {
      changeLanguage(`ptBr`);
    }
  };

  return (
    <div>
      <Head>
        <title>miPoker | Home</title>
        <meta name="description" content="Webpage to game miPoker" />
        <link rel="icon" href="/logo/mitg-icon.svg" />
      </Head>
      <button onClick={handleClickLanguage}>{t(`home/template`)}</button>
      <div>
        <span>{response?.message}</span>
      </div>
      <div>
        <span>{isLoading ? `loading` : `not loading`}</span>
      </div>
    </div>
  );
};

export default Home;
