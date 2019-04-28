const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testingDb', { useNewUrlParser: true });

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select('name author price')
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

//run();



//Update a document of the database=======================
async function updateCourse(id) {
    const course = await Course.findById(id);
    //    if(!course) return;
    //    course.set({
    //        isPublished: true,
    //        author : 'monir shimul'
    //    });
    course.isPublished = true;
    course.author = 'shakib';
    const result = await course.save();
    console.log(result);



}

//updateCourse('5c3bf1e8c747e222603efdea');


//Another Update to the database=============================
async function anotherUpdate(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jalal'
        }
    },{ new: true });
    console.log(course);
}
anotherUpdate('5c3bf1e8c747e222603efdea');


