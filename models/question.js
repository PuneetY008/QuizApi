const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    description:String,
    alternatives:[
        {
            text:{
                type:String,
                required: true
            },
            isCorrect:{
                type: Boolean,
                required:true,
                default: false
            }
        }
    ],
    creator:{
        type:String,
        default:"Owner"
    }
})

const Question = mongoose.model('Question',questionSchema);

//exporting the nodel

module.exports = Question;
