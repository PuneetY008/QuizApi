const mongoose = require('mongoose');
const Question = require('./models/question');

mongoose.connect('mongodb://localhost:27017/quizApp',{useNewUrlParser:true})
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log('Oh no mongo connection error!!');
        console.log(err);
    })

/* const q = new Question({
    description: 'What is 1+1?',
    alternatives:[{text:'2',isCorrect:true},{text:'3',isCorrect:false},{text:'4',isCorrect:false},{text:'5',isCorrect:false}]
})

q.save().then((p)=>{
    console.log(p);
})
.catch((err)=>{
    console.log(err)
}) */

const seedQuestions = [
    {
        description: 'Who is the CEO of KaptureCrm?',
        alternatives:[{text:'Vikas Garg',isCorrect:false},{text:'Sheshgiri Kamath',isCorrect:true},{text:'Pearl Tewari',isCorrect:false},{text:'Sherman D`souza',isCorrect:false}],
        creator:"Puneet"
    },
    {
        description: 'When was Kapture Crm founded?',
        alternatives:[{text:'2011',isCorrect:true},{text:'2020',isCorrect:false},{text:'1968',isCorrect:false},{text:'2009',isCorrect:false}],
        creator:"Creator of the Heaven"
    },
    {
        description: 'Who is the biggest client of Kapture?',
        alternatives:[{text:'swiggy',isCorrect:false},{text:'Big Basket',isCorrect:true},{text:'duroflex',isCorrect:false},{text:'TATA',isCorrect:false}],
        creator:"Creator of the Earth"
    },
    {
        description: 'What is customer support head?',
        alternatives:[{text:'Vikas Garg',isCorrect:false},{text:'Sheshgiri Kamath',isCorrect:false},{text:'Soujanya Prabhu',isCorrect:true},{text:'Pearl Tewari',isCorrect:false}],
        creator:"Creator of Hell"
    },
    {
        description: 'Who is the CTO of Kapture?',
        alternatives:[{text:'Pearl Tewari',isCorrect:false},{text:'Sheshgiri Kamath',isCorrect:false},{text:'Soujanya Prabhu',isCorrect:false},{text:'Vikas Garg',isCorrect:true}],
        creator:"Creator of the Universe"
    }
]

Question.deleteMany({})
    .then((d)=>{
        console.log("Deletion Successful");
        console.log(d);
    })
    .catch((e)=>{
        console.log("Oh no, Deletion Error");
        console.log(e);
    })

Question.insertMany(seedQuestions)
    .then((data)=>{
        console.log("Newly inserted data---");
        console.log(data);
    })
    .catch((e)=>{
        console.log(e);
    })