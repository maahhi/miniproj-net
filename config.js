module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://172.17.3.75/test'
    },
    
    "jwt": {
        "secret": "&@$!tibadodo!$@&"
      }
}