import { app } from "./app.js";
import { sequalize } from "./database/database.js";
const main = async () => {
  try {
    await sequalize.sync({
      force: false
    });
    app.listen(3000);
    console.log('Server listenisn on port ', 4000);
  } catch (error) {
    console.error('unable to connect to database');
  }
};
main();