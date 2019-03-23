<template>
  <div style="background-color: #e5e4e9">
    <div class="jumbotron text-center" style="margin-bottom:0">
      <span>个人收藏云</span>
    </div>

    <div class="container" style="margin-top:10px; padding-bottom: 20px">
      <div class="row">
        <div class="col-sm-3 tag_box">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item" v-for="item in tag_list">
              <a class="nav-link" href="javascript:void(0)" @click="get_web_by_tag(item.id)">{{ item.name }}
                <span class="badge badge-success" @click="show_web_add_modal(item.id)" style="float: right">增加</span>
              </a>
            </li>
          </ul>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link" style="color: green">新加标签</a>
            </li>
          </ul>
          <hr class="d-sm-none">
        </div>

        <div class="col-sm-6 web-box">
          <div class="class">
            <a class="nav-link" v-bind:href="item.url" v-for="item in web_list">
              <span>{{ item.desc }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div class="modal fade" id="tag_add_model">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">模态框头部</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="insert_url">url:</label>
              <input v-model="insert_url" type="text" class="form-control" id="insert_url">
            </div>
            <div class="form-group">
              <label for="insert_desc">desc:</label>
              <input v-model="insert_desc" type="text" class="form-control" id="insert_desc">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="insert_web" type="button" class="btn btn-success" data-dismiss="modal">保存</button>
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
        insert_url: '',
        insert_desc: '',
      }
    },
    created: function () {
      this.get_tag_list();
      this.get_web_by_tag(1)
    },

    methods: {
      get_tag_list: function () {
        axios.get('/api/api/v1/tags').then((response) => {
          this.tag_list = response.data['data'];
        })
      },

      get_web_by_tag: function (tag_id) {
        axios.get('/api/api/v1/tags/' + tag_id + '/hot-webs').then((response) => {
          this.web_list = response.data['data'];
        })
      },

      show_web_add_modal: function (tag_id) {
        this.choose_tag_id = tag_id;
        $('#tag_add_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 3);
          }
        })
      },

      insert_web: function () {
        axios.post('/api/api/v1/hot-webs/', {
          'tag_id': this.choose_tag_id,
          'url': this.insert_url,
          'desc': this.insert_desc
        }).then((response) => {
          this.get_web_by_tag(this.choose_tag_id)
        }).finally(() => {
          this.choose_tag_id = 1;
          this.insert_url = '';
          this.insert_desc = ''
        });
        console.log(this.choose_tag_id);
        console.log(this.insert_url);
        console.log(this.insert_desc);
      }

    }
  }
</script>

<style scoped>
  .jumbotron {
    padding: 1rem 1rem;
    margin-bottom: 2rem;
    background-color: #e5e4e9;
    border-radius: 0.3rem;
  }

  @media (min-width: 576px) {
    .jumbotron {
      padding: 2rem 2rem;
    }
  }

  .tag_box {
    margin-top: 8px;
    margin-left: 5px;
    background-color: #75c7b9;

    border-radius: 3%;
  }

  .web-box {
    margin-top: 8px;
    margin-left: 5px;
    background-color: #bac6ca;
    border-radius: 3%;
  }

  .web-item {
    margin-top: 8px;
    padding: 5px;
    border-radius: 5%;
  }
</style>
