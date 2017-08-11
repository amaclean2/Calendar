var express = require('express'),
  app = express(),
  port = process.env.PORT || 3050,
  mongoose = require('mongoose'),
  Event = require('./eventsModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Calendardb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


app.get('/events', (req, res) => {
	Event.find({}, (err, event) => {
		if(err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(event );
		}
	});
});

app.post('/events', (req, res) => {
	var new_event = new Event(req.body);
	console.log(req.body);
	new_event.save((err, event) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).send(event);
		}
	})
});

app.get('/events/:eventId', (req, res) => {
	Event.findById(req.params.eventId, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).json(event);
  	}
  });
});

app.put('/events/:eventId', (req, res) => {
	Event.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, (err, event) => {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).json(event);
    }
  });
});

app.delete('/events/:eventId', (req, res) => {
	Event.remove({
    _id: req.params.eventId
  }, function(err, event) {
    if (err) {
      res.status(400).send(err);
    } else {
    	res.status(200).send({ message: 'Event successfully deleted' });
   	}
  });
});


app.listen(port);
console.log('event list server started on: ' + port);