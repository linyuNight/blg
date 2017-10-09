var express = require('express')
var compression = require('compression')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

app.get('/goods', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
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
            "GoodsName": "sample string 1",
            "GoodsImg": [
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 4.0,
            "CurrQty": 6,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
            "GoodsDiscPrice": 5.0,
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
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
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
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
      },
      {
        "BatchNo": "sample string 1",
        "BLGNum": "sample string 2",
        "CouponsNum": "sample string 3",
        "WechatId": "sample string 4",
        "ParValue": 7.0,
        "BalanceRequired": 8.0,
        "Limitations": "sample string 7",
        "ValidDate": "sample string 8"
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

app.get('/order', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  var youhuiquan = {
  "Status": 200,
  "Msg": "sample string 1",
  "Data": {
    "OrderInfoList": [
      {
        "OrderCode": "sample string 1",
        "CreateDate": "sample string 2",
        "OrderGoodsList": [
          {
            "GoodsCode": "sample string 1",
            "GoodsName": "sample string 2",
            "GoodsImg": [
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 1.0,
            "Qty": 4
          },
          {
            "GoodsCode": "sample string 1",
            "GoodsName": "sample string 2",
            "GoodsImg": [
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 2.0,
            "Qty": 4
          }
        ],
        "TotalAmount": 3.0,
        "UseBalance": 4.0,
        "CouAmt": 5.0,
        "CouCode": "sample string 6",
        "ThirdAmt": 7.0,
        "PayState": 8
      },
      {
        "OrderCode": "sample string 1",
        "CreateDate": "sample string 2",
        "OrderGoodsList": [
          {
            "GoodsCode": "sample string 1",
            "GoodsName": "sample string 2",
            "GoodsImg": [
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 3.0,
            "Qty": 4
          },
          {
            "GoodsCode": "sample string 1",
            "GoodsName": "sample string 2",
            "GoodsImg": [
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              },
              {
                "SNo": 1,
                "ImgUrl": "sample string 2"
              }
            ],
            "GoodsPrice": 4.0,
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
    ],
    "PageIndex": 1,
    "PageSize": 2,
    "PageCount": 3,
    "DataCount": 4
  }
}
   res.end(JSON.stringify(youhuiquan));
});

app.get('/orderDetail', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
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
            "ImgUrl": "sample string 2"
          },
          {
            "SNo": 1,
            "ImgUrl": "sample string 2"
          }
        ],
        "GoodsPrice": 3.0,
        "Qty": 4
      },
      {
        "GoodsCode": "sample string 1",
        "GoodsName": "sample string 2",
        "GoodsImg": [
          {
            "SNo": 1,
            "ImgUrl": "sample string 2"
          },
          {
            "SNo": 1,
            "ImgUrl": "sample string 2"
          }
        ],
        "GoodsPrice": 3.0,
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
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  var youhuiquan = {
    "WechatId": "sample string 1",
    "NickName": "sample string 2",
    "HeadImgUrl": "sample string 3",
    "Sex": "sample string 4"
  }
   res.end(JSON.stringify(youhuiquan));
});


apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^\(\)]+})\)$/
      var matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

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