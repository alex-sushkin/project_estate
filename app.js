const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://User:1234@cluster0.zvn2j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require("express");
//const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;
// let apartmentsCollection;

const users = [{
    login: 'admin',
    password: '1234',
    admin: true
},{
    login: 'user',
    password: '0000',
    admin: false
},
{
    login: 'kirill',
    password: '1488',
    admin: false
} ]

app.use(express.static(__dirname + "/public"));
 client.connect(err => {
     if(err) return console.log(err);
  //
  dbClient = client;
   const apartmentCollection = client.db("realState").collection("apartments");
   const clientsCollection = client.db("realState").collection("clients");
   const housesCollection = client.db("realState").collection("houses");
   app.listen(8080, function(){
       console.log("Сервер ожидает подключения...");  
       });
      


  //

  // perform actions on the collection object

// client.connect(function(err, client){

//     if(err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db("realState")
//         app.listen(8080, function(){
//         console.log("Сервер ожидает подключения...");  
//     });
// });
app.post("/api/auth", async (req, res, next) => {
	try {
		const { login, password } = req.body || {}
	
		if (!login || !password) return res.status(404).send({ status: 'login or password are missing', error: true })
		const user = users.find(el => el.login === login && el.password === password)
        console.log(user)
		if (!user) return res.status(404).send({ status: `invalide login or password`, error: true })

		res.status(200).json(user)
	} catch (e) {
		console.error(e)
		next()
	}
})



 app.get("/api/apartments", function(req, res){
        //const collection = req.app.locals.collection.collection("apartments");
    apartmentCollection.find({}).toArray(function(err, apartments){
         
        if(err) return console.log(err);
        res.send(apartments)
    });
     
});
 app.get("/api/houses", function(req, res){
        //const collection = req.app.locals.collection.collection("houses");
    housesCollection.find({}).toArray(function(err, houses){
         
        if(err) return console.log(err);
        res.send(houses)
    });
     
});
 app.get("/api/clients", function(req, res){
      //  const collection = req.app.locals.collection.collection("clients");
    clientsCollection.find({}).toArray(function(err, clients){
         
        if(err) return console.log(err);
        res.send(clients)
    });
     
});


app.get("/api/apartments/:id", function(req, res){

    const id = new objectId(req.params.id);
    //const collection = req.app.locals.collection.collection("apartments");
    apartmentCollection.findOne({_id: id}, function(err, apartment){
               
        if(err) return console.log(err);
        res.send(apartment);
    });
});

app.get("/api/houses/:id", function(req, res){

    const id = new objectId(req.params.id);
    //const collection = req.app.locals.collection.collection("houses");
    housesCollection.findOne({_id: id}, function(err, house){
               
        if(err) return console.log(err);
        res.send(house);
    });
});

app.get("/api/clients/:id", function(req, res){

    const id = new objectId(req.params.id);
    //const collection = req.app.locals.collection.collection("clients");
    clientsCollection.findOne({_id: id}, function(err, client){
               
        if(err) return console.log(err);
        res.send(client);
    });
});

app.post("/api/apartments", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
    //const collection = req.app.locals.collection.collection("apartments");
    const apartmentsAdress = req.body.adress;
    const apartmentsAppearData = req.body.appearData;
    const apartmentsCost = req.body.Cost;
    const apartment = {adress: apartmentsAdress, appearData: apartmentsAppearData, Cost: apartmentsCost};
    apartmentCollection.insertOne(apartment, function(err, result){
               
        if(err) return console.log(err);
        res.send(apartment);
    });
});
app.post("/api/houses", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
    //const collection = req.app.locals.collection.collection("houses");
    const housesAdress = req.body.adress;
    const housesTime = req.body.time;
    const housesCost = req.body.Cost;
    const house = {adress: housesAdress, time: housesTime, Cost: housesCost};
    housesCollection.insertOne(house, function(err, result){
               
        if(err) return console.log(err);
        res.send(house);
    });
});
app.post("/api/clients", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
   // const collection = req.app.locals.collection.collection("clients");
    const clientsFio = req.body.Fio;
    const clientsPassport = req.body.passport;
    const clientsAge = req.body.age;
    const clientsPhoneNumber = req.body.phoneNumber;
    const client = {Fio: clientsFio, passport: clientsPassport, age: clientsAge,phoneNumber: clientsPhoneNumber};
    clientsCollection.insertOne(client, function(err, result){
               
        if(err) return console.log(err);
        res.send(client);
    });

});


app.delete("/api/houses/:id", function (req, res) {

     const id = new objectId(req.params.id);
     //const collection = req.app.locals.collection.collection("houses");
     housesCollection.findOneAndDelete({ _id: id }, function (err, result) {

         if (err) return console.log(err);
         let house = result.value;
         res.send(house);
     });
     });
app.delete("/api/apartments/:id", function (req, res) {

     const id = new objectId(req.params.id);
     //const collection = req.app.locals.collection.collection("apartments");
     apartmentCollection.findOneAndDelete({ _id: id }, function (err, result) {

         if (err) return console.log(err);
         let apartment = result.value;
         res.send(apartment);
     });
     });
     app.delete("/api/clients/:id", function (req, res) {

     const id = new objectId(req.params.id);
     //const collection = req.app.locals.collection.collection("clients");
     clientsCollection.findOneAndDelete({ _id: id }, function (err, result) {

         if (err) return console.log(err);
         let client = result.value;
         res.send(client);
     });
     });



app.put("/api/apartments", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const apartmentsAdress = req.body.adress;
    const apartmentsAppearData = req.body.appearData;
    const apartmentsCost = req.body.Cost;
    //const collection = req.app.locals.collection.collection("apartments");
    apartmentCollection.findOneAndUpdate({ _id: id }, { $set: {adress: apartmentsAdress, appearData: apartmentsAppearData, Cost: apartmentsCost} },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const apartment = result.value;
            res.send(apartment);
        });
});
app.put("/api/houses", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const housesAdress = req.body.adress;
    const housesTime = req.body.time;
    const housesCost = req.body.Cost;
    //const collection = req.app.locals.collection.collection("houses");
    housesCollection.findOneAndUpdate({ _id: id }, { $set: {adress: housesAdress, time: housesTime, Cost: housesCost} },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const house = result.value;
            res.send(house);
        });
});
app.put("/api/clients", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const clientsFio = req.body.Fio;
    const clientsPassport = req.body.passport;
    const clientsAge = req.body.age;
    const clientsPhoneNumber = req.body.phoneNumber;
    //const collection = req.app.locals.collection.collection("clients");
    clientsCollection.findOneAndUpdate({ _id: id }, { $set: {Fio: clientsFio, passport: clientsPassport, age: clientsAge,phoneNumber: clientsPhoneNumber} },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const client = result.value;
            res.send(client);
        });
});
});


  process.on("SIGINT", () => {
client.close();
    process.exit();
});

//
/*
const express = require("express");
 
const app = express();


app.use(express.static(__dirname + "/public"));
 
app.use("/", function(request, response){
     
    response.send("<h1>Главная страница</h1>");
});
 
app.listen(3000);
mongoClient.connect(function (err, client) { //Происходит подключение и сервер начинает работать

if (err) return console.log(err);

dbClient = client;

app.locals.collection = client.db("realState");

app.listen(8080, function () {

console.log("Сервер работает.");

});

});

process.on("SIGINT", () => { //Происходит при выключении сервера (Ctrl+C)

dbClient.close();

process.exit();

})*/