//simple web server 
//here http is a built-in module 
const http =require('http');
//createserver will create a server and store it in app
//we need to pass 2 arguments in createserver , they are request and response

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


const app=http.createServer((request,response)=>{
    // response.writeHead(200,{'Content-Type':'text/plain'});//if we want html then we can add 'text/html' in content type
    // response.end('Hello world');
   
    response.writeHead(200,{'Content-Type':'application/json'});
    response.end(JSON.stringify(notes));
});

//we need to define a port to listen for request
const PORT =3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);