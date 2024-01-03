import { createStore } from 'vuex'

export default createStore({
  state: {
    students: [],
    cloneStudents: [],
    searching: [{
      horary: '',
      class: '',
      name: ''
    }]
  },
  getters: {
  },
  mutations: {
    newStudent(state, data) {
      state.students.unshift(data)
      state.cloneStudents = structuredClone(state.students)
    },
    deleteStudent(state, data) {
      state.students = state.students.filter(students => students.id !== data)
      state.cloneStudents = structuredClone(state.students)
    },
    editStudent(state, data) {
      state.students = state.students.filter(students => students.id !== data.id)
      state.students.unshift(data)
      state.cloneStudents = structuredClone(state.students)
    },
    searchedClass(state, data) {
      state.searching.class = data
    },
    searchedHorary(state, data) {
      state.searching.horary = data
    },
    searchedName(state, data) {
      state.searching.name = data
    },
    filterAplication(state) {
      state.cloneStudents = state.students.filter(item => {
        const itemClass = Array.isArray(item.class) ? item.class : [item.class];
        const itemClassLower = itemClass.map(c => (c || '').toLowerCase());
        const itemHoraryLower = (item.horary || '').toLowerCase();
        const itemNameLower = (item.name || '').toLowerCase();
    
        // Verifica se searching.class está presente e não está vazio
        const hasSearchingClass = state.searching.class && state.searching.class.length > 0;
    
        // Se searching.class estiver presente e não estiver vazio, realiza a verificação de classe
        const classMatches = !hasSearchingClass || 
          itemClassLower.some(c => String(state.searching.class).toLowerCase().includes(c));
    
        return (
          classMatches &&
          (!state.searching.horary || itemHoraryLower.includes(state.searching.horary.toLowerCase())) &&
          (!state.searching.name || itemNameLower.includes(state.searching.name.toLowerCase()))
        );
      });
    }
    
  },
  actions: {
    waitRegisterNewStudent({ dispatch }, data) {
      const id = Date.now()
      data.id = id
      if (data.birth_date) {
        const date = data.birth_date
        const dataArray = date.split("-")
        const dataArrayInvertida = dataArray.reverse();
        const dataInvertida = dataArrayInvertida.join("/");
        data.birth_date = dataInvertida
      }
      dispatch('cpfFormatter', data)
    },
    studentWaitDelete({ commit }, data) {
      commit('deleteStudent', data)
    },
    waitEditStudent({ commit }, data) {
      commit('editStudent', data)
    },
    searchName({ commit }, data) {
      commit('searchedName', data)
      commit('filterAplication')
    },
    searchHorary({ commit }, data) {
      switch (data) {
        case false:
          commit('searchedHorary', 'matutino')
          commit('filterAplication')
          break
        case true:
          commit('searchedHorary', 'tarde')
          commit('filterAplication')
          break
        case null:
          commit('searchedHorary', '')
          commit('filterAplication')
          break
        default:
          return
      }
    },
    searchClass({ commit }, data) {
      commit('searchedClass', data)
      commit('filterAplication')
    },
    cpfFormatter({ commit }, data) {
      let dataFormatted = data;

      if (data.student_cpf) {
        dataFormatted.student_cpf = data.student_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      if (data.father_cpf) {
        dataFormatted.father_cpf = data.father_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      if (data.mother_cpf) {
        dataFormatted.mother_cpf = data.mother_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      commit('newStudent', dataFormatted);
    }
  },
  modules: {
  }
})
