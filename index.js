const express =require("express")

var bodyparser=require("body-parser")
// database
const database= require("./Database");
const { get } = require("https");
//initializing
const booky= express();
booky.use(bodyparser.urlencoded({extended:true}))
booky.use(bodyparser.json());

//BOOKS
// Route                  /
// description           get all the books
// access                public access
// parameter              none
// methods                get

booky.get('/',(req, res)=>{
    return res.json({books: database.books})
})

// Route                 /is
// description           get specific the books
// access                public access
// parameter             ISBN
// methods               get

booky.get("/is/:isbn",(req,res)=>{
  const getSpecificBook=database.books.filter((book)=>
  book.ISBN===req.params.isbn

  )

  if(getSpecificBook.length===0){
    return res.json({error:`no book found for the isbn of ${req.params.isbn}`})
  }
  return  res.json({book:getSpecificBook})
})

// Route                 /c
// description           get specific books on category
// access                public access
// parameter             category
// methods               get


booky.get('/c/:category', (req, res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.category.includes(req.params.category)
    )
    if(getSpecificBook.length===0){
        return res.json({error:`no book found for the isbn of ${req.params.category}`})
    }
    return res.json({book:getSpecificBook});
})

// Route                 /l
// description           get specific books on language
// access                public access
// parameter             language
// methods               get
  

booky.get(("/l/:language"),(req, res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.language.includes(req.params.language)

    )
    if(getSpecificBook.length===0){
        return res.json({error:`no book found for the language od ${req.params.language}`})
    }
    return res.json({book:getSpecificBook})
})

//Authors

// Route                 /authors
// description           get all the authors
// access                public access
// parameter             none
// methods               get
  
booky.get('/author',(req,res)=>{
    return res.json({authors:database.author})
})

// Route                 /authors/book
// description            get an specific authors
// access                public access
// parameter             isbn
// methods               get

booky.get("/author/book/:name",(req, res)=>{
    const getSpecificAuthor= database.author.filter(
        (author)=>author.books.includes(req.params.name)
    )
    if(getSpecificAuthor.length===0){
        return res.json({error:`no author found for the name of ${req.params.name}`})

    }
    return res.json({author:getSpecificAuthor})
})

// Route                 /authors/book
// description           get all the authors based on books
// access                public access
// parameter             isbn
// methods               get
  
booky.get('/author/book/:isbn',(req,res)=>{
    const getSpecificAuthor=database.author.filter(
        (author)=>author.books.includes(req.params.isbn)
    )
    if(getSpecificAuthor.length===0){
        return res.json({error:`no author found for the book for ${req.params.isbn}`})
    }
    return res.json({author:getSpecificAuthor})
})


//Publications

// Route                 /publication
// description           get all the publication
// access                public access
// parameter            none
// methods               get

booky.get("/publication",(req, res)=>{
    return res.json({publication:database.publication})
})

// Route                 /publication/book
// description           get a list of publication based on the book.
// access                public access
// parameter             isbn
// methods               get

booky.get("/publication/book/:isbn",(req,res)=>{
     const getSpecificPublication=database.publication.filter(
        (publication)=>publication.books.includes(req.params.isbn)
     )
     if(getSpecificPublication.length===0){
        return res.json({error:`no publication  found for the book for ${req.params.isbn}`})
     }
     return res.json({publication:getSpecificPublication})
})


// Route                 /publication/book
// description           get a list of publication based on the book.
// access                public access
// parameter             name
// methods               get



booky.get("/publication/book/:name",(req, res)=>{
    const getSpecificPublication= database.publicaiton.filter(
        (publication)=>publication.books.includes(req.params.name)
    )
    if(getSpecificPublication.length===0){
        return res.json({error:`no publication found for the name of ${req.params.name}`})

    }
    return res.json({publication:getSpecificPublication})
})

//new book
// Route                 /book/new
// description           add new book
// access                public access
// parameter            none
// methods              post

booky.post("/book/new",(req,res)=>{
    const newBook=req.body;
    database.books.push(newBook);
    return res.json({updatedBooks:database.books});
})

//new author
// Route                 /authors/new
// description           add new authors
// access                public access
// parameter            none
// methods              post

booky.post("/author/new",(req,res)=>{
    const newAuthor=req.body;
    database.author.push(newAuthor);
    return res.json(database.author);
})


//new author
// Route                 /authors/new
// description           add new authors
// access                public access
// parameter            none
// methods              post


booky.post("/publication/new",(req, res)=>{
    const newPublication=req.body;
    database.publication.push(newPublication)
    return res.json(database.publication)
})

//new author
// Route                 /publication/update/book
// description           update/ add new publication
// access                public access
// parameter            none
// methods              put
booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubId)
        {
            return pub.books.push(req.params.isbn)
        }
    })
    // update the boook database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=req.body.pubId;
            return;
        }
    })
    return res.json({
        books:database.books,
        publication:database.publication,
        message:"successfully updated publication"
    })
})


// Route                 /book/delete/
// description          delete the book  
// access                public access
// parameter            isbn
// methods               delete

booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase=database.books.filter((book)=>
        book.ISBN!=req.params.isbn

    )
    database.books=updatedBookDatabase;
    return res.json({books:database.books})
}) 

// Route                 /book/delete/
// description           delete the book  
// access                public access
// parameter             isbn , authorid
// methods               delete


booky.delete("/book/delete/author/:isbn/:authorId",(req, res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList= book.author.filter(
                (eachAuthor)=>eachAuthor!==parseInt(req.params.authorId)
            )
            book.author = newAuthorList
            return;
        }
    })


database.author.forEach((eachAuthor)=>{
    if(eachAuthor.id=== parseInt(req.params.authorId)){
        const newBookList= eachAuthor.books.filter(
            (book)=>book!== req.params.isbn
        )
        eachAuthor.books = newBookList;
        return;
    }
    return res.json({
        book:database.books,
        author:database.author,
        message:"author was deleted!!!"

})
})

})
// Route                 /book/delete/
// description           delete the book  
// access                public access
// parameter             isbn , authorid
// methods               delete



booky.listen(3003,((req,res)=>{
console.log("you are logined in api server")
}))