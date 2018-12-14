module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://zzgooloo:taabetaa@194.225.229.204/test'
    },
    "jwt": {
        "secret": "&@$!tibadodo!$@&"
      }
}