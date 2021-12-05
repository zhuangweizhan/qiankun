<template>
  <div>
    <div class="login-title">登录页面</div>
    <div class="login-box">
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form" >
        <a-form-item>
          <a-input v-model="userName" placeholder="用户名">
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="password" type="password" placeholder="密码">
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住密码
          </a-checkbox>
          <a-button type="primary" @click="handleSubmit" class="login-form-button">去登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'admin',
      password: '123456',
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      this.$store.commit('setToken', '123456789');
      this.$store.commit('clearTabs');
      window.location.href= "/"
    },
  },
};
</script>
<style>
.login-title {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  padding: 20px;
  background: white;
  color: #40a9ff;
}
.login-box {
  text-align: center;
  display: flex;
  justify-content: center;
  background: #e8e2e2;
  padding-top: 20px;
}
.login-form {
  min-width: 400px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
