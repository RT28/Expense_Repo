var Expense = require('./models/expense');

module.exports = function(app) {    
    var response = {"expenses": {}, "aggregate": {}};
    app.get("/api/expenses", function(req, res) {
        Expense.find(function(err, expenses){
            if(err) {
                res.send(err);
            }  
            response.expenses = expenses;
            Expense.aggregate([{
                $group: {
                    _id: "$EType",
                    y: {
                        $sum: "$Amount"
                    }
                },
            }],function(err, result){
                if(err) {
                    res.send(err);
                }
                response.aggregate = result;
                res.json(response);
            });            
        }).sort("EDate");
    });
    
    app.post("/api/expenses", function(req, res) {
        var response = {"expenses": {}, "aggregate": {}};
        Expense.create(req.body, function(err, expenses) {
            if(err) {
                res.send(err);
            }
            Expense.find(function(err, expenses) {
                if(err) {   
                    res.send(err);
                }
                response.expenses = expenses;
                Expense.aggregate([{
                    $group: {
                        _id: "$EType",
                        y: {
                            $sum: "$Amount"
                        }
                    },
                }],function(err, result){
                    if(err) {
                        res.send(err);
                    }
                    response.aggregate = result;
                    res.json(response);
                });
            }).sort("EDate");
        });
    });
    
    app.delete("/api/expenses/:expenses_id", function(req, res) {
        var response = {"expenses": {}, "aggregate": {}};
        Expense.remove({
            _id: req.params.expenses_id,
        }, function(err, expenses) {
            if(err) {
                res.send(err);
            }
            Expense.find(function(err, expenses){
                if(err) {
                    res.send(err);
                }
                response.expenses = expenses;
                Expense.aggregate([{
                    $group: {
                        _id: "$EType",
                        y: {
                            $sum: "$Amount"
                        }
                    },
                }],function(err, result){
                    if(err) {
                        res.send(err);
                    }
                    response.aggregate = result;
                    res.json(response);
                });
            }).sort("EDate");
        });
    });
    
    app.post("/api/update_expenses", function(req, res) {
        var response = {"expenses": {}, "aggregate": {}};
        Expense.update({
            _id: req.body._id
        },{
            EDate: req.body.EDate,
            Category: req.body.Category,
            EType: req.body.EType,
            Amount: req.body.Amount
        }, null, function(err, expenses) {
            if(err) {
                res.send(err);
            }
            Expense.find(function(err, expenses) {
                if(err) {
                    res.send(err);
                }
                response.expenses = expenses;
                Expense.aggregate([{
                    $group: {
                        _id: "$EType",
                        y: {
                            $sum: "$Amount"
                        }
                    },
                }],function(err, result){
                    if(err) {
                        res.send(err);
                    }
                    response.aggregate = result;
                    res.json(response);
                });
            }).sort("EDate");;
        });
    });
    //application    
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html');
    });
 
};