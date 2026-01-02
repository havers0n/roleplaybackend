import { env } from "./config/env.js";
import { createServer } from "./api/http/server.js";

const app = createServer();

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
});
