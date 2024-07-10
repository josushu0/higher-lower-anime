<script setup lang="ts">
import type { Anime } from '@prisma/client'
import AutoCounter from 'vue3-autocounter'

const props = defineProps<{
	card: Anime
	index: number
	prev: Anime
}>()

const emit = defineEmits(['result'])

const showButtons = ref(props.index !== 0)

const handleResult = (result: Boolean) => {
	showButtons.value = false
	emit('result', result)
}
</script>

<template>
	<div
		class="absolute h-full w-full bg-cover opacity-30"
		:style="{ backgroundImage: `url(${card.image})` }" />
	<div
		class="z-50 flex flex-col items-center gap-2 p-20 text-center text-gray-50">
		<h1 class="text-2xl font-bold md:text-3xl lg:text-4xl">
			{{ card.title }}
		</h1>
		<div v-if="showButtons" class="flex flex-col gap-2">
			<span>has a</span>
			<button
				@click="handleResult(card.averageScore > prev?.averageScore)"
				class="flex items-center gap-2 rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 font-bold transition-colors hover:bg-gray-50 hover:text-gray-950">
				Higher
				<Icon name="icons:arrow" class="rotate-180" />
			</button>
			<button
				@click="handleResult(card.averageScore === prev?.averageScore)"
				class="rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 font-bold transition-colors hover:bg-gray-50 hover:text-gray-950">
				Equal
			</button>
			<button
				@click="handleResult(card.averageScore < prev?.averageScore)"
				class="flex items-center gap-2 rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 font-bold transition-colors hover:bg-gray-50 hover:text-gray-950">
				Lower
				<Icon name="icons:arrow" />
			</button>
			<span>average score in AniList</span>
		</div>
		<div v-else class="flex flex-col gap-2">
			<span>has</span>
			<span v-if="index === 0" class="text-4xl font-bold md:text-5xl">{{
				card.averageScore
			}}</span>
			<AutoCounter
				v-else
				:startAmount="0"
				:endAmount="card.averageScore"
				:duration="1"
				:autoinit="true"
				class="text-4xl font-bold md:text-5xl" />
			<span>average score in AniList</span>
		</div>
	</div>
</template>
