angular.module("mainController", [])
    .controller("expenseController", ["$scope", "Expenses", "$filter", function($scope, Expenses, $filter) {
        $scope.formData = {};
        $scope.isUpdate = false;
        $scope.expenses = [];
        $scope.aggregate = [];
        
        $scope.setBarCharData = function() {
            $scope.set = {
                x: $scope.expenses.map(function(expense){return $filter('date')(expense.EDate, "MM/dd/yyyy");}),
                y: $scope.expenses.map(function(expense){return expense.Amount;}),
                aggregate: $scope.aggregate
            };
        };
        
        Expenses.get()
            .then(function(data){
                $scope.expenses = data.data.expenses || [];
                $scope.aggregate = data.data.aggregate || [];                
            });
        
        $scope.createExpense = function() {
            if(!$.isEmptyObject($scope.formData)){
                if($scope.isUpdate === true) {
                    $scope.isUpdate = false;
                    Expenses.update($scope.formData)
                        .then(function(data){
                            $scope.formData = {};
                            $scope.isUpdate = false;
                            $scope.expenses = data.data.expenses;
                            $scope.aggregate = data.data.aggregate;
                        });                        
                }
                else {
                    Expenses.create($scope.formData)
                    .then(function(data){
                        $scope.formData = {};
                        $scope.expenses = data.data.expenses;
                        $scope.aggregate = data.data.aggregate;
                    });
                }               
            }
        };
        
        $scope.deleteExpenses = function(expenses) {
            Expenses.delete(expenses._id)
                .then(function(data) {
                    $scope.expenses = data.data.expenses;
                    $scope.aggregate = data.data.aggregate;
                    $scope.formData = {};
                });
        };
        
        $scope.updateExpense = function(expenses) {
            $scope.isUpdate = true;
            expenses.EDate = $filter('date')(expenses.EDate, "yyyy-MM-dd");
            $scope.formData = expenses;
        };
        
        $scope.resetValues = function() {
            $scope.formData = {};
            $scope.isUpdate = false;            
        };
        
        $scope.allowSubmit = function() {
            return !($scope.formData.EDate != null && $scope.formData.Category != null && $scope.formData.EType != null && $scope.formData.Amount != null);
        };
    }]);