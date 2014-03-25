var $quiz;
var $results;
var $scoreboard;
var $tiebreaker;

var current_question = 0; // 0-indexed
var num_taken = 0;
var num_questions;
var total_mattress = 0;
var total_stocks = 0;

$(document).ready(function() {
    $quiz = $('#quiz');
    $results = $('#results');
    $scoreboard = $('#scoreboard');
    $tiebreaker = $quiz.find('.question.tiebreaker');

    num_questions = $quiz.find('div.question').length - 1;
    
    $tiebreaker.hide();
    $results.hide();
    
    $quiz.find('.question:eq(' + current_question + ')').show();

    $quiz.find('li strong').click(function(){
        var $q = $(this).parents('.question');
        var $a = $(this).parent('li');
        var $b = $q.find('strong');
        var category;
        
        if ($a.hasClass('stocks')) {
            total_stocks++;
            category = 'stocks';
        } else if ($a.hasClass('mattress')) {
            total_mattress++;
            category = 'mattress'
        }
 
        // update the scoreboard
        $scoreboard.find('.mattress').find('i').text(total_mattress);
        $scoreboard.find('.stocks').find('i').text(total_stocks);
        clear_scoreboard_animations();
        $scoreboard.find('.' + category).find('div').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });

        $q.addClass('answered');
        $a.addClass('correct').siblings('li').addClass('incorrect');
        num_taken++

        $b.each(function(v,k) {
            $(this).unbind('click');
        });
 
        if (num_taken == num_questions) {
            if (total_mattress == total_stocks) {
                $q.hide();
                $q.next('.question').fadeIn();
                num_questions++;
            } else if (total_mattress != total_stocks) {
                var winning_category;
                if (total_mattress > total_stocks) {
                    winning_category = 'mattress';
                } else {
                    winning_category = 'stocks';
                }
            
                $q.hide();
                $results.find('.' + winning_category).addClass('winner').show();
                $results.fadeIn();
                
                clear_scoreboard_animations();
                $scoreboard.find('.' + winning_category).addClass('winner').find('div').addClass('animated flash').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                });
            }
        } else {
            // show the next question
            $q.hide();
            $q.next('.question').fadeIn();
        }
        
        sendHeightToParent();
    });
});

function clear_scoreboard_animations() {
    $scoreboard.find('.mattress').find('div').removeClass('animated flash');
    $scoreboard.find('.stocks').find('div').removeClass('animated flash');
}

$(window).load(function() {
    setupResponsiveChild();
});