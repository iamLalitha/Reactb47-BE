const express= require('express');
const app=express();
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
app.get('/',(request,response)=>{
    response.send('Hello World');
});
//we need to define a port to listen for request
const PORT =3001;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});