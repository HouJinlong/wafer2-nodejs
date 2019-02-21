// API
const host = "http://192.168.199.128:5757";
// const host = "https://f3dv3nys.qcloud.la";
const API = {
  // 公共服务
  host,
  // 登录地址，用于建立会话
  loginUrl: `${host}/weapp/login`,
  // 测试的请求地址，用于测试会话
  requestUrl: `${host}/weapp/user`,
  // 测试的信道服务地址
  tunnelUrl: `${host}/weapp/tunnel`,

  // 上传图片接口
  uploadUrl: `${host}/weapp/upload`,

  addbook: `${host}/weapp/addbook`,

  getbooklist:`${host}/weapp/getbooklist`,
  getbooktops:`${host}/weapp/getbooktops`,
  getbookdetails:`${host}/weapp/getbookdetails`,

  addcomment:`${host}/weapp/addcomment`,
  getcommentlist:`${host}/weapp/getcommentlist`,
  demo:`${host}/weapp/demo`
}

export default API
