import { createStore } from 'vuex'

/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        num: 111,
        serverAddr: "https://581270ee-1944-469d-ad92-aee670aeb511.mock.pstmn.io",
        serverAddr2: "http://192.168.43.249:9090/user",

        userToken: "",

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
        options : [
            {
              value: "中国",
              label: "中国",
              children: [
                {
                  value: "江苏",
                  label: "江苏",
                  children: [
                    {
                      value: "南京",
                      label: "南京",
                    },
                  ],
                },
                {
                  value: "重庆",
                  label: "重庆",
                },
                {
                  value: "上海",
                  label: "上海",
                },
              ],
            },
            {
              value: "美国",
              label: "美国",
              children: [
                {
                  value: "纽约州",
                  label: "纽约州",
                  children: [
                    {
                      value: "纽约",
                      label: "纽约",
                    },
                  ],
                },
                {
                  value: "加利福尼亚",
                  label: "加利福尼亚",
                  children: [
                    {
                      value: "硅谷",
                      label: "硅谷",
                    },
                  ],
                },
              ],
            },
          ],

        myColor: {
          color1: "#535492",
          color2: "#d8965e",
          color3: "#efcaa1",
        }
    },
    mutations: {

    },
    actions: {},
    modules: {},
})


