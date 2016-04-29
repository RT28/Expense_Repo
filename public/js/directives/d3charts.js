angular.module("expenseCharts", [])
    //camel cased directive name
    //in your html this will be named as bar-chart
    .directive("barChart", ["$filter", function($filter){                
        return {            
            restrict: 'AE',            
            replace: false,
            scope: {
                y: '=barChart'
            },
            link: function(scope, element, attrs) {                                
                scope.initialize = function() {
                    Highcharts.chart(element[0], {
                        xAxis: {
                            categories: scope.y.map(function(d){return $filter("date")(d.EDate, "MM/dd/yyyy");})
                        },
                        series: [{
                            data: scope.y.map(function(d){return d.Amount;}),
                            type: 'column'
                        }]
                    });
                };
                scope.$watch('y', scope.initialize);                
                scope.initialize();
            }
        };        
    }])
    .directive("pieChart", function(){
        return {
            restrict: "AE",
            replace: false,
            scope: {
                y: '=pieChart'
            },
            link: function(scope, element, attr) {
                scope.drawPie = function() {
                    
                    Highcharts.chart(element[0],{
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Summary by Expense Type'
                        },
                        tooltip: {
                            pointFormat: '<b>{series._id}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point._id}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Type',
                            colorByPoint: true,
                            data: scope.y
                        }]
                    });
                };
                
                scope.$watch('y', scope.drawPie);    
                scope.drawPie();
            }
        };        
    });