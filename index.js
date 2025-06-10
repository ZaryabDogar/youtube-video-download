import { execSync, spawn } from 'child_process';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/download', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  try {
    // Get video title synchronously
    const rawTitle = execSync(`yt-dlp.exe --get-title "${url}"`).toString().trim();
    const sanitizedTitle = rawTitle.replace(/[<>:"/\\|?*]+/g, ''); // remove illegal filename chars

    res.header('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp3"`);

    const ytdlp = spawn('yt-dlp.exe', [
      '-f', 'bestaudio',
      '-o', '-',
      '--quiet',
      '--extract-audio',
      '--audio-format', 'mp3',
      url
    ]);


    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on('data', (data) => {
      console.error(`yt-dlp error: ${data}`);
    });

    ytdlp.on('exit', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}`);
      }
    });

  } catch (err) {
    console.error('Failed to get title:', err);
    res.status(500).send('Failed to fetch video title');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
