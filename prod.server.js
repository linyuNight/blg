var express = require('express')
var compression = require('compression')
var config = require('./config/index')
var axios = require('axios')
var compression = require('compression');//开启gzip

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()
app.use(compression());//开启gzip

app.get('/goods', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var goodsdata = {
    "Status": 200,
    "Msg": "sample string 1",
    "Data": {
      "ShelfCode": "sample string 1",
      "ShelfType": "sample string 2",
      "GoodsList": [
        {
          "Level": 1,
          "GoodsInfoList": [
            {
              "SNo": 1,
              "GoodsCode": "sample string 1",
              "GoodsName": "撒旦法可怕搜到空间破碎的空间是的泼妇科技时代破飞机上打破sample string 1",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 0.01,
              "GoodsPrice": 2.0,
              "CurrQty": 0,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 2",
              "GoodsName": "sample string 2",
              "GoodsImg": [],
              "GoodsDiscPrice": 3.0,
              "GoodsPrice": 4.0,
              "CurrQty": -2,
              "MaxQty": 7,
              "ShouldQty": 8
            }
          ]
        },
        {
          "Level": 2,
          "GoodsInfoList": [
            {
              "SNo": 1,
              "GoodsCode": "sample string 3",
              "GoodsName": "sample string 3",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 5.0,
              "GoodsPrice": 6.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 4",
              "GoodsName": "撒旦法可怕搜到空间破碎的空间是的泼妇科技时代破飞机上打破sample string 4",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 0,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 5",
              "GoodsName": "sample string 5",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 6",
              "GoodsName": "sample string 6",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 7",
              "GoodsName": "撒旦法可怕搜到空间破碎的空间是的泼妇科技时代破飞机上打破sample string 7",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 8",
              "GoodsName": "sample string 8",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            }
          ]
        },
        {
          "Level": 1,
          "GoodsInfoList": [
            {
              "SNo": 1,
              "GoodsCode": "sample string 1",
              "GoodsName": "sample string 1",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 0.01,
              "GoodsPrice": 2.0,
              "CurrQty": 0,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 2",
              "GoodsName": "sample string 2",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 3.0,
              "GoodsPrice": 4.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            }
          ]
        },
        {
          "Level": 2,
          "GoodsInfoList": [
            {
              "SNo": 1,
              "GoodsCode": "sample string 3",
              "GoodsName": "sample string 3",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 5.0,
              "GoodsPrice": 6.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 4",
              "GoodsName": "sample string 4",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 5",
              "GoodsName": "sample string 5",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 6",
              "GoodsName": "sample string 6",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 7",
              "GoodsName": "sample string 7",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            },
            {
              "SNo": 1,
              "GoodsCode": "sample string 8",
              "GoodsName": "sample string 8",
              "GoodsImg": [
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                },
                {
                  "SNo": 1,
                  "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
                }
              ],
              "GoodsDiscPrice": 4.0,
              "GoodsPrice": 5.0,
              "CurrQty": 6,
              "MaxQty": 7,
              "ShouldQty": 8
            }
          ]
        }
      ]
    }
  }
  res.end(JSON.stringify(goodsdata));
});


app.get('/youhuiquan', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var youhuiquan = {
    "Status": 200,
    "Msg": "sample string 1",
    "Data": {
      "CouponsInfoList": [
        {
          "BatchNo": "sample string 1",
          "BLGNum": "sample string 2",
          "CouponsNum": "sample string 3",
          "WechatId": "sample string 4",
          "ParValue": 5.0,
          "BalanceRequired": 6.0,
          "Limitations": "sample string 7",
          "UseDesc": "sample string 8",
          "ValidDate": "sample string 9"
        },
        {
          "BatchNo": "sample string 1",
          "BLGNum": "sample string 2",
          "CouponsNum": "sample string 3",
          "WechatId": "sample string 4",
          "ParValue": 5.0,
          "BalanceRequired": 6.0,
          "Limitations": "sample string 7",
          "UseDesc": "sample string 8",
          "ValidDate": "sample string 9"
        }
      ],
      "PageIndex": 1,
      "PageSize": 2,
      "PageCount": 3,
      "DataCount": 10
    }
  }
  res.end(JSON.stringify(youhuiquan));
});

app.get('/youhuiquanselect', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var youhuiquan = {
    "Status": 200,
    "Msg": "sample string 1",
    "Data": {
      "CouponsInfoList": [
        {
          "BatchNo": "sample string 1",
          "BLGNum": "sample string 2",
          "CouponsNum": "sample string 3",
          "WechatId": "sample string 4",
          "ParValue": 5.0,
          "BalanceRequired": 0,
          "Limitations": "sample string 7",
          "IsAvailable": true,
          "UseDesc": "sample string 9",
          "ValidDate": "sample string 10"
        },
        {
          "BatchNo": "sample string 1",
          "BLGNum": "sample string 2",
          "CouponsNum": "sample string 3",
          "WechatId": "sample string 4",
          "ParValue": 5.0,
          "BalanceRequired": 6.0,
          "Limitations": "sample string 7",
          "IsAvailable": true,
          "UseDesc": "sample string 9",
          "ValidDate": "sample string 10"
        }
      ],
      "PageIndex": 1,
      "PageSize": 2,
      "PageCount": 3,
      "DataCount": 10
    }
  }
  res.end(JSON.stringify(youhuiquan));
});

app.get('/order', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  //   var youhuiquan = {
  //   "Status": 200,
  //   "Msg": "sample string 1",
  //   "Data": {
  //     "OrderInfoList": [
  //       {
  //         "OrderCode": "sample string 1",
  //         "CreateDate": "sample string 2",
  //         "OrderGoodsList": [
  //           {
  //             "GoodsCode": "sample string 1",
  //             "GoodsName": "sample string 2",
  //             "GoodsImg": [
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               },
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               }
  //             ],
  //             "GoodsDiscPrice": 1.0,
  //             "Qty": 4
  //           },
  //           {
  //             "GoodsCode": "sample string 1",
  //             "GoodsName": "sample string 2",
  //             "GoodsImg": [
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               },
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               }
  //             ],
  //             "GoodsDiscPrice": 2.0,
  //             "Qty": 4
  //           }
  //         ],
  //         "TotalAmount": 3.0,
  //         "UseBalance": 4.0,
  //         "CouAmt": 5.0,
  //         "CouCode": "sample string 6",
  //         "ThirdAmt": 7.0,
  //         "PayState": 8
  //       },
  //       {
  //         "OrderCode": "sample string 1",
  //         "CreateDate": "sample string 2",
  //         "OrderGoodsList": [
  //           {
  //             "GoodsCode": "sample string 1",
  //             "GoodsName": "sample string 2",
  //             "GoodsImg": [
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               },
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               }
  //             ],
  //             "GoodsDiscPrice": 3.0,
  //             "Qty": 4
  //           },
  //           {
  //             "GoodsCode": "sample string 1",
  //             "GoodsName": "sample string 2",
  //             "GoodsImg": [
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               },
  //               {
  //                 "SNo": 1,
  //                 "ImgUrl":'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
  //               }
  //             ],
  //             "GoodsDiscPrice": 4.0,
  //             "Qty": 4
  //           }
  //         ],
  //         "TotalAmount": 3.0,
  //         "UseBalance": 4.0,
  //         "CouAmt": 5.0,
  //         "CouCode": "sample string 6",
  //         "ThirdAmt": 7.0,
  //         "PayState": 8
  //       }
  //     ],
  //     "PageIndex": 1,
  //     "PageSize": 2,
  //     "PageCount": 3,
  //     "DataCount": 6
  //   }
  // }
  var youhuiquan = {
    "Status": 200, "Msg": "获取我的订单列表！",
    "Data": {
      "OrderInfoList": [
        {
          "OrderCode": "Pay201710111357492017181",
          "CreateDate": "2017-10-11 13:57:49",
          "OrderGoodsList": [
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_4671.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_7892.jpg"
                }
              ],
              "GoodsPrice": 0.01,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干2",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_4673.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_7894.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干ff",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_46ff.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_78gg.jpg"
                }
              ],
              "GoodsPrice": 0.02,
              "Qty": 2
            }
          ],
          "TotalAmount": 0.01,
          "UseBalance": 0.00,
          "CouAmt": 0.00,
          "CouCode": "",
          "ThirdAmt": 0.01,
          "PayState": 1
        },
        {
          "OrderCode": "Pay201710111357492017182",
          "CreateDate": "2017-10-11 13:57:48",
          "OrderGoodsList": [
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干3",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_4675.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_7896.jpg"
                }
              ],
              "GoodsPrice": 0.03,
              "Qty": 1
            },
            {
              "GoodsCode": "A0009", "GoodsName": "威化饼干4",
              "GoodsImg": [
                {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171146_4677.jpg"
                }, {
                  "SNo": 0,
                  "ImgUrl": "A0009_20171009171150_7898.jpg"
                }
              ],
              "GoodsPrice": 0.04,
              "Qty": 2
            }
          ],
          "TotalAmount": 0.01,
          "UseBalance": 0.00,
          "CouAmt": 0.00,
          "CouCode": "",
          "ThirdAmt": 0.01,
          "PayState": 1
        }
      ],
      "PageIndex": 1,
      "PageSize": 10,
      "PageCount": 1,
      "DataCount": 10
    }
  }
  res.end(JSON.stringify(youhuiquan));
});

app.get('/orderDetail', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var youhuiquan = {
    "Status": 200,
    "Msg": "sample string 1",
    "Data": {
      "OrderCode": "sample string 1",
      "CreateDate": "sample string 2",
      "OrderGoodsList": [
        {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        },
        {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        },
        {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }, {
          "GoodsCode": "sample string 1",
          "GoodsName": "sample string 2",
          "GoodsImg": [
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            },
            {
              "SNo": 1,
              "ImgUrl": 'http://39.108.140.237:802/GoodsImages/A0007_20171009171015_8812.jpg'
            }
          ],
          "GoodsDiscPrice": 3.0,
          "Qty": 4
        }
      ],
      "TotalAmount": 3.0,
      "UseBalance": 4.0,
      "CouAmt": 5.0,
      "CouCode": "sample string 6",
      "ThirdAmt": 7.0,
      "PayState": 8
    }
  }
  res.end(JSON.stringify(youhuiquan));
});

app.get('/user', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var youhuiquan = {
    "WechatId": "sample string 1",
    "NickName": "sample string 2",
    "HeadImgUrl": "sample string 3",
    "Sex": "sample string 4"
  }
  res.end(JSON.stringify(youhuiquan));
});

app.get('/salsinflist', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  var youhuiquan = {
    "Status": 200,
    "Msg": "sample string 1",
    "Data": {
      "SalesCompanyList": [
        {
          "CompanyName": "sample string 1",
          "ContactName": "sample string 2",
          "Telphone": "sample string 3",
          "Province": "sample string 4",
          "City": "sample string 5",
          "Area": "sample string 6",
          "Address": "sample string 7",
          "QtyA": 8,
          "QtyB": 9,
          "State": 10
        },
        {
          "CompanyName": "sample string 1",
          "ContactName": "sample string 2",
          "Telphone": "sample string 3",
          "Province": "sample string 4",
          "City": "sample string 5",
          "Area": "sample string 6",
          "Address": "sample string 7",
          "QtyA": 8,
          "QtyB": 9,
          "State": 10
        }
      ],
      "PageIndex": 1,
      "PageSize": 2,
      "PageCount": 3,
      "DataCount": 4
    }
  }
  res.end(JSON.stringify(youhuiquan));
});


app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})