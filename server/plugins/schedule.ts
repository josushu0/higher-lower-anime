import cron from 'node-cron'

interface Data {
	data: {
		Page: {
			media: [
				{
					averageScore: number
					coverImage: {
						extraLarge: string
						large: string
						medium: string
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
						large
						medium
					}
					title {
						english
						romaji
					}
				}
			}
		}`

		await prisma.anime.deleteMany()

		for (let i = 0; i < 10; i++) {
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
					xlUrl: anime.coverImage.extraLarge,
					lgUrl: anime.coverImage.large,
					mdUrl: anime.coverImage.medium,
					title: anime.title.english || anime.title.romaji,
				}
			})

			await prisma.anime.createMany({ data: anime })
		}
	})
})
