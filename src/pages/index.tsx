import { capitalizeFirstLetter } from '@utils/string';
import type { NextPage } from 'next';
import { useState } from 'react';
//@ts-ignore
import { saveAs } from 'file-saver';

const THEMES = ['latte', 'frappe', 'macchiato', 'mocha'] as const;
type ThemeType = (typeof THEMES)[number];

const Home: NextPage = () => {
	const [theme, setTheme] = useState<ThemeType>('mocha');
	const [state, setState] = useState<'loading' | 'done' | null>(null);

	return (
		<div className={`ctp-${theme}`}>
			<div className='hidden ctp-latte ctp-frappe ctp-macchiato ctp-mocha' />
			<div className='flex flex-col text-ctp-text bg-ctp-crust min-h-screen items-center justify-center text-center'>
				<div className='flex flex-col p-4'>
					<div>
						<label htmlFor='theme' className='my-4 p-2 text-xl font-bold'>
							Choose theme:
						</label>
						<select
							value={theme}
							onChange={(e) => setTheme(e.target.value as ThemeType)}
							id='theme'
							className='h-10 w-72 min-w-[200px] bg-ctp-surface0 rounded-md focus:ring-ctp-blue'
						>
							{THEMES.map((theme) => (
								<option key={theme.toLowerCase()} value={theme.toLowerCase()}>
									{capitalizeFirstLetter(theme)}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col lg:flex-row m-6 p-6'>
						<div className='flex flex-row'>
							<label className='p-2 text-xl font-bold' htmlFor='input'>
								Choose image:
							</label>
							<input accept='.png,.gif,.jpeg,.jpg' className='p-2' id='input' type='file' />
						</div>
						<button
							className='p-2 m-2 bg-ctp-surface0 font-bold text-2xl rounded-md'
							onClick={async () => {
								setState('loading');
								const { Call } = await import('wasm-imagemagick');

								//@ts-ignore
								if (document.getElementById('input')?.files.length !== 1) return;
								//@ts-ignore
								const file = document.getElementById('input')!.files[0] as File;

								const arrayBuffer = await file.arrayBuffer();
								const sourceBytes = new Uint8Array(arrayBuffer);

								const fileName = `src.${file.name.split('.').pop()}`;
								const outputFileName = `${theme}-${file.name}`;

								const files = [
									{ name: fileName, content: sourceBytes },
									{
										name: 'hald-clut.png',
										content: new Uint8Array(await (await fetch(`/luts/${theme}-hald-clut.png`)).arrayBuffer())
									}
								];
								const command = [fileName, 'hald-clut.png', '-hald-clut', outputFileName];

								const processedFiles = await Call(files, command);
								setState('done');

								const out = processedFiles[0]['blob'];
								saveAs(out, outputFileName);
							}}
						>
							Catppuccinify!
						</button>
						{state === 'loading' ? 'Processing...' : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
