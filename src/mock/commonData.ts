const idOne = Math.round(Math.random() * 8)
const idTwo = Math.round(Math.random() * 8)
const idThree = Math.round(Math.random() * 8)
const idFour = Math.round(Math.random() * 8)

// 我的收藏
export const collectList = [
  {
    title: '【热销上新】春季潮流舒适透气网面老爹鞋男士阿甘鞋运动休闲鞋',
    desc: '老爹运动鞋，老爹运动鞋',
    price: '131.38',
    src: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${idOne}.jpg`
  },
  {
    title: '【女神节礼物】包包女2023新款单肩斜挎包链条包小方包菱格包',
    desc: '菱格包，菱格包',
    price: '119.03',
    src: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${idTwo}.jpg`
  },
  {
    title: '法式纯色连衣裙女新款收腰款显瘦中长款公主A字裙子',
    desc: '浅色连衣裙',
    price: '172.83',
    src: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${idThree}.jpg`
  },
  {
    title: '春季新款女士休闲鞋平底运动鞋女鞋子舒适板鞋潮流百搭低帮鞋',
    desc: '白搭低帮鞋',
    price: '131.38',
    src: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${idFour}.jpg`
  }
]

// 我的足迹
export const footPrintList = [
  {
    title: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    desc: '清汤鲜香 红汤劲爽',
    price: '159.00',
    src: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg'
  },
  {
    title: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    desc: '清汤鲜香 红汤劲爽',
    price: '159.00',
    src: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg'
  },
  {
    title: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    desc: '清汤鲜香 红汤劲爽',
    price: '159.00',
    src: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg'
  },
  {
    title: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    desc: '清汤鲜香 红汤劲爽',
    price: '159.00',
    src: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg'
  }
]

// 我的订单
export const orderList = [
  {
    "id": "1627903384845725698",
    "createTime": "2023-02-21 13:29:47",
    "payType": 1,
    "orderState": 6,
    "payLatestTime": "2023-02-21 13:59:47",
    "postFee": 0,
    "payMoney": 867,
    "totalMoney": 867,
    "totalNum": 3,
    "skus": [
      {
        "id": "1627903384858308610",
        "spuId": "4001172",
        "name": "称心如意手摇咖啡磨豆机咖啡豆研磨机",
        "quantity": 3,
        "image": "https://yanxuan-item.nosdn.127.net/84a59ff9c58a77032564e61f716846d6.jpg",
        "realPay": 289,
        "curPrice": 289,
        "totalMoney": null,
        "properties": [
          {
            "propertyMainName": "规格",
            "propertyValueName": "黑色格子纹"
          }
        ],
        "attrsText": "规格:黑色格子纹 "
      }
    ],
    "payChannel": 1,
    "countdown": 1089
  },
  {
    "id": "1627903221796352001",
    "createTime": "2023-02-21 13:29:08",
    "payType": 1,
    "orderState": 1,
    "payLatestTime": "2023-02-21 13:59:08",
    "postFee": 1,
    "payMoney": 10.9,
    "totalMoney": 9.9,
    "totalNum": 1,
    "skus": [
      {
        "id": "1627903221808934913",
        "spuId": "1306019",
        "name": "日式和风简约无盖垃圾桶11L",
        "quantity": 1,
        "image": "https://yanxuan-item.nosdn.127.net/7dfcc95b3e7c2c656a70e6351fe8f558.png",
        "realPay": 9.9,
        "curPrice": 9.9,
        "totalMoney": null,
        "properties": [
          {
            "propertyMainName": "颜色",
            "propertyValueName": "白色"
          }
        ],
        "attrsText": "颜色:白色 "
      }
    ],
    "payChannel": 1,
    "countdown": 1049
  },
  {
    "id": "1627900845660221441",
    "createTime": "2023-02-21 13:19:41",
    "payType": 1,
    "orderState": 1,
    "payLatestTime": "2023-02-21 13:49:42",
    "postFee": 0,
    "payMoney": 21.9,
    "totalMoney": 21.9,
    "totalNum": 1,
    "skus": [
      {
        "id": "1627900845664415746",
        "spuId": "3440042",
        "name": "超细纤维擦车厨房多用清洁抹布",
        "quantity": 1,
        "image": "https://yanxuan-item.nosdn.127.net/487cba1e2f2b3902cb6f9e97bb8fb013.png",
        "realPay": 21.9,
        "curPrice": 21.9,
        "totalMoney": null,
        "properties": [
          {
            "propertyMainName": "规格",
            "propertyValueName": "6条装"
          }
        ],
        "attrsText": "规格:6条装 "
      }
    ],
    "payChannel": 1,
    "countdown": 483
  },
  {
    "id": "1627872710155743234",
    "createTime": "2023-02-21 11:27:53",
    "payType": 1,
    "orderState": 1,
    "payLatestTime": "2023-02-21 11:57:53",
    "postFee": 5,
    "payMoney": 1203,
    "totalMoney": 1198,
    "totalNum": 2,
    "skus": [
      {
        "id": "1627872710180909058",
        "spuId": "3989765",
        "name": "宜兴原矿紫砂壶茶具礼盒5件套",
        "quantity": 2,
        "image": "https://yanxuan-item.nosdn.127.net/cec3c630e88787200095a8e11ee9942f.png",
        "realPay": 599,
        "curPrice": 599,
        "totalMoney": null,
        "properties": [
          {
            "propertyMainName": "套装",
            "propertyValueName": "1壶4杯礼盒装"
          }
        ],
        "attrsText": "套装:1壶4杯礼盒装 "
      }
    ],
    "payChannel": 1,
    "countdown": -1
  },
  {
    "id": "1627872698722070529",
    "createTime": "2023-02-21 11:27:50",
    "payType": 1,
    "orderState": 1,
    "payLatestTime": "2023-02-21 11:57:52",
    "postFee": 5,
    "payMoney": 1203,
    "totalMoney": 1198,
    "totalNum": 2,
    "skus": [
      {
        "id": "1627872698734653442",
        "spuId": "3989765",
        "name": "宜兴原矿紫砂壶茶具礼盒5件套",
        "quantity": 2,
        "image": "https://yanxuan-item.nosdn.127.net/cec3c630e88787200095a8e11ee9942f.png",
        "realPay": 599,
        "curPrice": 599,
        "totalMoney": null,
        "properties": [
          {
            "propertyMainName": "套装",
            "propertyValueName": "1壶4杯礼盒装"
          }
        ],
        "attrsText": "套装:1壶4杯礼盒装 "
      }
    ],
    "payChannel": 1,
    "countdown": -1
  }
]