angular.module('phoneBookApp',[]).controller('CrudCtrl',['$scope','CrudService',function($scope,CrudService) {	

	$scope.createVM = {}
	$scope.updateVM = {}
	$scope.showAlert = false;
	
	$scope.loadTableData = function(){
		CrudService.serviceCall("GET","","").then(function(response)
		{
			if(response.data.length < 1)
			{
				$scope.showAlert = true;
				$scope.alertName = "Note!"
				$scope.alertMessage = "These Is No Record  To Show."				
			}
			$scope.phoneBookData =response.data;
		});  
	}

	$scope.addPhoneNumber = function (isValid)
	{
		if(isValid)
		{
			$scope.addPhoneNumberForm.$setPristine();
			CrudService.serviceCall("POST","",$scope.createVM).then(function(response)
			{
				$scope.showAlert = true;
				$scope.alertName = "Success!"
				$scope.alertMessage = "Phone Number Is Created Successfully."
				$scope.createVM = {};			
				$scope.loadTableData();
			}); 
		}
	}

	$scope.openUpdatePhoneNumberModal = function (Id)
	{
		CrudService.serviceCall("GET",Id,"").then(function(response)
		{
			$scope.updateVM =response.data;			
		}); 
	}

	$scope.updatePhoneNumber = function (Id)
	{
		
		CrudService.serviceCall("PUT",Id,$scope.updateVM).then(function(response)
		{
			$scope.showAlert = true;
			$scope.alertName = "Success!"
			$scope.alertMessage = "Phone Number Is Updated Successfully."	
			$scope.loadTableData();
		}); 

	}

	$scope.openDeletePhoneNumberModal = function (Id)
	{
		$scope.recordIdToDelete = Id;
	}

	$scope.deletePhoneNumber = function (Id)
	{		
		CrudService.serviceCall("Delete",Id,"").then(function(response)
		{	
			$scope.showAlert = true;
			$scope.alertName = "Success!"
			$scope.alertMessage = "Phone Number Is Deleted Successfully."	
			$scope.loadTableData();
		}); 
	}

	$scope.loadTableData();
	
}])
.service('CrudService', ['$http', function ($http) {
	return {
		serviceCall: function(method,parameter,data) {
			return $http({
				method: method,
				url: 'http://localhost:11549/api/Directories/'+parameter,
				data: data
			});
		}
	};
}]);
