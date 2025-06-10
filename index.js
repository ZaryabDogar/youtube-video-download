import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/download', (req, res) => {
  const { url, format } = req.query;

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  // Set fake extension based on user request
  const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
  res.header('Content-Disposition', `attachment; filename="download.${fileExtension}"`);

  const ytdlpArgs =
    format === 'mp3'
      ? ['-f', 'bestaudio', '-o', '-', '--quiet', url]
      : ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best', '-o', '-', '--quiet', url];

  const ytdlp = spawn('./yt-dlp', ytdlpArgs);

  ytdlp.stdout.pipe(res);

  ytdlp.stderr.on('data', (data) => {
    console.error(`yt-dlp error: ${data}`);
  });

  ytdlp.on('exit', (code) => {
    if (code !== 0) {
      console.error(`yt-dlp exited with code ${code}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
