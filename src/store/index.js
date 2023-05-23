import { createStore } from "vuex";
import { auth, db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
// Create a new store instance.
export const store = createStore({
  state() {
    return {
      username: null,
      email: null,
      fullName: null,
      userId: null,
    };
  },
  mutations: {
    setUserInfo(state, doc) {
      console.log("doc", doc);
      state.userId = doc.id;
      state.email = doc.email;
      state.fullName = doc.fullName;
      state.username = doc.username;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        console.log(
          "🚀 ~ file: index.js:28 ~ getCurrentUser ~ userSnapshot:",
          userSnapshot
        );
        commit("setUserInfo", { ...userSnapshot.data(), id: userSnapshot.id });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
