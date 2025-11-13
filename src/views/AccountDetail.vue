<template>
  <a-card>
    <h2>账号详情页面</h2>

    <a-descriptions bordered>
      <a-descriptions-item label="账号ID">{{ id }}</a-descriptions-item>
      <a-descriptions-item label="绑定邮箱">example@email.com</a-descriptions-item>
      <a-descriptions-item label="状态">正常</a-descriptions-item>
    </a-descriptions>

    <br />

    <a-button type="primary" @click="goBack">返回账号管理</a-button>
  </a-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 获取动态参数
const id = route.params.id;

// 返回
const goBack = () => {
  router.push('/account');
};
</script>
