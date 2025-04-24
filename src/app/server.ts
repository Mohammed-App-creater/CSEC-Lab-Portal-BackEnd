
console.time('Startup');
import app from '../app'; 
import dotenv from 'dotenv';

dotenv.config();






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`🚀 Server running at http://localhost:${PORT}`); });
console.timeEnd('Startup'); 


