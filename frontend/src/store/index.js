import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      userData: undefined,
    };
  },
  mutations: {
    setUserData(state, data) {
      console.log("setUserData", data);
      state.userData = data;
      localStorage.setItem("user", JSON.stringify(data));
    },
    checkUserData(state) {
      if (localStorage.getItem("user")) {
        try {
          state.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
  },
});

export default store;
