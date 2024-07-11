import cron from 'node-cron'
import { prisma } from '../utils/prisma'

interface Data {
	data: {
		Page: {
			media: [
				{
					averageScore: number
					coverImage: {
						extraLarge: string
					}
					title: {
						english: string
						romaji: string
					}
				},
			]
		}
	}
}

export default defineNitroPlugin(async () => {
	cron.schedule('0 0 1 1-12 *', async () => {
		const query = `
		query ($page: Int) {
			Page(page: $page, perPage: 50) {
				media(sort: SCORE_DESC, type: ANIME) {
					averageScore
					coverImage {
						extraLarge
					}
					title {
						english
						romaji
					}
				}
			}
		}`

		await prisma.anime.deleteMany()

		for (let i = 0; i < 20; i++) {
			const { data } = await $fetch<Data>('https://graphql.anilist.co', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query: query,
					variables: { page: i + 1 },
				}),
			})

			const anime = data.Page.media.map((anime, index) => {
				return {
					id: index + 1 + i * 50,
					averageScore: anime.averageScore,
					image: anime.coverImage.extraLarge,
					title: anime.title.english || anime.title.romaji,
				}
			})

			await prisma.anime.createMany({ data: anime })
		}
	})
})
