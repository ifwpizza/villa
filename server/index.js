import { createApp } from './createApp.js';
import { config } from './env.js';

createApp()
  .then((app) => {
    app.listen(config.port, () => {
      console.log(`\n🏔️  SaGa Montana API server running on port ${config.port}\n`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  });
