import { createStore } from 'vuex'

/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        num: 111,
        // serverAddr: "https://581270ee-1944-469d-ad92-aee670aeb511.mock.pstmn.io",
        serverAddr: "http://192.168.43.249:9090/user",
        userPhoneNumber: "",
        isLogin: false,
    },
    mutations: {},
    actions: {},
    modules: {},
})


