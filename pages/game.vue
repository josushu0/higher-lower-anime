<script setup lang="ts">
import type { Anime } from '@prisma/client'

const pastCards = ref<number[]>([])
const cards = ref<Anime[]>([])
const transition = ref(false)
const correct = ref<Boolean | null>(null)
const score = ref(0)
const dialog = ref<HTMLDialogElement | null>(null)

const { data } = await useFetch<Anime[]>('/api/anime', {
	query: { count: 3, past: pastCards },
})
if (data.value) {
	cards.value = data.value
	pastCards.value = data.value.map((card) => card.id)
}

watch(cards, async () => {
	if (cards.value.length < 3) {
		transition.value = false
		const data = await $fetch<Anime[]>('/api/anime', {
			query: { past: pastCards },
		})
		cards.value = [...cards.value, data[0]]
		pastCards.value = [...pastCards.value, data[0].id]
	}
})

const handleResult = (result: Boolean) => {
	if (result) {
		setTimeout(() => {
			correct.value = true
		}, 1000)
		setTimeout(() => {
			transition.value = true
		}, 2000)
		setTimeout(() => {
			cards.value = cards.value.slice(1)
			correct.value = null
			score.value += 1
		}, 3000)
	} else {
		setTimeout(() => {
			correct.value = false
		}, 1000)
		setTimeout(() => {
			dialog.value?.showModal()
		}, 2000)
		if (score.value > Number(localStorage.getItem('highscore'))) {
			localStorage.setItem('highscore', score.value.toString())
		}
	}
}
</script>

<template>
	<main class="relative h-screen w-screen overflow-hidden bg-gray-950">
		<div
			class="flex h-[150%] w-full flex-col transition-none duration-1000 will-change-transform sm:h-full sm:w-[150%] sm:flex-row"
			:class="
				transition
					? '-translate-y-1/3 transition-transform sm:-translate-x-1/3 sm:translate-y-0'
					: 'translate-x-0 translate-y-0'
			">
			<div
				v-for="(card, index) in cards"
				:key="card.id"
				class="relative grid h-1/3 w-full place-content-center sm:h-full sm:w-1/3">
				<Card
					:card="card"
					:index="index"
					:prev="cards[index - 1]"
					@result="handleResult" />
			</div>
		</div>
		<dialog
			ref="dialog"
			@keydown.esc.prevent
			class="flex w-60 flex-col items-center gap-4 rounded-xl border-4 border-gray-50 bg-gray-900 p-4 text-center text-gray-50">
			<span class="text-2xl">You Scored</span>
			<span class="text-2xl">{{ score }}</span>
			<NuxtLink
				to="/"
				class="w-full cursor-pointer rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 transition-colors hover:bg-gray-50 hover:text-gray-950">
				Home
			</NuxtLink>
			<button
				@click="() => reloadNuxtApp()"
				class="w-full rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 transition-colors hover:bg-gray-50 hover:text-gray-950">
				Play again
			</button>
		</dialog>
		<VS :correct="correct" />
		<span class="absolute bottom-2 right-5 text-2xl font-bold text-gray-50">
			Score: {{ score }}
		</span>
	</main>
</template>
