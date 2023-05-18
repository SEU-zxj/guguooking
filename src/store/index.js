import { createStore } from 'vuex'

/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        num: 111,
        serverAddr: "https://581270ee-1944-469d-ad92-aee670aeb511.mock.pstmn.io",

        searchHotelListType:"",
        searchLocation: [],
        searchCheckinTime: "",
        searchCheckoutTime: "",
        searchPeopleNumber: 0,
        searchType: "",

        userPhoneNumber: "",
        isLogin: false,

        searchHotelId: 0,
    },
    mutations: {},
    actions: {},
    modules: {},
})


