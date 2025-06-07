<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img id="logoImg" src="https://yatori-dev.github.io/yatori-docs/img/logo.png" height="40">
        <span v-if="!collapsed" id="logoTxt">Yatori</span>
      </div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>账号管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>课程管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>考试管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <a-row :gutter="[16,16]">
          <a-col :span="12">
            <a-card style="height: 150px">
              <a-form>
                <a-form-item label="账号">
                  114514
                </a-form-item>
                <a-form-item label="密码">
                  ******
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card style="height: 150px">
              <a-form>
                <a-form-item label="账号">
                  114514
                </a-form-item>
                <a-form-item label="密码">
                  ******
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card style="height: 150px">
              <a-form>
                <a-form-item label="账号">
                  114514
                </a-form-item>
                <a-form-item label="密码">
                  ******
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card style="height: 150px">
              <a-form>
                <a-form-item label="账号">
                  114514
                </a-form-item>
                <a-form-item label="密码">
                  ******
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card style="height: 150px">
              <a-form>
                <a-form-item label="账号">
                  114514
                </a-form-item>
                <a-form-item label="密码">
                  ******
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>

        </a-row>

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style>

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  /*background: rgba(255, 255, 255, 0.3);*/
  color: azure;
  margin: 16px;
}
.logo #logoTxt{
  position: absolute;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;
}


.site-layout .site-layout-background {
  background: #fff;
}
</style>
