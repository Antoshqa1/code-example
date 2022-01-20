import store from './store/store'

import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard'
import User from './components/user/User'
import AdminPanel from './components/admin/AdminPanel'
import Users from './components/admin/Users'
import Groups from './components/admin/Groups'
// import Accesses from './components/user/Accesses'
import Vk from './components/user/VK/Vk'
// import MyTarget from './components/user/myTarget/MyTarget'
import Statistics from './components/user/statistics/Statistics'
import Cabinet from './components/cabinet/Cabinet'
import Clients from './components/cabinet/Clients'
import VkToken from './components/cabinet/tokens/VkToken.vue'
import YmToken from './components/cabinet/tokens/YmToken.vue'
import MtToken from './components/cabinet/tokens/MtToken.vue'
import CabinetUsers from './components/cabinet/Users.vue'
import Accesses from './components/cabinet/Accesses.vue'
import MyTarget from './components/cabinet/MyTarget.vue'

export default {
    mode: 'history',
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/dashboard',
            component: Dashboard,
        },
        {
            path: '/user',
            component: User,
            children: [
                // {
                //     path: '/user/accesses',
                //     component: Accesses
                // },
                {
                    path: '/user/vk',
                    component: Vk
                },
                {
                    path: '/user/statistics',
                    component: Statistics
                },

            ]
        },
        {
            path: '/admin',
            component: AdminPanel,
            children: [{
                    path: '/admin/users',
                    component: Users
                },
                {
                    path: '/admin/groups',
                    component: Groups
                }
            ]
        },
        {
            path: '/cabinet',
            component: Cabinet,
            name: 'cabinet',
        },
        {
            path: '/tokens/vk',
            component: VkToken,
        },
        {
            path: '/tokens/ym',
            component: YmToken,
        },
        {
            path: '/tokens/mt',
            component: MtToken,
        },
        {
            path: '/cabinet/clients',
            component: Clients
        },
        {
            path: '/cabinet/users',
            component: CabinetUsers
        },
        {
            path: '/cabinet/accesses',
            component: Accesses
        },
        {
            path: '/cabinet/mytarget',
            component: MyTarget
        }
    ]
}