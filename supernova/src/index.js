import ngrok from 'ngrok';
import shell from 'shelljs';
import express from 'express';
import { scanComponent } from './handleMd';

const app = express();

app.get('/', (req, res) => {
   res.send('Supoernova');
})

app.post("/github_action", async (req, res) => {
  console.log("Github action call");
  if (
    shell.exec(`cd ${process.env.SUPERNOVA_PATH} && git pull ${process.env.GITHUB_REMOTE}`).code !== 0
  ) {
    shell.echo("Error: git pull failed");
  }

  scanComponent()

  res.json("Finished");
});

const server = app.listen(process.env.PORT || 3000, async () => {
  const host = server.address().address
  const port = server.address().port

  console.log("The app is running at: http://%s:%s", host, port)

  /**
   * Remove or comment ngrok in server
   */
  try {
    const nwhUrl = await ngrok.connect({ addr: port });
    console.log("NodeJS call server public", nwhUrl);
  } catch (err) {
    console.log("ERROR ----" + err);
  }
})
