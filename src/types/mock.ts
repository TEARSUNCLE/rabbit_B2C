// 支付方式
export enum payType {
  '在线支付' = 1,
  '货到付款' = 2
}

// 订单状态
export enum orderStatus {
  '待付款' = 1,
  '待发货' = 2,
  '待收货' = 3,
  '待评价' = 4,
  '已完成' = 5,
  '已取消' = 6
}