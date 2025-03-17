import { App } from './app';

const port = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});