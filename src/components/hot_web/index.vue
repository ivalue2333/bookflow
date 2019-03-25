<template>
  <div style="background-color: #e5e4e9; position: absolute; width: 100%; height: 100%;">
    <div class="container" style="padding: 2rem">
      <h2>个人收藏云</h2>
    </div>
    <div class="container">
      <div class="row col-sm-12">
        <div class="col-sm-3 tag_box">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item" v-for="item in tag_list">
              <a class="nav-link" href="javascript:void(0)" @click="get_web_by_tag(item.id)">{{ item.name }}
                <span class="badge badge-success" @click="tag_add_web_model(item.id)" style="float: right">增加</span>
              </a>
            </li>
          </ul>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a href="javascript:void(0)" @click="show_add_tag" class="nav-link" style="color: green">新加标签</a>
            </li>
          </ul>
          <hr class="d-sm-none">
        </div>
        <div class="col-sm-8 web-box">
          <div class="class">
            <a class="nav-link" v-bind:href="item.url" v-for="item in web_list">
              <span>{{ item.desc }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div class="modal fade" id="tag_web_add_model">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">增加URL</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="url_add">url:</label>
              <input v-model="url_add" type="text" class="form-control" id="url_add">
            </div>
            <div class="form-group">
              <label for="desc_add">desc:</label>
              <input v-model="desc_add" v-on:keyup.enter="add_web" type="text" class="form-control" id="desc_add">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="add_web" type="button" class="btn btn-success" data-dismiss="modal">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="tag_add_model">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">增加标签</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="tag_name_add">标签名:</label>
              <input v-model="tag_name_add" v-on:keyup.enter="add_tag" type="text" class="form-control"
                     id="tag_name_add">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="add_tag" type="button" class="btn btn-success" data-dismiss="modal">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'index',
    data: function () {
      return {
        tag_list: [],
        web_list: [],

        choose_tag_id: 0,
        url_add: '',
        desc_add: '',

        tag_name_add: '',

      }
    },
    created: function () {
      this.get_tag_list();
      this.get_web_by_tag(1)
    },

    methods: {
      get_tag_list: function () {
        axios.get('/api/v1/tags').then((response) => {
          this.tag_list = response.data['data'];
        })
      },

      show_add_tag: function () {
        $('#tag_add_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 4);
          }
        })
      },

      add_tag: function () {
        axios.post('/api/v1/tags/', {
            'name': this.tag_name_add
          }
        ).then((response) => {
          this.get_tag_list();
          console.log(response.data['msg'])
        }).finally(() => {
            this.tag_name_add = ''
          }
        )
      },

      get_web_by_tag: function (tag_id) {
        axios.get('/api/v1/tags/' + tag_id + '/hot-webs').then((response) => {
          console.log(response.data['data']);
          this.web_list = response.data['data'];
        })
      },

      tag_add_web_model: function (tag_id) {
        this.choose_tag_id = tag_id;
        $('#tag_web_add_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 4);
          }
        })
      },

      add_web: function () {
        axios.post('/api/v1/hot-webs/', {
          'tag_id': this.choose_tag_id,
          'url': this.url_add,
          'desc': this.desc_add
        }).then((response) => {
          console.log(response.data['msg'])
          this.get_web_by_tag(this.choose_tag_id)
        }).finally(() => {
          this.choose_tag_id = 1;
          this.url_add = '';
          this.desc_add = ''
        });
      }

    }
  }
</script>

<style scoped>
  .tag_box {
    margin: 8px auto;
    background-color: #75c7b9;
    border-radius: 3%;
  }

  .web-box {
    margin: 8px auto;
    background-color: #bac6ca;
    border-radius: 3%;
  }

  .web-item {
    margin-top: 8px;
    padding: 5px;
    border-radius: 5%;
  }
</style>
