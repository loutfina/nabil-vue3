import { createStore } from 'vuex'

import { alertSlice } from './alertSlice';
import { useSlice } from './userSlice';
import { rcaSlice } from './rcaSlice';
import { item2Slice } from './item2Slice';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    useSlice,
    alertSlice,
    rcaSlice,
    item2Slice
  }
})
