/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/dreams', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/dreams', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const dreams = JSON.parse(data);
    const newDream = {
      title: req.body.title,
      description: req.body.description,
      id: req.body.id,
      votes: 0,
      date: req.body.date,
      dreamImg: req.body.dreamImg,
      private: req.body.private,
      editFormOpen: req.body.editFormOpen
    };
    dreams.push(newDream);
    fs.writeFile(DATA_FILE, JSON.stringify(dreams, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(dreams);
    });
  });
});

// app.post('/api/timers/start', (req, res) => {
//   fs.readFile(DATA_FILE, (err, data) => {
//     const timers = JSON.parse(data);
//     timers.forEach((timer) => {
//       if (timer.id === req.body.id) {
//         timer.runningSince = req.body.start;
//       }
//     });
//     fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
//       res.json({});
//     });
//   });
// });

// app.post('/api/timers/stop', (req, res) => {
//   fs.readFile(DATA_FILE, (err, data) => {
//     const timers = JSON.parse(data);
//     timers.forEach((timer) => {
//       if (timer.id === req.body.id) {
//         const delta = req.body.stop - timer.runningSince;
//         timer.elapsed += delta;
//         timer.runningSince = null;
//       }
//     });
//     fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
//       res.json({});
//     });
//   });
// });

app.put('/api/dreams', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const dreams = JSON.parse(data);
    dreams.forEach((dream) => {
      if (dream.id === req.body.id) {
          dream.title = req.body.title
          dream.description = req.body.description
          dream.id = req.body.id
          dream.votes = req.body.votes
          dream.date = req.body.date
          dream.dreamImg = req.body.dreamImg
          dream.private = req.body.private
          dream.editFormOpen = req.body.editFormOpen
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(dreams, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/dreams', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let dreams = JSON.parse(data);
    dreams = dreams.reduce((memo, dream) => {
      if (dream.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(dream);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(dreams, null, 4), () => {
      res.json({});
    });
  });
});

app.get('/molasses', (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
