<template>
  <div style="background-color: #e5e4e9; position: absolute; width: 100%; height: 100%;">
    <div class="container" style="padding: 2rem">
      <h2>个人收藏云</h2>
    </div>
    <div class="container">
      <div class="row col-md-12">
        <div class="col-sm-3 hot_web_group_box">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item" v-for="item in hot_web_group_list">
              <a class="nav-link" href="javascript:void(0)"
                 @click="get_web_by_hot_web_group(item.id)"
                 @dblclick="hot_web_group_delete_web_model(item.name, item.id)">
                {{ item.name }}
                <span class="badge badge-success" @click="hot_web_group_add_web_model(item.id)" style="float: right">增加</span>
              </a>
            </li>
          </ul>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a href="javascript:void(0)" @click="show_add_hot_web_group" class="nav-link" style="color: green">新加标签</a>
            </li>
          </ul>
          <hr class="d-sm-none">
        </div>
        <div class="col-sm-7 web-box">
          <div class="class">
            <a :id="item.id" class="nav-link web-item" v-bind:href="item.url"
               v-for="item in web_list" draggable="true" @dragstart="drag_start(item.id, $event)"
               target="_blank">
              {{ item.desc }}
            </a>
          </div>
        </div>
        <div class="col-sm-1">
          <div class="trash" @dragover="allow_drop($event)" @drop="drop($event)"
               @dragenter="drag_enter()" @dragleave="drag_leave()">
            垃圾桶
          </div>
        </div>
      </div>
    </div>


    <!-- 模态框 -->
    <div class="modal fade" id="hot_web_group_web_add_model">
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

    <div class="modal fade" id="hot_web_group_web_delete_model">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" v-model="choose_hot_web_group_name">
              删除标签：<span style="color: #dc3545">{{ choose_hot_web_group_name}}</span></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-footer">
            <button @click="delete_hot_web_group" type="button" class="btn btn-danger" data-dismiss="modal">删除</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="hot_web_group_add_model">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">增加标签</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="hot_web_group_name_add">标签名:</label>
              <input v-model="hot_web_group_name_add" v-on:keyup.enter="add_hot_web_group" type="text" class="form-control"
                     id="hot_web_group_name_add">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="add_hot_web_group" type="button" class="btn btn-success" data-dismiss="modal">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  const UrlPrefix = 'https://';

  export default {
    name: 'index',
    data: function () {
      return {
        hot_web_group_list: [],
        web_list: [],

        choose_hot_web_group_id: 0,
        choose_hot_web_group_name: '',
        url_add: UrlPrefix,
        desc_add: '',

        hot_web_group_name_add: '',

        drag_item_id: -1,
      }
    },
    created: function () {
      this.get_hot_web_group_list();
    },

    methods: {
      get_hot_web_group_list: function () {
        axios.get('/api/v1/hot_web_group_many').then((response) => {
          this.hot_web_group_list = response.data['hot_web_group_list'];
        })
      },

      show_add_hot_web_group: function () {
        $('#hot_web_group_add_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 4);
          }
        })
      },

      add_hot_web_group: function () {
        axios.post('/api/v1/hot_web_group', {
            'name': this.hot_web_group_name_add
          }
        ).then((response) => {
          this.get_hot_web_group_list();
          console.log(response.data['msg'])
        }).finally(() => {
            this.hot_web_group_name_add = '';
          }
        );
      },

      delete_hot_web_group: function () {
        axios.delete('/api/v1/hot_web_group?id=' + this.choose_hot_web_group_id)
          .then((response) => {
            this.get_hot_web_group_list();
          }).finally(() => {
            this.choose_hot_web_group_id = 0;
            window.location.reload();
          }
        );
      },

      get_web_by_hot_web_group: function (hot_web_group_id) {
        axios.get('/api/v1/hot_web_many?hot_web_group_id=' + hot_web_group_id)
          .then((response) => {
          this.web_list = response.data['hot_web_list'];
        })
      },

      hot_web_group_add_web_model: function (hot_web_group_id) {
        this.choose_hot_web_group_id = hot_web_group_id;
        $('#hot_web_group_web_add_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 4);
          }
        })
      },

      hot_web_group_delete_web_model: function (hot_web_group_name, hot_web_group_id) {
        this.choose_hot_web_group_id = hot_web_group_id;
        this.choose_hot_web_group_name = hot_web_group_name;
        $('#hot_web_group_web_delete_model').modal().css({
          "margin-top": function () {
            return ($(this).height() / 4);
          }
        })
      },

      add_web: function () {
        if (this.url_add === null || this.url_add === '' ||
          this.desc_add === null || this.desc_add === '') {
          alert('[URL] and [DESC] are not null.');
          return;
        }

        axios.post('/api/v1/hot_web', {
          'hot_web_group_id': this.choose_hot_web_group_id,
          'url': this.url_add,
          'desc': this.desc_add
        }).then((response) => {
          console.log(response.data['msg']);
          this.get_web_by_hot_web_group(this.choose_hot_web_group_id)
        }).finally(() => {
          this.choose_hot_web_group_id = 1;
          this.url_add = UrlPrefix;
          this.desc_add = ''
        });
      },

      drag_start: function (id, e) {
        e.dataTransfer.setData("Text", event.target.id);
        this.drag_item_id = id;
      },

      drag_enter: function () {
        $('.trash').css('backgroundColor', 'darkgreen');
      },

      drag_leave: function () {
        $('.trash').css('backgroundColor', 'lightgreen');
      },

      allow_drop: function (e) {
        e.preventDefault();
      },

      drop: function (e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("Text");

        axios.delete('/api/v1/hot_web?id=' + this.drag_item_id).then((response) => {
            if (response.data.msg === 'success') {
              console.log("删除成功");
              $('.trash').css('backgroundColor', 'lightgreen');
            } else {
              console.log("删除失败");
            }
            this.get_hot_web_group_list();
          }).finally(() => {
            this.drag_item_id = -1;
            document.getElementById(data).style.display = "none";
          }
        );
      }
    }
  }
</script>

<style scoped>
  .hot_web_group_box {
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
  }

  .trash {
    position: absolute;
    bottom: 0;
    margin: 0 0 10px 0;
    padding-top: 16px;
    background-color: lightgreen;
    width: 50px;
    height: 50px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    border-radius: 10%;
  }
</style>
