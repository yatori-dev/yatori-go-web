<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img id="logoImg" src="https://yatori-dev.github.io/yatori-docs/img/logo.png" height="40">
        <span v-if="!collapsed" id="logoTxt">Yatori</span>
      </div>

      <a-menu
          theme="dark"
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          @click="onMenuClick"
      >
        <a-menu-item key="/account">
          <user-outlined />
          <span>账号管理</span>
        </a-menu-item>

        <a-menu-item key="/course">
          <video-camera-outlined />
          <span>课程管理</span>
        </a-menu-item>

        <a-menu-item key="/exam">
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
            @click="collapsed = !collapsed"
        />
        <menu-fold-outlined
            v-else
            class="trigger"
            @click="collapsed = !collapsed"
        />
      </a-layout-header>

      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <!-- 路由切换渐入渐出动画 -->
        <transition name="slide-left" mode="out-in">
          <router-view />
        </transition>
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
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const selectedKeys = ref<string[]>([route.path]);
    const collapsed = ref(false);

    const onMenuClick = (item: any) => {
      router.push(item.key);
    };

    watch(
        () => route.path,
        (path) => {
          selectedKeys.value = [path];
        }
    );

    return {
      selectedKeys,
      collapsed,
      onMenuClick,
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
#logoImg {
  width: 40px;
  height: 40px;
  border-radius: 20px; /* 半径=高度一半 */
  object-fit: cover;
}


</style>
