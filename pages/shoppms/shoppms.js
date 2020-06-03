import {
  $getLocation,
  $convertLocationToAdress
} from "../../utils/location";
import { $post } from "../../utils/requestbasic";

Page({
  data: {
    value: '',
    list: []
  },

  getLoName() {
    let res = $getLocation()
    res.then(res => {
      console.log(res)
      let ress = $convertLocationToAdress({
        lat:res.lat,
        lng:res.lng
      })
      ress.then(res => {
        console.log("xxxx", res)
        this.setData({
          addressName: res.address
        })
      })
    })

  },

  onShow: function () {
    this.selOrder()
  },

  onchange(e){
    console.log(e.detail)
    this.setData({
      title:e.detail
    })
  },

  async onClick(){
    let res = await $post(
      '/search',
      {
        title:this.data.title
      }
    )
    console.log(res.goods)
    if(res.goods){
      wx.navigateTo({
        url: '../searchdetail/searchdetail?idd='+res.goods[0].idd
        +'&codec='+res.goods[0].codec
        +'&chuangguige='+res.goods[0].chuangguige
        +'&id='+res.goods[0].id
        +'&descc='+res.goods[0].descc
        +'&guige='+res.goods[0].guige
        +'&pmswifi='+res.goods[0].pmswifi
        +'&price='+res.goods[0].price
        +'&renshu='+res.goods[0].renshu
        +'&title='+res.goods[0].title
        +'&userid='+res.goods[0].userid
        +'&imageURL='+encodeURIComponent(res.goods[0].imageURL),
      })
    }
  },

  async selOrder(){
    let res = await $post(
      '/selorder'
    )
    console.log(res)
    this.setData({
      list:res.goods
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  }
});