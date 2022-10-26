<!-- We have 3 pages for accessing protected data:

BoardUser page calls UserService.getUserBoard()
BoardModerator page calls UserService.getModeratorBoard()
BoardAdmin page calls UserService.getAdminBoard()
-->


<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
  
  <script>
  import UserService from '../services/user.service';
  
  export default {
    name: 'User',
    data() {
      return {
        content: ''
      };
    },
    mounted() {
      UserService.getUserBoard().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  };
  </script>