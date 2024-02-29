

class Hero {

    constructor(name, level) {
        this._name = name;
        this._level = level;
    }

    greeting() {
        console.log(`${this._name} says hello. Level: ${(this._level)}`);
    }

    get level() {
        return this._level;
    }

    set level(newLevel) {
        this._level = newLevel;
    }
}

class Wizard extends Hero {

    constructor(name, level, spell) {
        super(name, level);
        this._spell = spell;
    }
    greeting() {
        console.log(`${this._name} says hello. Level: ${(this._level)}. Spell: ${this._spell}`);
    }
}
let wizard1 = new Wizard("Rahl", 99, "remake reality");
const ironman = new Hero(`Ironman`, 5);
const superman = new Hero(`Superman`, 4);

ironman.greeting();
superman.greeting();
wizard1.greeting();
