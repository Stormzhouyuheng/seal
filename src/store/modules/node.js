
const node = {
  state: {
    curNodeData: []
  },

  mutations: {
    SET_NODE: (state, data) => {
      state.curNodeData = data
    }
  }
}

export default node
