import Vue from 'vue'
import Vuex from 'vuex'
import Students from './Students.js'
import Groups from './Groups.js'
import Projects from './Projects.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
	Students, Projects, Groups
  }
})

