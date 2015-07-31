~function() {

    var getHashLink = function(){
        var hash = window.location["hash"];
        if (hash){
            var jreg = new RegExp("json\S*\=\S*([^\S]+)");
            var res = jreg.exec(hash);
            if (res){
                return res[1];
            }
        }
        return false;
    };

    var getJSON = function(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                callback(JSON.parse(xmlhttp.responseText));
            }                       
        };
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    };

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
        text.innerHTML = myself.evaluateBytecode(scene.description);
        var list = document.createElement("ul");

        var links = [];
        scene.links.forEach(function(link) {
            if (myself.evaluateBytecode(link.condition)) {
                var li = document.createElement("li");
                var a  = document.createElement("a");
                a.href = "#" + uid;
                a.innerHTML = link.text;

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
            }
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
        var ins = btc;
        if (ins[0] === "goto") {
            myself.printScene(myself.game.scenes[ins[1]]);
            return true;
        } else if (ins[0] === "display") {
            var p = document.createElement("p");
            p.innerHTML = myself.evaluateBytecode(ins[1]);
            myself.container.appendChild(p);
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
        } else if (ins[0] === "do") {
            var a = true;
            ins[1].forEach(function(i) {
                console.log("COWS", i);
                a = myself.evaluateBytecode(i); 
            });
            return a;
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
    };

    var test = {"author":"Art Vandelay","description":"A test story.","start":"home","name":"Homewards.","scenes":{"home":{"description":["+",["string","You are at home, sweet home."],["string"," Yep."]],"links":[{"text":"Walk the dinosaur.","condition":["boolean",true],"actions":["do",[["goto","outside"]]]},{"text":"Set fire to the rain.","condition":["reg","is-raining?"],"actions":["do",[["goto","home"]]]}]},"outside":{"description":["string","You are outside."],"links":[{"text":"Go back inside","condition":["boolean",true],"actions":["do",[["if",[">",["random"],["number",0.5]],["boolean",true],["do",[["display",["string","It gently begins to rain."]],["set","is-raining?",["boolean",true]]]]],["goto","home"]]]}]}},"version":"baobab-0.0.1","registers":{"is-raining?":false,"health":10,"owns-dinosaur?":true}}



    ;

    var main = function(source){
        var b = new Baobab(source, document.getElementById("main"));
        b.start();
    };

    window.addEventListener("load", function() {
        var link = getHashLink();
        if (link){
            getJSON(link, main);
        } else {
            main(test);
        }
    }, false);
}();
