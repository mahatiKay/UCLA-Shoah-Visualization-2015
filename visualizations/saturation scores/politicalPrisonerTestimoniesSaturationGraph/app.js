(function(){
	var app=angular.module('thresholdLookup',[]);
	
	app.controller('TestimonyController',["$scope", function($scope){
		
		//To check if the Angular is working: 
		$scope.check=1;
		$scope.refreshCheck=function(){
			$scope.check++;
		};
		
		var scale = 50;
		$scope.scale = scale;
		$scope.countArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 4, 2, 1, 3, 3, 8, 8, 2, 2, 7, 14, 7, 13, 11, 7, 9, 7, 10, 9, 14, 11, 13, 6, 13, 8, 5, 4, 3, 7, 5, 3, 3, 1, 3, 4, 1, 6, 2, 1, 1, 3, 2, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(function(x) {return x * scale;});
		$scope.countUniqueArray=[];
		$scope.testimonyDetails10={};
		$scope.testimonyUniqueDetails10={};
		$scope.currentBin="24";
		$scope.readJSON=function(){
			//Setting up the "this" variable for the data bind. 
			var tempThis=$scope;	
			//Read All four JSON files: 
			d3.json("testimony_details_20.json",function(data){
				$scope.$apply(function(){
					tempThis.testimonyDetails10=data;
				});
			});
			
		};

		$scope.preprocessData=function(){
			
			$scope.readJSON();
			
			$scope.d3Append(10);	
		};
		$scope.d3Append=function(splits){

			var mydata=$scope.countArray;
			var margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = 1078 - margin.left - margin.right,
			height =1000 - margin.top - margin.bottom;

			var x = d3.scale.linear()
			.range([0, width]);

			var y = d3.scale.linear()
			.domain([0,40])	
			.range([950, 0]);

			var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(20);

			var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(20);

			var svg = d3.select("body").select("#graph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style("background-color","white")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var i=0;

			svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

			svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".50em")
			.style("text-anchor", "end")
			.text("No of Testimonies");

			var val=1;
			svg.selectAll(".bar")
			.data(mydata)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { val=val+10; return (val); })
			.style("fill","#9B73A9")
			.attr("width", 8)
			.attr("y", function(d) { return height-d/2; })
			.attr("height", function(d) { return d/2; })
			.on("click",function(d,i){
				$scope.$apply(function(){
					$scope.currentBin=i;
				});	
			})
			.on("mouseover", function(){ 
				var sofar=d3.select(this);
				sofar.style("fill","yellow");
			})
			.on("mouseout", function(){
				var sofar=d3.select(this);
				sofar.style("fill","#9B73A9");
			});
		};
		
	}]);


})();
