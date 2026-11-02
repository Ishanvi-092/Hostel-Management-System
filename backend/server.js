const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'running', message: '🏛️ Hostel Management API is live!' }));

app.use('/api/auth',           require('./routes/auth'));
app.use('/api/students',       require('./routes/students'));
app.use('/api/hostels',        require('./routes/hostels'));
app.use('/api/rooms',          require('./routes/rooms'));
app.use('/api/beds',           require('./routes/beds'));
app.use('/api/staff',          require('./routes/staff'));
app.use('/api/complaints',     require('./routes/complaints'));
app.use('/api/payments',       require('./routes/payments'));
app.use('/api/resource-usage', require('./routes/resourceUsage'));
app.use('/api/hostel-fees',    require('./routes/hostelFees'));
app.use('/api/visitors',       require('./routes/visitors'));
app.use('/api/visitor-logs',   require('./routes/visitorLogs'));

app.use((err, req, res, next) => res.status(500).json({ success: false, error: err.message }));
app.use((req, res) => res.status(404).json({ success: false, error: `Not found: ${req.method} ${req.url}` }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`\n🚀 Backend → http://localhost:${PORT}\n`); });
