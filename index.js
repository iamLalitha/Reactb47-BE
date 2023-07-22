const express= require('express');
const app=express();

//middleware
app.use(express.json());



let notes=[
    {
        id:1,
        content:'backend server using nodejs',
        important:true
    },
    {
        id:2,
        content:'backend restful using nodejs will grow complex',
        important:false
    },
    {
        id:3,
        content:'express makes backend restful painless',
        important:true
    },

]
//set the endpoints 
//set the / route
app.get('/',(request,response)=>{
    response.send('<h1>Notes Application<h1>');
});
//to get all the notes-for that we are setting an another endpoint
app.get('/api/notes',(request,response)=>{
    response.status(200).json(notes);
})
//create a new resource based on the request data
app.post('/api/notes',(request,response)=>{
    // console.log(request.body);
   notes= notes.concat(request.body);
    response.status(201).json({message:'note created successfully'})
});

//fetches a single resource based on the request data 
app.get('/api/notes/:id',(request,response)=>{
   const id=request.params.id;
   const note=notes.find(note=>note.id==id);
  if(note){
    response.status(200).json(note);
  }
  else{
    response.status(404).json({message:'id does not exists'});
  }
})

//for deleting a single resource  based on id 
app.delete('/api/notes/:id',(request,response)=>{
    //get the id 
    const id=request.params.id;
    
   const note=notes.find(note=>note.id==id);
    notes = notes.filter(note=>note.id!= id);
  if(note){
    response.status(204).json(note);
  }
  else{
    response.status(404).json({message:'id does not exists'});
  }
});

//replaces the entire note object identified by an id 
app.put('/api/notes/:id',(request,response)=>{
    const id=request.params.id;
    const noteToReplace =request.body;
    const note=notes.find(note=>note.id==id);
    notes=notes.map(note=> note.id ==id? noteToReplace: note);
   
    if(note){
        response.status(200).json({message:'note replaced'});
      }
      else{
        response.status(404).json({message:'id does not exists'});
      }
});

//for patch request
app.patch('/api/notes/:id',(request,response)=>{
    const id=request.params.id;
    const noteToReplace =request.body;
    const note=notes.find(note=>note.id==id);
    notes=notes.map(note=> note.id ==id?{...note,...noteToReplace}: note);
   
    if(note){
        response.status(200).json({message:'note patched'});
      }
      else{
        response.status(404).json({message:'id does not exists'});
      }
});

//we need to define a port to listen for request
const PORT =3001;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});