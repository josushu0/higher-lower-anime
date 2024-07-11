// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	compatibilityDate: '2024-07-05',
	modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
	icon: {
		customCollections: [{ prefix: 'icons', dir: './assets/icons' }],
	},
	vite: {
		resolve: {
			alias: {
				'.prisma/client/index-browser':
					'./node_modules/.prisma/client/index-browser.js',
			},
		},
	},
})
