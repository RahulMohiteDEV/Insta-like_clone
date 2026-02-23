require('dotenv').config();
const app = require('./src/app')
const connectoDB = require('./src/config/database')



connectoDB();


app.listen('3000', () => {
    console.log('server is running');
})
