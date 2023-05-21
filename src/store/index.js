import { createStore } from 'vuex'

/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        num: 111,
        serverAddr: "https://581270ee-1944-469d-ad92-aee670aeb511.mock.pstmn.io",
        serverAddr2: "http://192.168.43.249:9090/user",

        searchHotelListType:"",
        searchLocation: [],
        searchCheckinTime: "",
        searchCheckoutTime: "",
        searchPeopleNumber: 0,
        searchType: "",

        userPhoneNumber: "",
        isLogin: false,

        searchHotelId: 0,
        totalPrice: 1.0,
        CurrentHotelName: "",
        CurrentHotelLocation: "",
        CurrentHotelFigURL: "",

        CurrentSelectTime: [],

        bookRoomInfo: [],
        //{
        //   roomId: 100,
        //   roomName: "",
        //   roomNumber: 0,
        //   roomPrice: 0,
        // },
    },
    mutations: {},
    actions: {},
    modules: {},
})


