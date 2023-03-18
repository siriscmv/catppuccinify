import '../styles/globals.css';
import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Inter } from 'next/font/google';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const font = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Title</title>
				<meta property='og:title' content='Title' />
				<meta property='og:description' content='description' />
				<meta property='theme-color' content='#00FFAA' />
				<meta name='theme-color' content='#00FFAA' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='description' />
			</Head>
			<main className={font.className}>
				<Component {...pageProps} />
			</main>
		</>
	);
}
