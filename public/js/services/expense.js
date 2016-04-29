angular.module("expenseService",[])
    .factory("Expenses", ["$http", function($http){
        return {
            get: function() {
                return $http.get("/api/expenses");
            },            
            create: function(expenseData) {
                return $http.post("/api/expenses", expenseData);
            },
            delete: function(expensesId) {
                return $http.delete("/api/expenses/" + expensesId);
            },
            update: function(expenses) {
                return $http.post("/api/update_expenses", expenses);
            }
        };
    }]);