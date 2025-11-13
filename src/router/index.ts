import { createRouter, createWebHistory } from 'vue-router';
import AccountManager from '../views/AccountManagerView.vue';
import CourseManager from '../views/CourseManager.vue';
import ExamManager from '../views/ExamManager.vue';
import AccountDetail from '../views/AccountDetail.vue';

const routes = [
    { path: '/', redirect: '/account' },
    { path: '/account', component: AccountManager },
    { path: '/account/:id', component: AccountDetail },
    { path: '/course', component: CourseManager },
    { path: '/exam', component: ExamManager },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
