<template>
  <div class="app">
    <h1>Сторінка з постами</h1>
    <my-button @click="showDialog" style="margin: 15px 0"
      >Створити користувача</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      posts: [
        { id: 1, title: "Javascript", body: "Опис поста" },
        { id: 2, title: "Javascript 2", body: "Опис поста 2" },
        { id: 3, title: "Javascript 3", body: "Опис поста 3" },
        { id: 4, title: "Javascript 4", body: "Опис поста 4" },
      ],

      dialogVisible: false,
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
