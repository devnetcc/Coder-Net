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


// vm.allPosts = vm.allPosts.map(function(item){
// 	item.formattedDate =  new Date(item.date);
// 	item.formattedDate = item.formattedDate.toLocaleString();
// 	return item;
