import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
		const request = await fetch('https://graphql.anilist.co', {
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

		const response = await request.json()

		const anime = response.data.Page.media.map((anime, index) => {
			return {
				id: index + 1 + i * 50,
				averageScore: anime.averageScore,
				image: anime.coverImage.extraLarge,
				title: anime.title.english || anime.title.romaji,
			}
		})

		await prisma.anime.createMany({ data: anime })
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
