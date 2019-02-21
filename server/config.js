const CONF = {
    serverHost: 'localhost',
    port: '5757',
    rootPathname: '',

    tunnelServerUrl: '',
    tunnelSignatureKey: '',
    // 腾讯云相关配置
    qcloudAppId: 1258044715,
    qcloudSecretId: 'AKIDVo12sXxVpyxkXCR1B9wXwEKJ6h6J2CsM',
    qcloudSecretKey: 'SmOuFPNBnDTYRCm9MPIzVpywrb9ZKvKX',
    // 微信小程序 App ID
    appId: 'wx5916ab61197a06e5',

    // 微信小程序 App Secret
    appSecret: '8506c70bf4cb0d9e66d674311a6ffb90',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'lblp82nlf',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
