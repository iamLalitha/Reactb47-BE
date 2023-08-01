require('dotenv').config();
const express= require('express');
const app=express();
const cors=require('cors');
const mongoose = require('mongoose');

//middleware
app.use(cors());
app.use(express.json());

const url =process.env.ATLAS_URI;

mongoose.connect(url)
.then(()=>{
    console.log('connected to MongoDB');
})
.catch((err)=>{
    console.error(err);
});

//save a note in the db
//define a schema
const noteSchema =new mongoose.Schema({
    content: String,
    important: Boolean
});

//create a model 
const Note= mongoose.model("Note", noteSchema); //collection name:notes 

//set the endpoints 
//set the / route
app.get('/api/notes',(request,response)=>{
   Note.find({},{})
   .then(notes=>{
    response.status(200).json(notes);
   })
});

//create a new resource based on the request data
app.post('/api/notes',(request, response)=>{
  //prepare an object to store it in it 
  const note= new Note(Request.body);
  note.save()
  .then(()=>{
    response.status(201).json({message:'note created successfully'});
  });
});

//fetches a single resource based on the request data 
app.get('/api/notes/:id',(request,response)=>{
   const id=request.params.id;
  Note.findById(id)
    .then(note=>{
      if(note){
        response.status(200).json(note);
      }else{
        response.status(404).json({message:'id does not exists'});
      }
    })
});

//for deleting a single resource  based on id 
app.delete('/api/notes/:id',(request,response)=>{
    //get the id 
    const id=request.params.id;
    Note.findByIdAndDelete(id)
      .then((deleteNote)=>{
        if(deleteNote){
          response.status(200).json({message:'note deleted successfully'});
        } else{
          response.status(404).json({message:'id does not exist'});
        }
      });
});

//replaces the entire note object identified by an id 
app.put('/api/notes/:id',(request,response)=>{
    const id=request.params.id;
    const noteToReplace =request.body;
    
    Note.findByIdAndUpdate(id,noteToReplace)
    .then((updatedNote)=>{
      if(updatedNote){
        response.status(200).json({message:'note updated successfully'});
      } else{
        response.status(404).json({message:'id does not exist'});
      }
    });
});

//for patch request
app.patch('/api/notes/:id',(request,response)=>{
    const id=request.params.id;
    const noteToReplace =request.body;
    
    Note.findByIdAndUpdate(id,noteToReplace)
    .then((updatedNote)=>{
      if(updatedNote){
        response.status(200).json({message:'note updated successfully'});
      } else{
        response.status(404).json({message:'id does not exist'});
      }
    });
});

//we need to define a port to listen for request
const PORT =3001;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});