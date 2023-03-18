import type { NextPage } from 'next';
import { useState } from 'react';
import { execute } from 'wasm-imagemagick';

const Home: NextPage = () => {
	const [theme, setTheme] = useState<string>('ctp-mocha');

	return <div className={theme}>
		<div className='ct ctp- text-white'></div>
	</div>;
};

export default Home;
