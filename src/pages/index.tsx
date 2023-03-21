import { capitalizeFirstLetter } from '@utils/string';
import type { NextPage } from 'next';
import { useState } from 'react';
//@ts-ignore
import { saveAs } from 'file-saver';

const THEMES = ['latte', 'frappe', 'macchiato', 'mocha'] as const;
type ThemeType = (typeof THEMES)[number];

const Home: NextPage = () => {
	const [theme, setTheme] = useState<ThemeType>('mocha');
	const [state, setState] = useState<string | null>(null);

	const run = async () => {
		setState('Importing WASM...');
		const { Call } = await import('wasm-imagemagick');

		//@ts-ignore
		if (document.getElementById('input')?.files.length !== 1) return setState('No Input file found!');
		//@ts-ignore
		const file = document.getElementById('input')!.files[0] as File;

		const fileName = `src.${file.name.split('.').pop()}`;
		const outputFileName = `${theme}-${file.name}`;

		setState('Creating input buffer...');
		const input = { name: fileName, content: new Uint8Array(await file.arrayBuffer()) };

		setState('Creating LUT buffer...');
		const lut = {
			name: 'hald-clut.png',
			content: new Uint8Array(await (await fetch(`/luts/${theme}-hald-clut.png`)).arrayBuffer())
		};

		const files = [input, lut];
		const command = [fileName, 'hald-clut.png', '-hald-clut', outputFileName];

		setState('Applying LUT...');
		const processedFiles = await Call(files, command);
		setState('Done!');

		const out = processedFiles[0]['blob'];
		saveAs(out, outputFileName);
	};

	return (
		<div className={`ctp-${theme}`}>
			<div className='hidden ctp-latte ctp-frappe ctp-macchiato ctp-mocha' />
			<div className='flex flex-col text-ctp-text bg-ctp-crust min-h-screen items-center justify-center text-center'>
				<div className='flex flex-col p-4'>
					<div className='flex flex-col items-center'>
						<label htmlFor='theme' className='my-2 p-2 text-xl font-bold'>
							Choose theme:
						</label>
						<select
							value={theme}
							onChange={(e) => setTheme(e.target.value as ThemeType)}
							id='theme'
							className='h-10 w-2/3 bg-ctp-surface0 rounded-md'
						>
							{THEMES.map((theme) => (
								<option key={theme.toLowerCase()} value={theme.toLowerCase()}>
									{capitalizeFirstLetter(theme)}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col m-4 p-4'>
						<div className='flex flex-col'>
							<label className='my-2 p-2 text-xl font-bold' htmlFor='input'>
								Choose image:
							</label>
							<input accept='.png,.gif,.jpeg,.jpg' id='input' type='file' />
						</div>
						<div className='flex flex-col'>
							<button
								className='p-2 m-2 mt-12 bg-ctp-surface0 border-2 border-ctp-crust transition-colors duration-200 ease-in-out hover:border-ctp-mauve font-bold text-2xl rounded-md'
								onClick={run}
							>
								Catppuccinify!
							</button>
							{state ? state : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
