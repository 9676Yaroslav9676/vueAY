<template>
  <div>
    <h1>Сторінка з постами</h1>
    <my-input
      v-focus
      :model="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Пошук..."
    />
    <div class="app__btns">
      <my-button @click="showDialog">Створити користувача</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="selectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Йде завантаження...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
        <div
         v-for="pageNumber in totalPages" 
         :key="pageNumber" class="page" 
         :class="{'current-page': page === pageNumber}"
         @click="changePage(pageNumber)"
         >{{ pageNumber }}
        </div>
      </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList,
  },

  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      selectedSort: "post/selectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
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

  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPost: "post/sortedPost",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },

  // watch: {
  //   page(){
  //     this.fetchPosts()
  //   }
  // },
};
</script>

<style scoped>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

/* .page__wrapper{
  display: flex;
  margin-top: 15px;
  }
  
  .page {
    border: 1px solid black;
    padding: 10px;
  }
  
  .current-page {
    border: 2px solid teal;
  } */

.observer {
  height: 30px;
  background: green;
}
</style>
