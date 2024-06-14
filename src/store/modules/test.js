const state = {
    photeSize: {}
};

const mutations = {
    SET_PHOTOSIZE: (state, payload) => {
        console.log(payload);
		state.photeSize = payload;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
};
