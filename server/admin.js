import axios from 'axios';
import { exec } from 'child_process';
import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3001;
const USER_SERVICE_URL = 'http://localhost:3002';

app.post('/api/admin/start', (req, res) => {
  exec('python3 /Users/cool-drummer/Desktop/proyects/dadocompany/react-dispenser/server/raspberry.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Failed to start motor' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error in motor script' });
    }
    console.log(`stdout: ${stdout}`);
    axios
      .post(`${USER_SERVICE_URL}/webhook`, { action: 'start' })
      .then(() =>
        res.json({ message: 'Motor started and user service notified' })
      )
      .catch((err) => {
        console.error('Failed to notify user service:', err);
        res.status(500).json({ error: 'Failed to notify user service' });
      });
  });
});

app.post('/api/admin/stop', (req, res) => {
  // Here you would typically send a stop signal to the Raspberry Pi
  // For now, we'll just notify the user service
  axios
    .post(`${USER_SERVICE_URL}/webhook`, { action: 'stop' })
    .then(() =>
      res.json({ message: 'Motor stopped and user service notified' })
    )
    .catch((err) => {
      console.error('Failed to notify user service:', err);
      res.status(500).json({ error: 'Failed to notify user service' });
    });
});

app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});