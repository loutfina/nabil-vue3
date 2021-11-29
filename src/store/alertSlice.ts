const state = {
    type: null,
    message: null,
};

const actions = {
    success({ commit }:any, message:string) {
        commit('addAlert', {type:'success', message});
    },
    error({ commit }:any, message:string) {
        commit('addAlert', {type:'danger', message});
    },
    warn({ commit }:any, message:string) {
        commit('addAlert', {type:'warning', message});
    },
    info({ commit }:any, message:string) {
        commit('addAlert', {type:'info', message});
    },
    clear({ commit }:any) {
        commit('clear');
    }
};

const mutations = {
    addAlert(state:any, {type, message}:any) {
        state.type = type;
        state.message = message;
    },
    clear(state:any) {
        state.type = null;
        state.message = null;
    }
};

export const alertSlice = {
    namespaced: true,
    state,
    actions,
    mutations
};