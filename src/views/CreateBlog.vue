<template>
  <div class="editor-container">
    <div class="header">
      <input v-model="title" class="title" placeholder="Title blog" />
      <!-- <input type="file" @change="handleUploadCover" class="cover" /> -->
      <upload-image
        @upload-file="handleUploadCover"
        :imageUrl="cover"
      ></upload-image>
    </div>
    <ckeditor
      :editor="editor"
      v-model="content"
      :config="editorConfig"
      @ready="onEditorReady"
      class="editor"
    ></ckeditor>
    <p>{{ error }}</p>
    <button-submit :click="handleCreatePost">Create post</button-submit>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ButtonAuth, UploadImage } from "../components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const uploadAdapter = (loader) => ({
  upload: async () => {
    try {
      const formData = new FormData();
      const file = await loader.file;
      formData.append("image", file);
      const imgURL = await axios.post(
        `https://api.imgbb.com/1/upload?key=ba3c30c5e82434be56b4cece81e66674`,
        formData
      );
      return { default: imgURL?.data?.data?.display_url };
    } catch (err) {
      console.log(err);
    }
  },
});

export default {
  name: "CreateBlog",
  components: {
    "upload-image": UploadImage,
    "button-submit": ButtonAuth,
  },
  data() {
    return {
      editor: ClassicEditor,
      content: "",
      title: "",
      cover: "",
      error: "",
      editorConfig: {
        placeholder: "Write something",
        language: "en",
      },
    };
  },
  methods: {
    onEditorReady(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
      };
    },
    handleUploadCover(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
            this.error = error.message;
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              this.cover = downloadURL;
            });
          }
        );
      }
    },
    async handleCreatePost() {
      console.log("handleCreatePost");
      if (this.cover && this.content && this.title) {
        try {
          this.error = "";
          const blogRef = collection(db, "blogs");
          const blogDoc = await addDoc(blogRef, {
            content: this.content,
            cover: this.cover,
            title: this.title,
            user: this.user,
            createdAt: serverTimestamp(),
          });
          this.content = "";
          this.cover = "";
          this.title = "";
        } catch (error) {
          this.error = error.message;
        }
      } else {
        this.error = "Please fill out all required fields.";
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.username;
    },
  },
};
</script>

<style scoped>
.editor-container {
  margin-top: 16px;
  padding-inline: 24px;
}
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}
.title {
  border: none;
  border-bottom: 1px solid #919191;
  height: 50px;
  font-size: 32px;
}
.title:focus {
  outline: none;
}
.title::placeholder {
  color: #b3b3b3;
}
</style>
