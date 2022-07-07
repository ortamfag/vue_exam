<template>
	<div class="grey lighten-3">
		<v-data-table
			:headers="headers"
			:items="getActiveItems"
			:options.sync="options"
			:server-items-length="getCountOfActiveItems"
			:loading="loading"
			class="elevation-1"
			:footer-props="{
				'items-per-page-options': [5],
			}"
			:items-per-page="5"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Группы</v-toolbar-title>
				</v-toolbar>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Groups',

	data() {
		return {
			loading: true,
			options: {},
			headers: [
				{ text: 'Номер', value: 'number', sortable: false },
			],
		}
	},
	watch: {
		options: {
			handler() {
				this.getDataFromApi()
			},
			deep: true,
		},
	},
	methods: {
		async getDataFromApi() {
			this.loading = true

			const { sortBy, sortDesc } = this.options

			const prefixDirectionSort = sortDesc[0] ? '' : '-'

			await this.$store.dispatch('Groups/fetchGroups', {
				orderingQuery: prefixDirectionSort + sortBy,
			})

			this.loading = false
		},
	},

	computed: {
		...mapGetters({
			getCountOfActiveItems: 'Groups/getCountOfActiveItems',
		}),

		getActiveItems() {
			return this.$store.getters['Groups/getActiveItems'](this.options.page)
		},
	},
}
</script>

<style>
.v-data-footer {
	justify-content: flex-end;
	padding: 5px 0 !important;
}
</style>
