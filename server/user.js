import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3002;
let currentStatus = 'standby';

app.post('/webhook', (req, res) => {
  const { action } = req.body;
  if (action === 'start') {
    currentStatus = 'processing';
    // Play audio
    //exec('aplay /path/to/your/audio_file.wav', (error) => {
     // if (error) {
      //  console.error(`Error playing audio: ${error}`);
     // }
    //});
    setTimeout(() => {
      currentStatus = 'completed';
      setTimeout(() => {
        currentStatus = 'standby';
      }, 5000); // Reset to standby after 5 seconds
    }, 10000); // Simulate processing time
  } else if (action === 'stop') {
    currentStatus = 'standby';
  }
  res.json({ message: 'Webhook received' });
});

app.get('/api/user/status', (req, res) => {
  res.json({ status: currentStatus });
});

app.post('/api/user/request', (req, res) => {
  if (currentStatus === 'standby') {
    currentStatus = 'processing';
    // Simulate processing
    setTimeout(() => {
      currentStatus = 'completed';
      setTimeout(() => {
        currentStatus = 'standby';
      }, 5000); // Reset to standby after 5 seconds
    }, 10000);
    res.json({ message: 'Request processed' });
  } else {
    res.status(400).json({ error: 'System is busy' });
  }
});

app.listen(PORT, () => {
  console.log(`User server running on port ${PORT}`);
});