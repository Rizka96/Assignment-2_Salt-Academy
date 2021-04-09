const app = require("../app");
const request = require("supertest");
const User = require("../models/User")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const jwt = require("jsonwebtoken")

const userOne = {
  _id: userOneId, 
  email: "andrew@example.com",
  password: bcrypt.hashSync("MyPass777!", 8),
  resources:{
    soldiers: 500,
  },
  token: jwt.sign({ id: userOneId }, process.env.secretKey)
}

const userTwo = {
  _id: userTwoId, 
  email: "dikimust@example.com",
  password: bcrypt.hashSync("MyPass788!", 8),
  resources:{
    soldiers: 100,
  },
  token: jwt.sign({ id: userTwoId }, process.env.secretKey)
}

beforeEach(async () => {
  await User.deleteMany();
  await User.create(userOne)
  await User.create(userTwo)
});

test("It Should Register for User", async () => {
  await request(app)
    .post("/users/register")
    .send({
      name: "Rizka",
      email: "rizka123@example.com",
      password: "rizka123",
    })
    .expect(201);
});

test("It Should Login for User", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "andrew@example.com",
      password: "MyPass777!",
    })
    .expect(200);
});

test("It Get Data User by ID", async () => {
  await request(app)
    .get(`/users/${userOne._id}`)
    .set('access_token', userOne.token)
    .send()
    .expect(200);
});

test("It Should be Update new name and email", async () => {
  await request(app)
    .put(`/users/${userOne._id}`)
    .set('access_token', userOne.token)
    .send({
      name: "userbaru32",
      email: "userbaru32@gmail.com"
    })
    .expect(200)
});

test("it Should Players can Attack Opponents", async () => {
  await request(app)
    .post(`/users/${userOne._id}/attack/${userTwoId}`)
    .set('access_token', userOne.token)
    .send({
      soldiers: 100
    })
    .expect(200);
});
