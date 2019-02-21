// 正则匹配
let Pattern = {
  isEmpty: /(^\s*)|(\s*$)/g,
  isMobile: /^1[3|4|5|6|7|8][0-9]{9}$/,
  isCnAndEn: /^[\u4E00-\u9FA5]+$/,
  isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
  isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
  isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  isAuthCode: /^[0-9]{6}$/,
  isTelAndMobile: /^(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/
}

const validator = {
  /**
   * 执行正则表达式
   * @param pattern 校验的正则表达式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  executeExp: function (pattern, strValue) {
    return pattern.test(strValue)
  },
  /**
   * 判断字符串是否为空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isEmpty: function (strValue) {
    strValue = strValue.replace(Pattern.isEmpty, '')
    return strValue.length === 0
  },
  /**
   * 判断字符串是否非空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNotEmpty: function (strValue) {
    return !this.isEmpty(strValue)
  },
  /**
   * 判断是否为中文
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEn: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEn, strValue)
  },
  /**
   * 判断是否为中英文、数字及'-'
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEnAndNum: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEnAndNum, strValue)
  },
  /**
   * 判断是否为用户名
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isUserName: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isUserName, strValue)
  },
  /**
   * 判断验证码格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isAuthCode: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isAuthCode, strValue)
  },
  /**
   * 判断是否为手机号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isMobile: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isMobile, strValue)
  },
  /**
   * 判断是否为手机或电话号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isTelAndMobile: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isTelAndMobile, strValue)
  },
  /**
   * 判断是否符合密码规则
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isPassword: function (strValue) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isPassword, strValue)
  },
  /**
   * 对象是否为空
   * @param obj 检验对象
   * @returns {boolean}
   */
  isEmptyObj: (obj) => {
    return Object.keys(obj).length === 0
  },
  /**
   * 是否在范围长度内
   * @param 范围数组 [1, 10] 长度在1-10内
   * @returns {boolean}
   */
  isLenRange: (strValue, lenArr) => {
    return strValue.length >= lenArr[0] && strValue.length <= lenArr[1]
  },
  /**
   * 是否在数值范围内
   * @param 范围数组 [1, 10] 数值在1-10内
   * @returns {boolean}
   */
  isNumRange: (numValue, numArr) => {
    return numValue >= numArr[0] && numValue <= numArr[1]
  }

}

// 微信加载框
function showLoading (title) {
  wx.showLoading({
    title
  })
}

// 微信浮层
function showToast (title, icon = 'success') {
  wx.showToast({
    title,
    icon,
    duration: 2000,
    mask: true
  })
}

// 微信弹窗
function showModal (title, content,CallBack) {
  wx.showModal({
    title,
    content,
    showCancel: CallBack?true:false,
    success:CallBack||(()=>{})
  })
}
/**
 * 检查授权
 * @param {*} scope  https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 */
const scopeMsg = {
  'scope.userInfo':'用户信息',
  'scope.userLocation':'地理位置',
  'scope.address':'通讯地址',
  'scope.invoiceTitle':'发票抬头',
  'scope.record':'微信运动步数',
  'scope.record':'录音功能',
  'scope.writePhotosAlbum':'保存到相册',
  'scope.camera':'摄像头',
}
// 微信检查权限
function checkAuthorize(scope,CallBack=()=>{},errCallBack=()=>{}){
  wx.getSetting({
    success (res) {
        if (res.authSetting[scope]) {
          //用户已授权
          CallBack();
        }else{
          //用户还未授权过
          if(wx.canIUse('button.open-type.getUserInfo')&&scope=='scope.userInfo'){
            errCallBack();
            return;
          }
          wx.authorize({
            scope: scope,
            success () {
              console.log(arguments)
              CallBack();
            },
            fail(){
              wx.showModal({
                content: '您拒绝了授权'+scopeMsg[scope]+'，这会影响后续操作请您设置授权',
                showCancel: false,
                success: function (res) {
                  wx.openSetting({
                    success (res) {
                      if (res.authSetting[scope]) {
                        //用户已授权
                        if(CallBack){
                          CallBack();
                        }
                      }else{
                        errCallBack();
                      }
                    }
                  })
                }
              });
            }
          })
          
        }
      }
    })
};
export default {
  validator,
  showLoading,
  showToast,
  showModal,
  checkAuthorize
}
