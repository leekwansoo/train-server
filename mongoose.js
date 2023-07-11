const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/taskapp', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connection success');
}).catch((error) => {
    console.log('connection failed', error);
})

