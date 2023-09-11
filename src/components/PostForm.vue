<template>
  <form @submit.prevent>
    <h4>Створення поста</h4>
    <my-input v-model="post.title" type="text" placeholder="Назва" />
    <my-input v-model="post.body" type="text" placeholder="Опис" />
    <my-button
      class="btn"
      @click="createPost"
      style="align-self: flex-end; margin-top: 15px"
      >Створити</my-button
    >
  </form>
</template>

<script>
export default {
  emits: ["create"],
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },

  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scope>
form {
  display: flex;
  flex-direction: column;
}
</style>
