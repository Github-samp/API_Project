const books=[
    {
        ISBN:"1234Book",
        title:"Tesla",
        publiDate:'2023-08-03',
        language:"en",
        numPage:230,
        author:[1,2],
        publication:[1],
        category:['tech','space','education']
    }
]

const author=[
    {
        id:1,
        name:"Roopa",
        books:["1234Book","secretBook"]
    },
    {
        id:2,
        name:"Elon Mask",
        books:["1234Book"]
    }
]

const publication=[
    {
        id:1,
        name:"writex",
        books:["1234Book"]
    },
    {
        id:2,
        name:"writex2",
        books:[]
    }
]
module.exports={
    books, author, publication
}