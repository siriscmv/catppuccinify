import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { JetBrains_Mono } from 'next/font/google';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const font = JetBrains_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Catppuccinify</title>
				<meta property='og:title' content='Catppuccinify' />
				<meta property='og:description' content='A simple tool to catppuccinify images' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='A simple tool to catppuccinify images' />
			</Head>
			<main className={font.className}>
				<Component {...pageProps} />
			</main>
		</>
	);
}
