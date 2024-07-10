<script setup lang="ts">
defineProps<{
	correct: Boolean | null
}>()
</script>

<template>
	<Transition
		leave-active-class="transition-all duration-1000 ease-out"
		leave-to-class="opacity-0"
		enter-active-class="transition-all duration-1000 ease-out"
		enter-from-class="opacity-0">
		<div
			v-if="correct === null"
			class="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-gray-50 sm:size-24">
			<span class="text-xl font-bold text-gray-950 sm:text-3xl">VS</span>
		</div>
		<div
			v-else-if="correct"
			class="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-green-500 sm:size-24">
			<Icon name="icons:check" filled class="text-4xl text-gray-950" />
		</div>
		<div
			v-else
			class="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-red-500 sm:size-24">
			<Icon name="icons:close" filled class="text-4xl text-gray-950" />
		</div>
	</Transition>
</template>
