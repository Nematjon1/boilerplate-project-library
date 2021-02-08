/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { ObjectID } = require('mongodb');

const filterer = (arr, obj) => {
    arr.filter(a => !!a[1]).map(a => obj[a[0]] = a[1])
}

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    
          const collection = myDataBase.collection("books");

          collection.find({}).toArray((err, data) => {
              if(err) {
                  return res.json({"error": "Server error, please try later"})
              } else if(!!data) {
                  return res.status(200).json(data);
              }
          });
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
    
        if(!title) {
            return res.send("missing required field title");
        } else {
            const collection = myDataBase.collection("books");

            collection.insertOne({
                "title":title,
                "commentcount":0,
                "__v":1,
                "comments":[]
            }, (err, data) => {
                if(err) {
                    return res.json({"error": "Server error, please try later"})
                } else if(data) {
                    return res.status(200).json(data.ops[0]);
                }
            });
        }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
