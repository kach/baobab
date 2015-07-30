~function() {
    function Baobab(game, container) {
        this.game = game;
        this.registers = game.registers;
        this.stack = [];

        this.container = container;
    }
    Baobab.prototype.printScene = function(scene) {
        var myself = this;
        var uid = Date.now();
        var active = true;

        var container = this.container;
        var div  = document.createElement("div");
        div.id = uid;

        var text = document.createElement("p");
        text.textContent = scene.description;
        var list = document.createElement("ul");

        var links = [];
        scene.links.forEach(function(link) {
            var li = document.createElement("li");
            var a  = document.createElement("a");
            a.href = "#" + uid;
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
        window.scrollTo(0, document.body.scrollHeight);
    };
    Baobab.prototype.start = function() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        document.title = this.game.name + " - baobab";

        var title = document.createElement("h1");
        title.textContent = this.game.name;
        var author = document.createElement("h2");
        author.textContent = this.game.author;
        
        this.container.appendChild(title);
        this.container.appendChild(author);

        this.printScene(this.game.scenes[this.game.start]);
    };
    Baobab.prototype.evaluateBytecode = function(btc) {
        var myself = this;
        btc.forEach(function(ins) {
            if (ins[0] === "goto") {
                myself.printScene(myself.game.scenes[ins[1]]);
                return true;
            } else if (ins[0] === "random") {
                return Math.random();
            } else if (ins[0] === "number") {
                return ins[1];
            } else if (ins[0] === "string") {
                return ins[1];
            } else if (ins[0] === "boolean") {
                return ins[1];
            } else if (ins[0] === "+") {
                return myself.evaluateBytecode(ins[1]) + myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "-") {
                return myself.evaluateBytecode(ins[1]) - myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "*") {
                return myself.evaluateBytecode(ins[1]) * myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "/") {
                return myself.evaluateBytecode(ins[1]) / myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "and") {
                return myself.evaluateBytecode(ins[1]) && myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "or") {
                return myself.evaluateBytecode(ins[1]) || myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "not") {
                return !myself.evaluateBytecode(ins[1]);
            } else if (ins[0] === "<") {
                return myself.evaluateBytecode(ins[1]) < myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "=") {
                return myself.evaluateBytecode(ins[1]) = myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === ">") {
                return myself.evaluateBytecode(ins[1]) > myself.evaluateBytecode(ins[2]);
            } else if (ins[0] === "reg") {
                return myself.registers[ins[1]];
            } else if (ins[0] === "set") {
                myself.registers[ins[1]] = myself.evaluateBytecode(ins[2]);
                return true;
            } else if (ins[0] === "if") {
                if (myself.evaluateBytecode(ins[1])) {
                    return myself.evaluateBytecode(ins[2]);
                } else {
                    return myself.evaluateBytecode(ins[3]);
                }
            } else if (ins[0] === "while") {
                while (myself.evaluateBytecode(ins[1])) {
                    myself.evaluateBytecode(ins[2]);
                }
            } else {
                console.error("I don't know how to " + ins[0]);
            }
        });
    };

    var test = {"registers":{"is-raining?":false,"health":10,"owns-dinosaur?":true},"name":"Homewards.","version":"baobab-0.0.1","scenes":{"home":{"title":"Your humble abode.","links":[{"actions":[["goto","home"]],"text":"Walk the dinosaur.","condition":123},{"actions":[["goto","home"]],"text":"Set fire to the rain.","condition":123}],"description":"You are at home, sweet home."}},"author":"Art Vandelay","description":"A test story.","start":"home"}


    window.addEventListener("load", function() {
        var b = new Baobab(test, document.getElementById("main"));
        b.start();
    }, false);
}();
