<template>
  <a-card>
    <h2>账号详情</h2>

    <a-descriptions bordered size="middle">
      <a-descriptions-item label="账号 ID">{{ accountInfo.id }}</a-descriptions-item>
      <a-descriptions-item label="账号类型">{{ accountInfo.accountType }}</a-descriptions-item>
      <a-descriptions-item label="登录账号">{{ accountInfo.account }}</a-descriptions-item>
    </a-descriptions>

    <br />

    <!-- 顶部操作区 -->
    <a-space style="margin-bottom: 20px;" wrap>
      <a-input
          v-model:value="searchText"
          placeholder="搜索课程"
          style="width: 200px"
      />

      <!-- 筛选 -->
      <a-select v-model:value="filterState" style="width: 150px">
        <a-select-option value="ALL">全部课程</a-select-option>
        <a-select-option value="RUNNING">学习中</a-select-option>
        <a-select-option value="NOT_STARTED">未开始</a-select-option>
        <a-select-option value="FINISHED">已完成</a-select-option>
      </a-select>

      <!-- 全选 / 取消全选 -->
      <a-button @click="toggleAll">
        {{ isAllSelected ? '取消全选' : '全选' }}
      </a-button>

      <a-button type="primary" @click="startSelected">选中开始</a-button>
      <a-button type="danger" @click="pauseSelected">选中暂停</a-button>
    </a-space>

    <!-- 课程列表 -->
    <a-row :gutter="[16,16]">
      <a-col
          :xxl="6"
          :xl="6"
          :lg="8"
          :md="12"
          :sm="12"
          :xs="12"
          v-for="course in paginatedCourses"
          :key="course.id"
      >
        <!-- 点击卡片即可选中/取消选中 -->
        <a-card
            class="course-card selectable-card"
            style="height: 210px; position: relative;"
            @click="toggleCardSelect(course)"
        >
          <!-- 多选框（阻止冒泡） -->
          <a-checkbox
              style="position:absolute; left:10px; top:10px;"
              v-model:checked="selectedMap[course.id]"
              @click.stop
          />

          <!-- 单课程控制按钮（阻止冒泡） -->
          <a-tag
              :color="course.progress === 100 ? 'default' : (course.running ? 'green' : 'red')"
              :class="{ 'tag-finished': course.progress === 100 }"
              style="position:absolute; right:10px; top:10px;"
              @click.stop="toggleCourse(course)"
          >
            {{ course.progress === 100 ? '已完成' : (course.running ? '暂停' : '开始') }}
          </a-tag>

          <h3>{{ course.title }}</h3>
          <p style="font-size:13px; color:#666;">{{ course.desc }}</p>

          <a-progress
              :percent="course.progress"
              :stroke-color="course.running ? '#52c41a' : '#1890ff'"
          />
        </a-card>
      </a-col>
    </a-row>

    <!-- 分页器 -->
    <div style="margin-top: 20px; text-align: center;">
      <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="filteredCourses.length"
          :show-size-changer="true"
          :page-size-options="[4, 8, 12, 16]"
      />
    </div>

    <br />
    <a-button @click="goBack">返回账号管理</a-button>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const route = useRoute();
const router = useRouter();

const accountInfo = {
  id: route.params.id,
  accountType: '学习通',
  account: 'demoAccount123',
};

/***********************
 * 课程数据
 ***********************/
const courses = ref([
  { id: 1, title: '高等数学', desc: '春季课程', running: false, progress: 30 },
  { id: 2, title: '大学英语', desc: '必修课', running: false, progress: 55 },
  { id: 3, title: 'Python 程序设计', desc: '热门选修课', running: false, progress: 10 },
  { id: 4, title: '线性代数', desc: '数学基础', running: false, progress: 80 },
  { id: 5, title: '大学物理', desc: '理工必修', running: false, progress: 0 },
  { id: 6, title: 'C++ 基础', desc: '新课上线', running: false, progress: 100 },
]);

/***********************
 * 搜索 & 筛选
 ***********************/
const searchText = ref('');
const filterState = ref<'ALL' | 'RUNNING' | 'NOT_STARTED' | 'FINISHED'>('ALL');

const filteredCourses = computed(() => {
  return courses.value.filter((c) => {
    const keywordMatch =
        c.title.includes(searchText.value) || c.desc.includes(searchText.value);

    let filterMatch = true;
    if (filterState.value === 'RUNNING') filterMatch = c.running;
    if (filterState.value === 'NOT_STARTED') filterMatch = c.progress === 0;
    if (filterState.value === 'FINISHED') filterMatch = c.progress === 100;

    return keywordMatch && filterMatch;
  });
});

/***********************
 * 分页
 ***********************/
const currentPage = ref(1);
const pageSize = ref(4);

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredCourses.value.slice(start, start + pageSize.value);
});

/***********************
 * 选中逻辑
 ***********************/
const selectedMap = ref<Record<number, boolean>>({});

const toggleCardSelect = (course: { id: number }) => {
  selectedMap.value[course.id] = !selectedMap.value[course.id];
};

const isAllSelected = computed(() => {
  if (!filteredCourses.value.length) return false;
  return filteredCourses.value.every((c) => selectedMap.value[c.id]);
});

const toggleAll = () => {
  const target = !isAllSelected.value;
  filteredCourses.value.forEach((c) => {
    selectedMap.value[c.id] = target;
  });
};

/***********************
 * 批量操作
 ***********************/
const startSelected = () => {
  const selected = courses.value.filter((c) => selectedMap.value[c.id]);
  if (!selected.length) {
    message.warning('请选择课程');
    return;
  }
  selected.forEach((c) => (c.running = true));
  message.success('选中课程已全部开始');
};

const pauseSelected = () => {
  const selected = courses.value.filter((c) => selectedMap.value[c.id]);
  if (!selected.length) {
    message.warning('请选择课程');
    return;
  }
  selected.forEach((c) => (c.running = false));
  message.success('选中课程已全部暂停');
};

/***********************
 * 单课程开/停
 ***********************/
const toggleCourse = (course: any) => {
  // 已完成的课程不再允许切换状态（双保险）
  if (course.progress === 100) return;

  course.running = !course.running;
  message.success(`「${course.title}」${course.running ? '已开始' : '已暂停'}`);
};


/***********************
 * 实时进度更新动画
 ***********************/
let timer: number | null = null;

const updateProgress = () => {
  courses.value.forEach((course) => {
    if (course.running && course.progress < 100) {
      course.progress += 1;
      if (course.progress >= 100) {
        course.running = false;
        course.progress = 100;
      }
    }
  });
};

onMounted(() => {
  timer = window.setInterval(updateProgress, 500);
});

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer);
  }
});

/***********************
 * 返回
 ***********************/
const goBack = () => {
  router.push('/account');
};
</script>

<style scoped>
.course-card {
  transition: all 0.3s ease;
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}
.tag-finished {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none; /* 彻底禁用点击 */
}

</style>
