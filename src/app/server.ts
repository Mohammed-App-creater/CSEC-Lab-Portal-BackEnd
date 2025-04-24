// src/app/server.ts
async function startServer() {
    console.time('Startup');
  
    const dotenv = await import('dotenv');
    dotenv.config();
  
    const { default: app } = await import('../app');
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.timeEnd('Startup');
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  }
  
  startServer();
  