import { AppProps } from 'next/app';
import { Layout } from '@/layout';
import '@/styles/fonts.css';
import '@/styles/resets/reset.css';
import '@/styles/resets/_modern-normalize.css';
import LanguageProvider from '@/contexts/LanguageContext';
import { wrapper } from '@/store';
import SocketProvider from '@/contexts/SocketContext';
import { SessionProvider } from 'next-auth/react';

export const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <LanguageProvider>
        <SocketProvider>
          <Layout>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </SocketProvider>
      </LanguageProvider>
    </SessionProvider>
  );
};

export default wrapper.withRedux(MyApp);
