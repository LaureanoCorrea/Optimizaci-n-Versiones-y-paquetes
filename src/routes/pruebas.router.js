import { Router } from "express";

const router = Router();

//sessions---------------------------------------
router.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`ud ya visito el sitio ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});



//cookies----------------------------------
router.get('/setcookie', (req, res) => {
    res.cookie('myCookie', 'hello world');
    res.send('Cookie set');
  });

router.get("/setcookieSigned", (req, res) => {
  res
    .cookie("coder cookie", "esta es una cookie firmada", {
      maxAge: 10000,
      signed: true,
    })
    .send("cookeando");
});

router.get('/getcookie', (req, res) => {
  res.send(req.cookies);
});

router.get("deleteCookie", (req, res) => {
  res.clearCookie("coder cookie").send("borrando cookie");
});

export default router;
