import '@app/styles/globals.css'
import '@app/styles/list.styles.scss'
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '@app/layout/_admin';

export type ExtendedNextPage = NextPage & {
  noLayout?: boolean;
  getLayout: any;
};

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage;
};
export default function App({ Component, pageProps }: ExtendedAppProps) {

  const router = useRouter()
  const getLayout = Component.getLayout

  if(getLayout){
    return getLayout(<Component {...pageProps} />)
  }
  if(router.asPath.match('/admin')){
    return <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  }

  return <Component {...pageProps} />
}
