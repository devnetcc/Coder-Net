(function() {
	'use strict';
	angular.module('app')
	.filter('dateFilter', dateFilter);

function dateFilter (){
  return function (date){
    var newDate = new Date(date);
		newDate = newDate.toLocaleString();
    return newDate;
};
}
})();
