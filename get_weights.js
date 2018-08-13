function get_weights(pct_or_loc, type, player){
	var coefs_to_use = loc_coefs
	var max = .5
	if (pct_or_loc === 'pct'){
		coefs_to_use = pct_coefs
		max = .05
	}
    var pos = pos_map[player]
    var pos_coefs = coefs_to_use[type][pos]
	var coefs = coefs_to_use[type][player]
    var p_coefs = {}
	for(var key in coefs) {
	    p_coefs[key] = coefs[key] + pos_coefs[key]
	}
	return p_coefs
}

function get_colors(coefs, pct_or_loc){
    var colors = {}
    var max = .5
    if (pct_or_loc === 'pct'){
        max = .03
    }
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

function logit_func(x){
    return 1./ (1 + Math.exp(-x))
}

function transform_pct(pct_coefs){
    var transformed = {}
    for(var key in pct_coefs) {
        transformed[key] = logit_func(pct_coefs[key] + pct_int[key])
    }
    return transformed
}

function transform_loc(loc_coefs){
    var exp_loc = {}
    var loc_sum = 0
    for(var key in loc_coefs) {
        exp_loc[key] = Math.exp(loc_coefs[key] + loc_int[key])
        loc_sum += exp_loc[key]
    }
    for(var key in loc_coefs) {
        exp_loc[key] /= loc_sum
    }
    return exp_loc
}

function score_series(pct_coefs, loc_coefs){
    var pt_series = {
    'Above the Break 3': 3,
    'Backcourt': 3,
    'In The Paint (Non-RA)': 2,
    'Left Corner 3': 3,
    'Mid-Range': 2,
    'Restricted Area': 2,
    'Right Corner 3': 3
    }
    var transformed_pct = transform_pct(pct_coefs)
    var transformed_loc = transform_loc(loc_coefs)
    var score = 0
    for(var key in pct_coefs) {
        score += transformed_pct[key] * transformed_loc[key] * pt_series[key]
    }
    return score
}

function get_base_score(){
    if (base_score == -1){
        var base = {
            'Above the Break 3': 0,
            'Backcourt': 0,
            'In The Paint (Non-RA)': 0,
            'Left Corner 3': 0,
            'Mid-Range': 0,
            'Restricted Area': 0,
            'Right Corner 3': 0
            }
        var off_g = pct_coefs['off']['Guard']
        var off_c = pct_coefs['off']['Center']
        var off_f = pct_coefs['off']['Forward']
        var def_g = pct_coefs['def']['Guard']
        var def_c = pct_coefs['def']['Center']
        var def_f = pct_coefs['def']['Forward']
        for(var key in base) {
            base_series_pct[key] = 2 * off_g[key] + 2 * off_f[key] + off_c[key] + 2 * def_g[key] + 2 * def_f[key] + def_c[key]
        }
        off_g = loc_coefs['off']['Guard']
        off_c = loc_coefs['off']['Center']
        off_f = loc_coefs['off']['Forward']
        def_g = loc_coefs['def']['Guard']
        def_c = loc_coefs['def']['Center']
        def_f = loc_coefs['def']['Forward']
        for(var key in base) {
            base_series_loc[key] = 2 * off_g[key] + 2 * off_f[key] + off_c[key] + 2 * def_g[key] + 2 * def_f[key] + def_c[key]
        }
        base_score = score_series(base_series_pct, base_series_loc)
    }
}

function get_combined_score(){
    if ((off_score != -1) & (shoot_score != -1)){
        var comb_pct = {}
        for(var key in shoot_pct) {
            comb_pct[key] = shoot_pct[key] + off_pct[key]
        }
        var comb_loc = {}
        for(var key in shoot_loc) {
            comb_loc[key] = shoot_loc[key] + off_loc[key]
        }
        var comb_score = score_series(comb_pct, comb_loc)
        return comb_score
    }
}

function get_new_series(player_coefs, player, coefs_dict, base_coefs){
    var new_coefs = {}
    var pos = pos_map[player]
    var pos_coefs = coefs_dict[pos]
    for(var key in player_coefs) {
        new_coefs[key] = player_coefs[key] + base_coefs[key] - pos_coefs[key]
    }
    return new_coefs
}

function get_base_shooter(player, coefs_dict, base_coefs){
    var new_coefs = {}
    var pos = pos_map[player]
    var off_coefs_ = coefs_dict['off'][pos]
    var shoot_coefs_ = coefs_dict['shoot'][pos]
    for(var key in base_coefs) {
        new_coefs[key] = base_coefs[key] - off_coefs_[key] + shoot_coefs_[key]
    }
    return new_coefs
}

function adj_if_both_centers(shooter, off, coefs, base_coefs){
    var pos_shooter = pos_map[shooter]
    var pos_off = pos_map[off]
    if ((pos_shooter == 'Center') & (pos_off == 'Center')){
        var new_coefs = {}
        var c_coefs = base_coefs['Center']
        var f_coefs = base_coefs['Forward']
        for (var key in coefs){
            new_coefs[key] = coefs[key] + c_coefs[key] - f_coefs[key]
        }
        return new_coefs
    }
    return coefs
}










