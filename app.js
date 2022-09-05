const express = require('express');
// Security Feature
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const router = require('./router/mailserver');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

//middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.get('/', (req,res)=> {
    res.send('Mail Service API');
})

app.use('/api/mail', router);

const start = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
}

start();