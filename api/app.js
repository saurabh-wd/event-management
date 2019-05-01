const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost/events-api', {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const Events = require('./models/Events');

const PORT = process.env.PORT || 5000;

// CORS support
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, PATCH, DELETE'
        );
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get a event by id
// TODO: Get event by id
app.get('/:eventId', function(req, res, next) {
    Events.findOne({ _id: req.params.eventId }, function(err, event) {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
});

// Get all events Route
// TODO: Get all events
/*app.get(
    '/',
    function(req, res, next) {
        next();
    },
    function(req, res, next) {
        var searchCondition = {};

        Events.find(searchCondition).exec(function(err, events) {
            if (err) {
                return next(err);
            }
            res.json(events);
        });
    }
);*/

app.post('/check-duplicate',function(req, res, next) {next();},
    function(req, res, next) {
        
        var name    = req.body.name;
        var id      = req.body.id;
        var where   = {name: name};
        if(id != '' && typeof(id) !== 'undefined') {
            where._id = {$ne : id};
        }
        console.log('where', where)
        Events.find(where)
        .count()
        .exec(function(err, count) {
            if (err) {
                return next(err);
            }
            res.json({data:{count:count}});         
        });
    }
);

app.post('/list',function(req, res, next) {next();},
    function(req, res, next) {
        
        var pageNo          = req.body.pageNo;
        var recordPerPage   = req.body.recordPerPage;
        var sortCol         = req.body.sortCol?req.body.sortCol : 'name';
        var sortType        = req.body.sortType?req.body.sortType : 'desc';

        var sortObj = {};
        sortObj[sortCol] = sortType;


        Events.find()
        .limit(recordPerPage)
        .skip((pageNo - 1) * recordPerPage)
        .sort(sortObj)
        .exec(function(err, events) {
            if (err) {
                return next(err);
            }
            Events.find().count().exec(function(err1, ev1) {                
                res.json({data:events, summary:{total:ev1}});
            });            
        });
    }
);

// Create a event
// TODO: Create event
app.post(
    '/',
    function(req, res, next) {
        next();
    },
    function(req, res, next) {
        var event = new Events(req.body);
        event.save(function(err, post) {
            if (err) {
                return next(err);
            }
            res.json(event);
        });
    }
);

// Update a event
// TODO: Update an event

app.put('/', function(req, res, next) {
    Events.findOne({ _id: req.body._id }, function(err, event) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            event[x] = req.body[x] || event[x]
        }

        event.save(function(err, event) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(event);
        });
    });
});

// Delete a event
// TODO: Delete event
app.delete('/', function(req, res, next) {    
    const ids = (req.headers.ids).split(',');
    let count = 0;
    for(let i=0; i<ids.length; i++) {
        Events.findOneAndDelete({_id:ids[i]}, function(err, event) {
            if (!err) {
                count += 1;
            }  else {
                console.log(err);
            }           
        });
    }

    if(count == ids.length) {
        res.json({status:'success'});
    } else if(count == 0){
        res.json({status:'failed'});
    } else {
        res.json({status:'partial'});
    }
    /*Events.findByIdAndRemove(req.body.id, function(err, event) {
        if (err) throw err;
        res.json(event);
    });*/
});

// 404 redirection
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Listen on port
app.listen(PORT, function() {
    console.log('[SERVER]: Running on port ' + PORT);
});
