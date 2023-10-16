const mongoose=require('mongoose')

const budgetSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    related_value:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true,
        trim:true,
        validate: {
            validator: function (v) {
                return /^#[0-9A-Fa-f]{6}$/g.test(v);
            },
            message: (props) => `${props.value} is not a valid color code!`,
        },
    }
}, {collection:'myBudget'})

module.exports=mongoose.model('myBudget',budgetSchema)