$(document).ready(function () {
    // Handler for .ready() called.

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    var total = 0;

    const appendLine = (herotag, amount, message) => {
        total += parseFloat(amount);
        $("#total").text(round(total, 8));

        let date = new Date();

        $('#listDonations > tbody:last-child').prepend('<tr>' +
            '<td>'+ herotag +'</td>' +
            '<td> '+ amount +' eGLD</td>' +
            '<td>'+ message +'</td>' +
            '<td>'+ addZero(date.getDate()) + '/' + addZero(date.getMonth()) + '/' + date.getFullYear() + ' à ' + addZero(date.getHours()) + ':'+ addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + '</td>' +
            '</tr>');
    }

    const socket = io("https://streamparticles.io", {
        query: {
            streamerHerotag: 'loic2665.elrond',
        },
    });

    socket.on("newDonation", (data) => {
        appendLine(data.herotag, data.amount, data.message);
    });

});

