var valueFromGetAction;

Start();

function Start() {
    console.log('Start function runs');
    //var responseFromGetAction = "@Url.Content("~/Home/IsRoundWon")";

    $(function () {
        $.getJSON("/Home/IsRoundWon", function (data) {
            valueFromGetAction = data;
        });
    });

    document.getElementById('my-test').innerText = valueFromGetAction;
}


