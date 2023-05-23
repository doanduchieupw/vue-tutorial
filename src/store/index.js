import { createStore } from "vuex";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { query } from "firebase/database";
// Create a new store instance.
export const store = createStore({
  state() {
    return {
      blogList: [],
      currentBlog: {},
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
    setBlogList(state, doc) {
      state.blogList = doc;
    },
    setBlog(state, doc) {
      state.currentBlog = doc;
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
    async getBlogList({ commit }) {
      const blogRef = collection(db, "blogs");
      const blogQuery = query(blogRef, limit(10), orderBy("createdAt", "desc"));
      const blogSnapshot = await getDocs(blogQuery);
      console.log(
        "🚀 ~ file: index.js:52 ~ getBlogList ~ blogSnapshot:",
        blogSnapshot
      );
      const blogList = [];
      blogSnapshot.forEach((doc) => {
        blogList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("🚀 ~ file: index.js:54 ~ getBlogList ~ blogList:", blogList);
      commit("setBlogList", blogList);
    },
    async getBlog({ commit }, id) {
      const blogRef = doc(db, "blogs", id);
      const blogSnapshot = await getDoc(blogRef);
      console.log(
        "🚀 ~ file: index.js:74 ~ getBlog ~ blogSnapshot:",
        blogSnapshot.data()
      );
      commit("setBlog", blogSnapshot.data());
    },
  },
});
