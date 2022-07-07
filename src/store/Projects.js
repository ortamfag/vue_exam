import axios from 'axios'
import Vue from 'vue'


const Tracks = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},
	},

	actions: {
		async fetchProjects({ commit, state }, payload) {
			try {
				const { offsetQuery, orderingQuery } = payload

				const res = await axios(
					`/api/project?limit=5&offset=${offsetQuery}&ordering=${orderingQuery}/`,
				)

				commit('setActiveItems', res.data.results)
				commit('setCountOfActiveItems', res.data.count)
			} catch (e) {
				console.log(e)
			}
		},

		async addProject({ commit, state }, payload) {
			try {
				await axios.post(
					'/api/project/',
					{
						...payload,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				)
			} catch (e) {

				console.log(e)
			}
		},
	},

	getters: {
		getActiveItems: state => state.activeItems,
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Tracks
