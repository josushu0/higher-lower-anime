// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	compatibilityDate: '2024-07-05',
	modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', "@prisma/nuxt"],
	icon: {
		customCollections: [{ prefix: 'icons', dir: './assets/icons' }],
	},
})