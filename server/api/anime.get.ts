import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
	const { count = 1, past }: { count: number; past: number[] } = getQuery(event)
	const anime = await prisma.anime.findManyRandom(count, {
		select: {
			id: true,
			title: true,
			image: true,
			averageScore: true,
		},
		where: {
			id: {
				notIn: past,
			},
		},
	})

	return anime
})
