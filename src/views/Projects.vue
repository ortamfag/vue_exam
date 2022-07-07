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
					<v-toolbar-title>Проекты</v-toolbar-title>
				</v-toolbar>
			</template>
		</v-data-table>

		<form class="pa-5">
			<div class="mb-4">Добавить проект</div>

			<div class="d-flex">
				<v-text-field
					v-model="form.name"
					label="Название"
					required
					class="textfield mr-5"
				></v-text-field>
				<v-text-field
					v-model="form.description"
					label="Описание"
					required
					class="textfield"
				></v-text-field>
			</div>

			<v-btn class="col-12" color="primary" @click="handlerClickAddCategory"
				>Добавить</v-btn
			>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Projects',

	data() {
		return {
			form: {
				name: '',
				description: '',
			},

			loading: true,
			options: {},
			headers: [
				{ text: 'Название', value: 'name', sortable: false },
				{
					text: 'Описание',
					align: 'start',
					sortable: false,
					value: 'description',
				},
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

			const { sortBy, sortDesc, page, itemsPerPage } = this.options

			const prefixDirectionSort = sortDesc[0] ? '' : '-'

			await this.$store.dispatch('Projects/fetchProjects', {
				offsetQuery: (page - 1) * 5,
				orderingQuery: prefixDirectionSort + sortBy,
			})

			this.loading = false
		},

		async handlerClickAddCategory() {
			try {
				await this.$store.dispatch('Projects/addProject', {
					name: this.form.name,
					description: this.form.description,
				})

				await this.getDataFromApi()
			} catch (e) {
				console.log(e)
			}

			this.form.name = ''
			this.form.description = ''
		},
	},

	computed: {
		...mapGetters({
			getActiveItems: 'Projects/getActiveItems',
			getCountOfActiveItems: 'Projects/getCountOfActiveItems',
		}),
	},
}
</script>

<style>
.v-data-footer {
	justify-content: flex-end;
	padding: 5px 0 !important;
}

.textfield {
	max-width: 200px;
}
</style>
