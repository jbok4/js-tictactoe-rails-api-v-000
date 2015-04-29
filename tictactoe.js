turn = 1;

var player = function() {
	if(turn % 2 == 0) {
		return "X";
	}
	else {
		return "O";
	}
};
var cellMatch = function(element) {
	if(element.html() != player()) {
		return false;
	}
	else {
		return true;
	}
}
var rowMatch = function(selector) {
	var winner;
	$(selector).each(function(i, element) {
		winner = cellMatch($(element));
		if(winner == false) {
			return false;
		}
	})
	return winner;
}
var cellsCorrect = function(direction){
	for(var i = 1; i <= 3; i++) {
		var selector = 'td[data-' + direction + '="' + i + '"]'
		var winner = rowMatch(selector);
		if(winner == true) {
			return true;
		}
	}
	return false;
}
var checkWinner = function() {
	ary = ["x", "y"];
	for(var i = 0; i < ary.length; i++) {
		if(cellsCorrect(ary[i]) == true) {
			return true
		}
	}
	return false;
}
var checkDiagonalA = function() {
	for(var i = 1; i <= 3; i++) {
		var selectorX = 'td[data-x="' + i + '"]'
		var selectorY = 'td[data-y="' + i + '"]'
		cell = $(selectorX + selectorY)
		if(cell.html() != player()) {
			return false;
		}
	}
	return true;
}
var checkDiagonalB = function() {
	var x = 3
	for(var y = 1; y <= 3; y++) {
		var selectorX = 'td[data-x="' + x + '"]'
		var selectorY = 'td[data-y="' + y + '"]'
		cell = $(selectorX + selectorY)
		x = x - 1;
		if(cell.html() != player()) {
			return false;
		}
	}
	return true;
}
var won = function() {
	var fns = [checkDiagonalB, checkDiagonalA, checkWinner]
	for(var i = 0; i < fns.length; i++) {
		if(fns[i]() == true) {
			return true;
		}
	}
	return false;
};
$("tr").each(function(i, row) {
	i = i + 1;
	$(row).attr('data-x', i);
	$(row).children().each(function(i, cell){
		i = i + 1;
		x = $(cell).parent().attr("data-x")
		$(cell).attr("data-x", x);
		$(cell).attr("data-y", i)
	});
});
$("td").each(function(i, row){
	$(row).click(function(){
		turn += 1;
		$(row).html(player());
		if(won()) {
			alert("you won!");
		}
	});
});