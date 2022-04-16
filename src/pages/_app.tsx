import { AppProps } from 'next/app';
import { Layout } from '@/layout';
import '@/styles/fonts.css';
import '@/styles/resets/reset.css';
import '@/styles/resets/_modern-normalize.css';
import LanguageProvider from '@/contexts/LanguageContext';
import { SocketContext, socket } from '@/contexts/SocketContext';
import { wrapper } from '@/store';

export const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <LanguageProvider>
      <SocketContext.Provider value={socket}>
        <Layout>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </SocketContext.Provider>
    </LanguageProvider>
  );
};

export default wrapper.withRedux(MyApp);
