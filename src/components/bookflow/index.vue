<template>
  <div>
    <div class="jumbotron text-center" style="margin-bottom:0">
      <h1>Bookflow</h1>
      <span>让一本书被1000个人看见</span>
    </div>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style="height: 3em">
      <a class="navbar-brand" href="#">Bookflow</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">首页</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">捐赠</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">关于</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col-sm-8">
          <div class="card" style="width:30%; display: inline-block">
            <img
              class="card-img-top"
              src="http://static.runoob.com/images/mix/img_avatar.png"
              alt="Card image"
              style="width:100%"
            >
            <div class="card-body">
              <h4 class="card-title">John Doe</h4>
              <p
                class="card-text"
              >Some example text some example text. John Doe is an architect and engineer</p>
              <a href="#" class="btn btn-primary">See Profile</a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <h2>关于网站</h2>
          <p
            class="card-text"
          >Some example text some example text. John Doe is an architect and engineer</p>
          <h3 style="margin-top: 1em">最近热读</h3>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">肖生克的救赎</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="jumbotron text-center"
      style="margin: 1em 0 0 0; background-color: #343a40; height: 1em"
    >
      <p>Copyright © 2019-2020 bookflow 本站图书资源均来自互联网，仅供学习交流使用</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
