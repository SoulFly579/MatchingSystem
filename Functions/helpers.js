// Requires
var G = require('generatorics');

//Helpers
const helpers = require("./helpers")

exports.CheckRank = (array)=>{
    var min = Number.MAX_SAFE_INTEGER;
    var max = Number.MIN_SAFE_INTEGER;
    for(var i = 0; i < array.length; i++) {
      if(array[i].rank < min) min = array[i].rank;
      if(array[i].rank > max) max = array[i].rank;
    }
    if((min+2) == max || (min+1) == max){
        console.log('Bu eşleşme için rank kriterlerini karşılamakta...')
        return true;
    }else{
        console.log('Bu eşleşme rank kriterlerine uymadığı için eşleşme iptal edilmelidir..')
        return false
    }
}

exports.CheckUserCount = (search, group)=>{
    if((search.length + group.length) < 5){
        console.log('Kullanıcı bekleniyor... Son Search durumu', search)
        
        return false
    }else{
        return true
    }
}

exports.CombinationCheck = (arr)=>{
    for (var comb of G.combination(arr, 5)) {
        if(helpers.CheckRank(comb)){
            return comb
        }else{
            return []
        }
      }
}