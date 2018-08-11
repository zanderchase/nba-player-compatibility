function get_weights(pct_or_loc, type, player){
	var coefs_to_use = loc_coefs
	var max = .5
	if (pct_or_loc === 'pct'){
		coefs_to_use = pct_coefs
		max = .03
	}
	var coefs = coefs_to_use[type][player]
	var colors = {}
	for(var key in coefs) {
	    colors[key] = get_hex(coefs[key], max);
	}
	return colors
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function get_hex(value, max_val){
    if (value > 0){
    	r = Math.round(225 + 25 * Math.min((value / max_val), 1))
        g = Math.round(225 - 70 * Math.min((value / max_val), 1))
        b = Math.round(225 - 225 * Math.min((value / max_val), 1))
    }
        
    else{
    	r = Math.round(225 + 225 * Math.max((value / max_val), -1))
        g = Math.round(225 + 110 * Math.max((value / max_val), -1))
        b = Math.round(225 + 25 * Math.max((value / max_val), -1))
    }
    return rgbToHex(r, g, b)
}
