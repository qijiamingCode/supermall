module.exports = {
    configureWebpack:{
        resolve:{
            //97P讲过
            extensions:[],
            alias:{
                'assets':'@/assets',
                'common':'@/common ',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',

            }
        }
    }
}