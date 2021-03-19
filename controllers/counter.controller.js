//controllers for clicks counting
//create and return functions to save and retrive click info in database

import Counter from '../models/counter.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req,res) => {
    var is_18 = false;
    var a;
    var ra;
    
    if(req.body.cat =='18+'){
        is_18 = true;
    } else if (req.body.cat =='18-'){
        is_18 = false; 
    }
    
    var click = {
        category : req.body.cat,
        is_adult : is_18,
    }
    
    try{
        Counter.create(click);
        await click.save();
        return res.status(200).json({
            message: 'Click recorded'
        }) 
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        }
    }


    const list = async (req, res) => {
        var q = {};
        try {
            var clicks = await Counter.find(q)
            return clicks
        } catch (err) {
           console.log(err);
        }
    }

    export default {
        create,
        list
       }