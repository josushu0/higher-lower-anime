<script setup lang="ts">
let highScore = ref<String | null>(null)

onMounted(() => {
	highScore.value = localStorage.getItem('highscore')
})
</script>

<template>
	<main class="flex h-dvh flex-col items-center justify-center bg-gray-900">
		<!-- Arrows -->
		<div class="absolute z-0 h-full w-full overflow-hidden">
			<div class="flex justify-between">
				<Icon
					v-for="index in 25"
					:key="index"
					name="icons:arrow"
					filled
					:class="'arrow-' + index"
					class="text-5xl text-red-500 will-change-transform even:rotate-180 even:text-green-500" />
			</div>
		</div>
		<!-- Overlay -->
		<div
			class="absolute z-10 h-full w-full bg-gradient-to-t from-transparent to-gray-950" />
		<div
			class="z-50 flex flex-col items-center gap-4 px-5 text-center text-gray-50">
			<h1 class="flex flex-col items-center text-5xl font-bold uppercase">
				<span>Higher</span>
				<span>Lower</span>
				<span>Anime</span>
			</h1>
			<p class="text-lg">
				Can you guess which anime has a better score in
				<NuxtLink to="https://anilist.co" target="_blank">AniList</NuxtLink>?
			</p>
			<NuxtLink
				to="game"
				class="cursor-pointer rounded-full border-4 border-gray-50 bg-transparent px-10 py-2 transition-colors hover:bg-gray-50 hover:text-gray-950">
				Play
			</NuxtLink>
			<p v-if="highScore" class="text-lg">Highscore: {{ highScore }}</p>
		</div>
	</main>
</template>

<style lang="scss" scoped>
@keyframes arrows {
	0% {
		translate: 0% 100vh;
		scale: 50%;
	}
	100% {
		translate: 0% -10vh;
		scale: 100%;
	}
}

@for $i from 1 through 25 {
	.arrow-#{$i} {
		animation: arrows linear infinite;
		animation-duration: calc(random() * (40 - 10) + 10) + s;
	}

	@media (prefers-reduced-motion) {
		.arrow-#{$i} {
			animation: none;
			display: none;
		}
	}
}
</style>
