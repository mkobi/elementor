import bodyParser from "body-parser";
import express from "express";

export async function runServer(port: number) {
  const app = express();
  app.use(bodyParser.json());
  const router = express.Router();

  router.route("/test").post((req, res) => {
    const { body } = req;
    console.log("body: ", body);
    return res.send({ success: true });
  });

  app.use("/", router);
  app.listen(port, () => {
    console.log(`Server listener is up on port ${port}`);
  });
}
