const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
app.use('/static', express.static('./static'));

app.listen(3000, () => {
    console.log("It Works!");
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' });
})

app.get('/download', async (req, res) => {
    var url = req.query.url;
    const info = await ytdl.getInfo(url)
    res.header("Content-Disposition", `attachment; filename=${info.videoDetails.title}-Video.mp4`);
    await ytdl(url, {format: 'mp4'}).pipe(res);
});