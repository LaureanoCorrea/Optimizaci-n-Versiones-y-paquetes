import { Router } from "express";
import sendEmail from "../utils/sendEmail.js";
import sendSms from "../utils/sendSMS.js";
import { faker } from "@faker-js/faker";
import compression from "express-compression";
import { FactorContextImpl } from "twilio/lib/rest/verify/v2/service/entity/factor.js";

const router = Router();
router.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

router.get("/stringlargo", (req, res) => {
  let string = "hola, esto es un string largo";
  for (let i = 0; i < 5e4; i++) {
    string += "hola, esto es un string largo";
  }

  res.send(string);
});

// router.get("/mockingproducts", (req, res) => {
//   let fakerProducts = [];
//   for (let i = 0; i < 100; i++) {
//     fakerProducts.push({
//       id: faker.database.mongodbObjectId(),
//       title: faker.commerce.productName(),
//       description: faker.lorem.sentences(2),
//       price: faker.commerce.price(),
//       thumbnail: faker.image.url(),
//       code: faker.string.alpha(6),
//       stock: faker.number.int({ min: 0, max: 100 }),
//       status: faker.datatype.boolean(),
//       category: faker.commerce.department(),
//     });
//   }
//   res.setHeader('Content-Type', 'application/json'); // Configurar el tipo de contenido como JSON
//   res.send(JSON.stringify({status: "ok",payload: fakerProducts,}, null, 2, '\t'));
// });

// const generateProducts = () => {
//   return {
//     title: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     department: faker.commerce.department(),
//     stock : parseInt(faker.string.numeric()),
//     description : faker.commerce.productDescription(),
//     id: faker.database.mongodbObjectId(),
//     thumbnail: faker.image.url(),
//   };
// }
// const generateUser = () => {
//   let numberOfProducts = parseInt(faker.string.numeric(1, {bannedDigits: ["0"]}));
//   let cart = [];

//   for (let index = 0; index < numberOfProducts; index++) {
//     cart.push(generateProducts())

//   }

//   return {
//     id: faker.database.mongodbObjectId(),
//     first_name: faker.person.firstName(),
//     last_name: faker.person.lastName(),
//     Sex: faker.person.sex(),
//     birtDay: faker.date.birthdate(),
//     phone: faker.phone.number(),
//     Image: faker.image.avatar(),
//     email: faker.internet.email(),
//     cart
//   };
// };

// router.get("/users", (req, res) => {
//   let users = [];
//   for (let i = 0; i < 100; i++) {
//     users.push(generateUser());
//   }
//   res.send({
//     status: "",
//     payload: users,
//   });
// });

// router.get("/mail", async (req, res) => {
//   try {
//     const destinatario = "laureano105@gmail.com";
//     const subject = "Hello ✔";
//     const html = "<div><h1>Hello world?</h1></div>";
//     await sendEmail(destinatario, subject, html);
//   } catch (error) {
//     console.log(error);
//   }
//   res.send("mail enviado");
// });

// router.get("/sms", (rep, res) => {
//   sendSms("laureano", "correa");

//   res.send("sms enviado");
// });

// //sessions---------------------------------------
// router.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`ud ya visito el sitio ${req.session.counter} veces`);
//   } else {
//     req.session.counter = 1;
//     res.send("Bienvenido");
//   }
// });

// //cookies----------------------------------
// router.get('/setcookie', (req, res) => {rs

//     res.cookie('myCookie', 'hello world');
//     res.send('Cookie set');
//   });

// router.get("/setcookieSigned", (req, res) => {
//   res
//     .cookie("coder cookie", "esta es una cookie firmada", {
//       maxAge: 10000,
//       signed: true,
//     })
//     .send("cookeando");
// });

// router.get('/getcookie', (req, res) => {
//   res.send(req.cookies);
// });

// router.get("deleteCookie", (req, res) => {
//   res.clearCookie("coder cookie").send("borrando cookie");
// });

export default router;
