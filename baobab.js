~function() {
    function printScene(scene) {
        var active = true;

        var container = document.getElementById("main");
        var div  = document.createElement("div");

        var text = document.createElement("p");
        text.textContent = scene.description;
        var list = document.createElement("ul");

        var links = [];
        scene.links.forEach(function(link) {
            var li = document.createElement("li");
            var a  = document.createElement("a");
            a.href = "#";
            a.textContent = link.text;

            a.addEventListener("click", function(moi) {
                if (active) {
                    active = false;
                    div.className += " inactive";
                    a.className += " chosen";
                }
            }, false);

            li.appendChild(a);
            links.push(a);
            list.appendChild(li);
        });
        div.appendChild(text);
        div.appendChild(list);
        container.appendChild(div);
    }

    var test = {"name":"Homewards.","version":"baobab-0.0.1","scenes":{"home":{"description":"You are at home, sweet home.","title":"Your humble abode.","links":[{"text":"Walk the dinosaur.","condition":0,"actions":0},{"text":"Set fire to the rain.","condition":0,"actions":0}]}},"author":"Art Vandelay","description":"A test story.","start":"home","registers":{"health":10,"owns-dinosaur?":true,"is-raining?":false}}


    window.addEventListener("load", function() {
        printScene(
            test.scenes[test.start]
        );
    }, false);
}();
