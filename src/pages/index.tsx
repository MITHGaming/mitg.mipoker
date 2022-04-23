import { useEmitEvent } from '@/hooks/socket/useEmitEvent';
import { useSocket } from '@/hooks/socket/useSocket';
import useTranslation from '@/hooks/useTranslation';
import api from '@/lib/axios/api';
import { selectIsLoading, setLoading } from '@/store/slicers';
import { Page } from '@/typings/page';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';

export const Home: Page = () => {
  const { t, changeLanguage, locale } = useTranslation();
  const store = useStore();
  const isLoading = useSelector(selectIsLoading());
  const socket = useSocket(`/`);
  const { sendEvent, response } = useEmitEvent(socket, `status:ok`, {
    status: `200`,
  });

  const { data: session } = useSession();

  const handleClickLanguage = () => {
    sendEvent();
    store.dispatch(setLoading(!isLoading));

    if (locale == `ptBr`) {
      changeLanguage(`enUs`);
    } else {
      changeLanguage(`ptBr`);
    }
  };

  useEffect(() => {
    const testCookie = async () => {
      const data = await api.post(`/api/cookie/test`);
      console.log(data);
    };

    testCookie();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      <Head>
        <title>miPoker | Home</title>
        <meta name="description" content="Webpage to game miPoker" />
        <link rel="icon" href="/logo/mitg-icon.svg" />
      </Head>

      <div>
        <button onClick={() => signIn(`discord`)}>Login Discord</button>
      </div>
      <div>
        <button onClick={() => signIn(`github`)}>Login Github</button>
      </div>
      <div>
        <button onClick={() => signOut()}>Deslogar</button>
      </div>

      <button onClick={handleClickLanguage}>{t(`home/template`)}</button>
      <div>{response?.message}</div>
      <div>
        <span>{isLoading ? `loading` : `not loading`}</span>
      </div>
    </div>
  );
};

export default Home;
