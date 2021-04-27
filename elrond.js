$(document).ready(function () {
    // Handler for .ready() called.

    waiting_animations = [];

    var iWaiting = 0;

    const small = new Audio("./audio/small.wav");
    const medium = new Audio("./audio/medium.wav");
    const big = new Audio("./audio/big.wav");
    const giant = new Audio("./audio/giant.wav");


    const appendAnimation = (herotag, amount, message) => {

        var audio;
        var imgSrc;
        var time;

        if(amount > 0.001){

            if (amount > 0.5) {
                audio = giant;
                imgSrc = "giant.gif";
                time = 10000;
            } else if (amount < 0.5 && amount >= 0.1) {
                audio = big;
                imgSrc = "big.gif";
                time = 8000;
            } else if (amount < 0.1 && amount >= 0.05) {
                audio = medium;
                imgSrc = "medium.gif";
                time = 8000;
            } else {
                audio = small;
                imgSrc = "small.gif";
                time = 4000;
            }

        }
        setTimeout(() => {

            $("#herotag").text(herotag);
            $("#amount").text(amount);
            $("#message").text(message);

            audio.volume = 0.25;
            audio.play();
            $('#widget-container').addClass("animSlideIn");
            $('#img').attr('src', './imgs/' + imgSrc);
        }, 700);

        setTimeout(() => {
            $(`#widget-container`).addClass("slide-out");
        }, time);

        setTimeout(() => {
            $(`#widget-container`).removeClass("slide-out");
            $('#widget-container').removeClass("animSlideIn");
        }, time + 1000);
    };

    const socket = io("https://streamparticles.io", {
        query: {
            streamerHerotag: 'loic2665.elrond',
        },
    });

    socket.on("newDonation", (data) => {
        waiting_animations.push([data.herotag, data.amount, data.message]);
    });

    setInterval(() => {
        console.log(waiting_animations);
        try{
            if(waiting_animations[iWaiting]){
                let hero = waiting_animations[iWaiting][0];
                let amount = waiting_animations[iWaiting][1];
                let text = waiting_animations[iWaiting][2];

                appendAnimation(hero, amount, text);
                iWaiting++;
            }
        }catch (e) {
            console.log("Rien...");
        }

    }, 15000);

});

