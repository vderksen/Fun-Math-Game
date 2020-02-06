// DISPALY QUESTION UNDER THE COURSOR
$(document).on("click mousemove",".box",function(e){ 
var x = e.clientX;
var y = e.clientY;
var newposX = x - 60;
var newposY = y - 60; $(".circle").css("transform","translate3d("+newposX+"px,"+newposY+"px,0px)");
});

// GAME 
let Counter = {
    PlayingState: null,
    IsStoped: true,
    Score: 0,
    Hits:0,
    Miss:0,
    TimeRemaining: 0,
    FirstNumber: 0,
    SecondNumber: 0,
    CorrectAnswer: 0,
    CorrectPosition: 0,
    WrongAnswer: 0,
    AddContentToElement: function(selector, content)
    {
        document.querySelector(selector).innerHTML = content;
    },
    Initialize: function(timeRemaining)
    {
        this.TimeRemaining = timeRemaining;
    },
    GenerateRandomNumber: function(multiplier)
    {
        return Math.round( Math.random() * multiplier ) + 1;
    },
    Refresh: function(selector, data)
    {
        document.querySelector(selector).innerText = (data < 10 ? "0" : "") + data;
    },
    LoopThroughElements: function()
    {
        var answers = [this.CorrectAnswer];

        for (var index = 1; index < 10; index++)
        {
            if (index !== this.CorrectPosition)
            {
                do
                {
                    this.WrongAnswer = this.GenerateRandomNumber(25);
                } while ( answers.indexOf(this.WrongAnswer) > -1 );

                this.AddContentToElement( "div#moving-boxes > div:nth-of-type(" + index + ")", this.WrongAnswer );
                answers.push(this.WrongAnswer);
            }
        }
    },
    Launch: function()
    {
        this.IsStoped = false;
        this.Action();
        this.Refresh("div#timer > span", this.TimeRemaining);
        this.GenerateQuestionAndAnswers();
    },
    GenerateQuestionAndAnswers: function()
    {
        do {
          this.FirstNumber = this.GenerateRandomNumber(25);
          this.SecondNumber = this.GenerateRandomNumber(9);
        } while (this.FirstNumber%this.SecondNumber!==0);
        this.CorrectAnswer = this.FirstNumber / this.SecondNumber;
        this.CorrectPosition = this.GenerateRandomNumber(8);
        this.AddContentToElement("section#question", this.FirstNumber + "/" + this.SecondNumber);
        this.AddContentToElement( "div#moving-boxes > div:nth-of-type(" + this.CorrectPosition + ")", this.CorrectAnswer );
        this.LoopThroughElements();
    },
    Action: function()
    {
        Counter.PlayingState = setInterval( function()
        {
            Counter.TimeRemaining--;
            if (Counter.TimeRemaining < 1)
            {
                Counter.Stop();
            }
            else
            {
                Counter.Refresh("div#timer > span", Counter.TimeRemaining);
            }
        }, 1000 );
    },
    EventListener: function(event)
    {
        if ( Number(event.currentTarget.innerText) === Number(Counter.CorrectAnswer) )
        {
            Counter.Score++;
            Counter.Hits++;
            Counter.Refresh("div#scoreResult > span", Counter.Score);
            Counter.Refresh("div#hitResult > span", Counter.Hits);
            Counter.GenerateQuestionAndAnswers();
        }
        else
        {
            if (Counter.Miss == -6) {
                alert("Game Level 3 is over. Press HOME to start from the beggining.");
                this.IsStoped = true;
                clearInterval(this.PlayingState);
                Counter.Stop();
            } else {
                if (Counter.Score >= 0.5)
                {
                    Counter.Score -= 0.5;
                }
                Counter.Miss -=1;
                Counter.Refresh("div#scoreResult  > span", Counter.Score);
                Counter.Refresh("div#missResult > span", Counter.Miss);
                Counter.GenerateQuestionAndAnswers();
            }
        }
    },
    CheckClickOnRightAnswer: function()
    {
        for (var index = 1; index < 10; index++)
        {
            document.querySelector("div#moving-boxes > div:nth-of-type(" + index + ")").removeEventListener("click", this.EventListener, false);
            document.querySelector("div#moving-boxes > div:nth-of-type(" + index + ")").addEventListener("click", this.EventListener);
        }
    },
    Stop: function()
    {
        this.IsStoped = true;
        clearInterval(this.PlayingState);
        alert("Game Level 3 is over. Press HOME to start from the beggining.");
    }
};
document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById("start-reset").addEventListener("click", function()
    {
        Counter.Initialize(120);
        Counter.IsStoped ? Counter.Launch() : Counter.Stop();
        Counter.CheckClickOnRightAnswer();
    });
});

// ADD RANDOM MOVE ANIMATION
document.addEventListener('DOMContentLoaded', function(){
    animateDiv('.box1');
    animateDiv('.box2');
    animateDiv('.box3');
    animateDiv('.box4');
    animateDiv('.box5');
    animateDiv('.box6');
    animateDiv('.box7');
    animateDiv('.box8');
    animateDiv('.box9');
});

function makeNewPosition(){
    // Get viewport dimensions (remove the dimension of the div)
    let movingArea=$(window);
    let h = $(movingArea).height() - 50;
    let w = $(movingArea).width() - 50;
    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);
    return [nh,nw];
}

function animateDiv(myclass){
    let newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 3000,   function(){
        animateDiv(myclass);
    });
}



