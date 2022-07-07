import axios from 'axios'
import Vue from 'vue'


const Students = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
		page: 1
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},

		setPage(state, page) {
			state.setPage = page
		},
	},

	actions: {
		async fetchStudents({ commit, state }, payload) {
			try {
				const { orderingQuery } = payload

				const res = await axios(
					`/api/student?ordering=${orderingQuery}`,
				)

				commit('setActiveItems', res.data.results)
				commit('setCountOfActiveItems', res.data.count)
			} catch (e) {
				console.log(e)
			}
		},
	},

	getters: {
		getActiveItems: state => page => {
			return state.activeItems.slice((page - 1) * 5, page * 5)
		},
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Students
