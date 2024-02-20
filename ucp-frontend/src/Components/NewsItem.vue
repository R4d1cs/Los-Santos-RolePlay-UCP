<template>
	<div class="news-item">
		<div class="news-date">{{ newsDate }}</div>
		<div class="news-title">{{ newsTitle }}</div>
		<div class="news-context">{{ newsContext }}</div>
	</div>
</template>

<script setup>
	import { toRefs } from 'vue'

	const Props = defineProps({
		newsTitle: String,
		newsDate: String,
		newsContext: String
	})

	const {
		newsTitle,
		newsDate,
		newsContext
	} = toRefs(Props)
</script>

<style lang="scss" scoped>
	.news-item {
		display: flex;
		flex-direction: column;
		align-items: start;
		text-align: start;

		padding: 10px;
		border-radius: 5px;

		background-color: #171717;

		.news-date {
			color: black;
			font-size: 0.8rem;
			font-weight: 500;

			padding: 3px;
			border-radius: 5px;

			background-color: #ffffff;
		}

		.news-title {
			margin-top: 15px;
			font-size: 1.2rem;
		}

		.news-context {
			margin-top: 30px;

			font-size: 0.9rem;
			text-shadow: 1px 2px #000000;
		}
	}
</style>