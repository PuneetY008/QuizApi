const express = require('express');
const app = express(); 
const path = require('path');
const mongoose = require('mongoose');
const Question = require('./models/question');
const methodOverride = require('method-override');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.listen(3000,()=>{
    console.log('Serving on port 3000!!');
});

mongoose.connect('mongodb://localhost:27017/quizApp',{useNewUrlParser:true})
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log('Oh no mongo connection error!!');
        console.log(err);
    })

//*******index route
app.get('/',(req,res)=>{
    res.render('questions/main');
});

app.get('/questions',async (req,res)=>{
    let questions = await Question.find({});
    res.render('questions/index',{questions});
});

//*****create route
app.get('/questions/new',(req,res)=>{
    res.render('questions/new');
});

app.post('/questions',async (req,res)=>{
    allData = req.body;
    let newQuestion = new Question(makeQuestion(allData));
    //console.log(newQuestion);
    await newQuestion.save();
    res.redirect(`/questions/${newQuestion._id}`);
});

//*******Details Route
app.get('/questions/:id',async (req,res)=>{
    let {id} = req.params;
    let foundQuestion = await Question.findById(id);
    res.render('questions/show', {foundQuestion});
});

//******Update Route */
app.get('/questions/:id/edit',async (req,res)=>{
    let {id} = req.params;
    let foundQuestion = await Question.findById(id);
    res.render('questions/edit',{foundQuestion});
});

app.put('/questions/:id',async (req,res)=>{
    let {id} = req.params;
    allData = req.body;
    let updateDetails = makeQuestion(allData);
    let updatedQuestion = await Question.findByIdAndUpdate(id,updateDetails,{runValidators:true, new:true});
    console.log(updatedQuestion);
    res.redirect(`/questions/${updatedQuestion._id}`);
});

//*******Delete Route */
app.delete('/questions/:id',async (req,res)=>{
    let {id} = req.params;
    let deletedQuestion = await Question.findByIdAndDelete(id);
    res.redirect('/questions');
});

//*****make question function */
function makeQuestion(allData){
    let madeQuestion = {description:`${allData.ques}?`,alternatives:[{text:allData.opt1,isCorrect:false},{text:allData.opt2,isCorrect:false},{text:allData.opt3,isCorrect:false},{text:allData.opt4,isCorrect:false}],creator:allData.name};
    switch(allData.correct){
        case 'opt1': madeQuestion.alternatives[0].isCorrect = true
                    break;
        case 'opt2': madeQuestion.alternatives[1].isCorrect = true
                    break;
        case 'opt3': madeQuestion.alternatives[2].isCorrect = true
                    break;
        case 'opt4': madeQuestion.alternatives[3].isCorrect = true
                    break;
    }
    return madeQuestion;
}