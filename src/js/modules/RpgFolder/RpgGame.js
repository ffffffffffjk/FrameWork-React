import Rouche from '/Users/safevitya/my-app/src/img/rouche.jpg';
import Outside from '/Users/safevitya/my-app/src/img/outside.jpeg';
import Kb from '/Users/safevitya/my-app/src/img/kb.jpeg';
import Dead from '/Users/safevitya/my-app/src/img/dead.jpeg';
import Hall from '/Users/safevitya/my-app/src/img/hall.jpg';
import MainDoor from '/Users/safevitya/my-app/src/img/mainDoor.jpeg';
import Toilet from '/Users/safevitya/my-app/src/img/toilet.jpg';

class RpgGame{
    constructor(){
        this.user = {
            name: 'Андрей',
            hp: 10,
            money: 5,
            current: 'start',
        }

        this.Rooms = {
            start:{
                title:"Комната в общаге",
                description:'Надо меньше пить!',
                img:Rouche,
                exits:['hall', 'outside']
            },
            outside:{
                title:"Улица",
                description:'Мда',
                img:Outside,
                exits:['kb', 'mainDoor']
            },
            kb:{
                title:'Кбшка',
                description:'Мое любимое',
                img:Kb,
                exits:['outside'],
                food: function(){
        
                }
            },
            hall:{
                title:'Коридор',
                description:'Где это я?',
                img:Hall,
                exits:['toilet', 'start', 'mainDoor']
            },
            mainDoor:{
                title:'Проходной пункт',
                description:`Охранник: Ну здравствуй, ${this.user.name}...`,
                img:MainDoor,
                exits:['outside', 'hall']
            },
            toilet:{
                title:'Туалет',
                description:'Пожалуй выйду обратно',
                img:Toilet,
                exits:['hall']
            },
            dead:{
                title:'Ты помер',
                description:'Беда беда',
                img:Dead,
                exits:['start']
            }
        }

        this.price = this.random(19,31);
        this.hasButtonMoney = false;
        this.current = 'start';

        this.hp = this.user.hp;
        this.money = this.user.money;
    }

    renderRoom(title, img, description, exits, hp){
        document.querySelector('.rpg-title').innerHTML = title;
        document.getElementById('description').innerHTML = description;
        document.getElementById('roomImage').src = img;
        document.getElementById('money').innerHTML = 'В кармане: ' + this.money + ' руб';
        document.getElementById('hp').innerHTML = 'Здоровье: ' + hp + ' единиц';
        var exits = document.getElementById('exits');
        exits.innerHTML = '';
    }
    
    renderButton(text, onClick){
        var button = document.createElement('button');
        button.innerHTML = text;
        button.addEventListener('click', onClick);
        document.getElementById('exits').appendChild(button);
    }
    
    renders(){
        if (this.hp<=0){
            this.dead();
            this.current='start';
            return;
        }
    
        if (this.current=='kb'){
            this.eatFood();
            return;
        }
    
        var room = this.Rooms[this.current];

        this.renderRoom(room.title, room.img, room.description, room.exits, this.hp);
        
        for(var i = 0; i < room.exits.length; i++){
            ((i) => {
                this.renderButton(this.Rooms[room.exits[i]].title, () => {
                    this.current = room.exits[i];
                    this.hp -= 1;
                    this.renders();
            });
            })(i);
        }
        this.findMoney();
    }
    
    dead(){
        this.renderRoom('Ты помер', Dead, 'Беда беда', 'start', this.hp);
        this.renderButton('Начать санчала', () => {
            this.money=5;
            this.hp=10;
            this.renders();
        });
    }
    
    eatFood(){
        this.renderRoom('Кбшка', Kb, 'Мое любимое', 'outside', this.hp);
        this.renderButton(`Купить сухарики за ${this.price} руб`, () => {
            if (this.money >= this.price){
                this.money -= this.price;
                this.hp += Math.floor(this.price * 1/2);
                this.renderRoom('Кбшка', Kb, 'Плотно покушал', 'outside', this.hp);
                this.renderButton('На улицу', () => {
                    this.hp-=1;
                    this.current='outside';
                    this.renders();
            });
            }
            else {
                this.renderRoom('Кбшка', Kb, 'У тебя не хватает денег, уходи пока тебя не избили', 'outside', this.hp);
                this.renderButton('На улицу', () => {
                    this.hp-=1;
                    this.current='outside';
                    this.renders();
            });
            }
        });
    
            this.renderButton('Улица', () => {
                this.current = 'outside';
                this.renders();
        });
    }
    
    random(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    
    findMoney(){
        if (!this.hasButtonMoney){
            document.getElementById('foundsMoney').innerHTML = ``;
        }
        if (this.current != 'kb' && !this.hasButtonMoney && this.random(1,30)>22){
            var lostCoins = this.random(10,30);
            document.getElementById('foundsMoney').innerHTML = `На полу валяется ${lostCoins} рублей`;
            this.renderButton(`Подобрать деньги`, () => {
                this.money += lostCoins;
                document.getElementById('money').innerHTML = 'В кармане:' + this.money + 'руб';
                document.getElementById('foundsMoney').innerHTML = '';
                this.hasButtonMoney = true;
                this.renders();
            });
        }
        this.hasButtonMoney=false;
    }   
}

export default RpgGame;