<template>
  <div v-if="posts?.length">
    <h3>Список користувачів</h3>
    <transition-group name="user-list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
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

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}

.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}

.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>
