/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: []
	},
	redirects: async () => {
		return [
			{
				source: '/_next/static/chunks/magick.js',
    			destination: '/magick.js',
				permanent: false
			}, {
				source: '/_next/static/chunks/magick.wasm',
    			destination: '/magick.wasm',
				permanent: false
			}
		]
	}
};

module.exports = nextConfig;
