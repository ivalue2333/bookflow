<template>
    <div>
      {{ msg }}
      <div @click="update_msg">click me</div>
    </div>

</template>

<script>
    export default {
        name: "about",
        data: function () {
          return {
            msg: 'old msg'
          }
        },

        methods: {
          update_msg: function () {
            console.log(this.msg);
            this.msg = 'new msg'
          }
        }
    }
</script>

<style scoped>

</style>
