import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import AdminRoute from './routes/AdminRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import BarangRoute from './routes/BarangRoute.js';
import KategoriRoute from './routes/KategoriRoute.js';
import KeranjangRoute from './routes/KeranjangRoute.js';
import OrderItemRoute from './routes/OrderItemRoute.js';
import OrdersRoute from './routes/OrdersRoute.js';
import PenggunaRoute from './routes/PenggunaRoute.js';
import ReviewRoute from './routes/ReviewRoute.js';
import SaranRoute from './routes/SaranRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

export const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(AdminRoute);
app.use(AuthRoute);
app.use(BarangRoute);
app.use(KategoriRoute);
app.use(KeranjangRoute);
app.use(OrderItemRoute);
app.use(OrdersRoute);
app.use(PenggunaRoute);
app.use(ReviewRoute);
app.use(SaranRoute);

app.listen(process.env.APP_PORT, () => {
  console.log('Server telah terhubung');
});
