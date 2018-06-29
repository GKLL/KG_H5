let env = 'dev'
//后端api接口环境配置
let config = {
	dev: 'https://dev.kg.com',
	test: 'https://test.kg.com',
	prod: 'https://www.kg.com'
}
export default {
	host: config[env]
}
