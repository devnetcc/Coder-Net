(function() {
	'use strict';
	angular.module('app')
	.filter('firstLetterFilter', firstLetterFilter);

function firstLetterFilter (){
  return function(item){
    var str = item.split("");
    str[0] = str[0].toUpperCase();
    return str.join("");
  };
}

})();
