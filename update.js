const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-import', { useNewUrlParser: true })

.then(async function(){
    console.log("connected to db");

    const courseSchema = mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: Date,
        isPublished: Boolean,
        price: Number
    }, {strict: false});

    const courseModel = mongoose.model('course', courseSchema);
    var _id = mongoose.Types.ObjectId('5c3c2acf7bc686194276eb1f');
    console.log(_id);

    courseModel.findOne({_id:'5c3c2acf7bc686194276eb1f'}, function(err, res){
        console.log(err);
        console.log(res);
    });
    let res = await courseModel.findOneAndUpdate({_id : _id}, {name: 'nahid'});
    //let res = await courseModel.findOneAndUpdate({name: 'Angular'}, {author: 'nahid'});
    console.log(res);

}).catch((err) => {
    console.log(err);
});


