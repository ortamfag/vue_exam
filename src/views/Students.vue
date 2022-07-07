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
					<v-toolbar-title>Студенты</v-toolbar-title>
				</v-toolbar>
			</template>

			<template v-slot:item.project_data="{ item }">
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" text>Проекты</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="project in item.project_data"
							:key="project.id"
						>
							<v-list-item-title>{{ project.name }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
	name: 'Students',

	data() {
		return {
			loading: true,
			options: {},
			headers: [
				{ text: 'ID', value: 'user', sortable: true },
				{
					text: 'Группа',
					align: 'start',
					sortable: false,
					value: 'group_data.number',
				},
				{ text: 'Проекты', value: 'project_data', sortable: false }
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

			await this.$store.dispatch('Students/fetchStudents', { orderingQuery: prefixDirectionSort + sortBy })

			this.loading = false
		},
	},

	computed: {
		...mapGetters({
			getCountOfActiveItems: 'Students/getCountOfActiveItems',
		}),

		getActiveItems() {
			return this.$store.getters['Students/getActiveItems'](this.options.page)
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
