<template>
  <div v-if="posts.length > 0">
    <h3>Список користувачів</h3>
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else style="color: red">Список користувачів пустий</h2>
</template>

<script>
import PostItem from "../components/PostItem";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      requaired: true,
    },
  },
};
</script>

<style scoped></style>
