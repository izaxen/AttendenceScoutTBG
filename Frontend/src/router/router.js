import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserHome from '../views/UserHomePage.vue'
import AddMeeting from '../views/AddMeetings.vue'
import AddAttendence from '../views/AddAttendence.vue'
import EditMeeting from '../views/EditMeeting.vue'
import CreateTempAttendent from '../views/CreateTempAttendent.vue'
import Statistic from '../views/Statistic.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHome
  },
  {
  path: '/add-meeting',
  name: 'AddMeeting',
  component: AddMeeting
  },
  {
    path: '/edit-meeting',
    name: 'EditMeeting',
    component: EditMeeting
  },
  {
    path: '/add-attendence',
    name: 'AddAttendence',
    component:AddAttendence
  },
  {
    path: '/create-temp-attendent',
    name: 'CreateTempAttendent',
    component: CreateTempAttendent
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component:Statistic
  }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  //scrollBehavior(to, from, savedPosition) {
    //window.scrollTo(0, 0);
 // }
})
export default router