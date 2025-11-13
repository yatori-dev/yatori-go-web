<template>
  <!-- 顶部操作栏 -->
  <a-space style="margin-bottom: 20px;">
    <a-input v-model:value="searchText" placeholder="请输入账号ID查询" style="width: 200px;" />
    <a-button type="primary" @click="onSearch">查询</a-button>
    <a-button type="dashed" @click="openAddModal">添加账号</a-button>
  </a-space>

  <!-- 账号卡片区域 -->
  <a-row :gutter="[16,16]">
    <a-col
        :xxl="6"
        :xl="6"
        :lg="8"
        :md="12"
        :sm="12"
        :xs="12"
        v-for="item in filteredAccounts"
        :key="item.id"
    >
      <a-card style="height: 160px; cursor: pointer; position:relative;">

        <a-tag
            color="error"
            style="position:absolute; right:10px; top:10px; cursor:pointer;"
            @click.stop="deleteAccount(item.id)"
        >
          删除
        </a-tag>

        <div @click="goDetail(item.id)">
          <a-form class="compact-form">
            <a-form-item label="账号类型">{{ accountTypeText[item.accountType] }}</a-form-item>
            <a-form-item label="账号 ID">{{ item.id }}</a-form-item>
            <a-form-item label="账号">{{ item.account }}</a-form-item>
            <a-form-item label="密码">******</a-form-item>
          </a-form>
        </div>

      </a-card>
    </a-col>
  </a-row>


  <!-- 添加账号弹窗 -->
  <a-modal
      v-model:open="addModalVisible"
      title="添加账号"
      ok-text="添加"
      cancel-text="取消"
      @ok="addAccount"
      :confirm-loading="addLoading"
  >
    <a-form layout="vertical">

      <a-form-item label="账号类型">
        <a-select v-model:value="newAccount.accountType">
          <a-select-option value="XUEXITONG">学习通</a-select-option>
          <a-select-option value="YINGHUA">英华学堂</a-select-option>
          <a-select-option value="ENAEA">学习公社</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="账号 ID">
        <a-input v-model:value="newAccount.id" />
      </a-form-item>

      <a-form-item label="登录账号">
        <a-input v-model:value="newAccount.account" />
      </a-form-item>

      <a-form-item label="密码">
        <a-input v-model:value="newAccount.password" type="password" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { addUser } from '../api/system/user';

const router = useRouter();

const accountTypeText: Record<string, string> = {
  XUEXITONG: '学习通',
  YINGHUA: '英华学堂',
  ENAEA: '学习公社',
};

const accounts = ref([
  { id: '114514', accountType: 'XUEXITONG', account: '123', password: '123456' },
  { id: '223344', accountType: 'YINGHUA', account: '123', password: '888888' },
  { id: '556677', accountType: 'XUEXITONG', account: '123', password: '000000' },
  { id: '998877', accountType: 'XUEXITONG', account: '123', password: '654321' },
  { id: '111222', accountType: 'ENAEA', account: '123', password: 'abcdef' },
]);

const goDetail = (id: string) => {
  router.push(`/account/${id}`);
};

const deleteAccount = (id: string) => {
  accounts.value = accounts.value.filter(acc => acc.id !== id);
  message.success(`账号 ${id} 已删除`);
};

const searchText = ref('');

const onSearch = () => {
  message.info(`搜索关键词：${searchText.value}`);
};

const filteredAccounts = computed(() => {
  if (!searchText.value) return accounts.value;
  return accounts.value.filter(acc => acc.id.includes(searchText.value));
});
/***********************
 * 添加账号
 ***********************/
const addModalVisible = ref(false);
const addLoading = ref(false); // <-- loading 状态

const newAccount = ref({
  id: '',
  accountType: 'XUEXITONG',
  account: '',
  password: '',
});

// 打开弹窗
const openAddModal = () => {
  newAccount.value = {
    id: '',
    accountType: 'XUEXITONG',
    account: '',
    password: '',
  };
  addModalVisible.value = true;
};

/***********************
 * 发送 POST 请求
 ***********************/
const addAccount = async () => {
  if (!newAccount.value.id) {
    message.error("账号 ID 不能为空");
    return;
  }
  if (!newAccount.value.account) {
    message.error("登录账号不能为空");
    return;
  }
  if (!newAccount.value.password) {
    message.error("密码不能为空");
    return;
  }

  addLoading.value = true; // 按钮进入加载

  try {
    // ⭐ 模拟服务器延迟 3 秒
    // await new Promise(resolve => setTimeout(resolve, 3000));

    const res = await addUser(
        newAccount.value.accountType,
        newAccount.value.account,
        newAccount.value.password
    );

    if (res.data.code === 200) {
      accounts.value.push({
        id: newAccount.value.id,
        accountType: newAccount.value.accountType,
        account: newAccount.value.account,
        password: newAccount.value.password || '******',
      });

      message.success("添加成功");
      addModalVisible.value = false;
    } else {
      message.error(`添加失败：${res.data.msg || '未知错误'}`);
    }

  } catch (error) {
    message.error("请求失败，请检查服务器或网络");
  } finally {
    addLoading.value = false; // 关闭加载状态
  }
};


</script>

<style scoped>
/* 缩小卡片内部行间距 */
.compact-form .ant-form-item {
  margin-bottom: 2px !important;
}

.compact-form .ant-form-item-label > label {
  font-size: 12px;
}

.compact-form .ant-form-item-control-input-content {
  font-size: 12px;
}


</style>
