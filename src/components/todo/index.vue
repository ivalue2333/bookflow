<template>
  <div style="background-color: #e5e4e9; position: absolute; width: 100%; height: 100%;">
    <div class="container" style="padding: 2rem">
      <h2>Todo List</h2>
    </div>
    <div class="container">
      <div class="row col-md-12">
        <div class="col-sm-3">
          <select class="form-control">
            <option>1</option>
            <option>2</option>
          </select>
        </div>

      </div>
      <ul class="nav nav-pills flex-column">
        <li class="nav-item" v-for="item in todo_list">
          {{ item.name }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "index",
    data: function () {
      return {
        todo_group_list: [],
        todo_group_id: "",

        todo_list: [{"name": "abc"}, {"name": "def"}],
      }
    },

    created: function () {
      this.get_todo_group_list();
      if (this.todo_group_list.length > 0) {
        this.get_todo_list(this.todo_group_list[0]["id"]);
      }
    },

    methods: {
      get_todo_group_list: function () {
        axios.get("/api3/v1/todo-group", {}).then((response) => {
          this.todo_group_list = response.data["todo_group_list"]
        }).finally(
        )
      },
      get_todo_list: function (group_id) {
        axios.get("/api3/v1/todos", {
          "group_id": group_id,
        }).then((response) => {
          this.todo_list = response.data["todo_list"]
        }).finally(
        )
      }
    }
  }
</script>

<style scoped>

</style>
