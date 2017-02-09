/**
 * Created by karlpineau on 07/12/2016.
 */
function stringify(array, toLink, dataType, type) {
    if(typeof array === "object") {
        var string = "";
        for(var key in array) {
            if(key > 0) {string += ', ';}
            if(toLink == false) {
                string += array[key].label;
            } else if(toLink == true) {
                string += '<a href="#" class="rebondLink" tdaType="'+type+'" tdaDataType="'+dataType+'" id="'+array[key].qwd+'">'+array[key].label+'</a>';
            }
        }

        return string;
    } else if(typeof array === "string" || typeof array === "number" ) {
        return array;
    }

}