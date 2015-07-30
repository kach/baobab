~function() {
    function Baobab(game, container) {
        this.game = game;
        this.registers = game.registers;
        this.stack = [];

        this.container = container;
    }
    Baobab.prototype.printScene = function(scene) {
        var myself = this;
        var active = true;

        var container = this.container;
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

                    myself.evaluateBytecode(link.actions);
                }
            }, false);

            li.appendChild(a);
            links.push(a);
            list.appendChild(li);
        });
        div.appendChild(text);
        div.appendChild(list);
        container.appendChild(div);
    };
    Baobab.prototype.start = function() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.printScene(this.game.scenes[this.game.start]);
    };
    Baobab.prototype.evaluateBytecode = function(btc) {
        var myself = this;
        btc.forEach(function(instruction) {
            if (instruction[0] === "goto") {
                myself.printScene(myself.game.scenes[instruction[1]]);
            }
        });
    };

    var test = {"registers":{"is-raining?":false,"health":10,"owns-dinosaur?":true},"name":"Homewards.","version":"baobab-0.0.1","scenes":{"home":{"title":"Your humble abode.","links":[{"actions":[["goto","home"]],"text":"Walk the dinosaur.","condition":123},{"actions":[["goto","home"]],"text":"Set fire to the rain.","condition":123}],"description":"You are at home, sweet home."}},"author":"Art Vandelay","description":"A test story.","start":"home"}


    window.addEventListener("load", function() {
        var b = new Baobab(test, document.getElementById("main"));
        b.start();
    }, false);
}();
