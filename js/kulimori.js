var board = 4 * 3;
var select1 = -1;
var select2 = -1;

var deckLimit = parseInt(window.localStorage.level) * 2 + 4;

var imgs = document.getElementsByClassName("i");
var nme = document.getElementsByClassName("nme");

var cardDat = [20, 21, 22, 23, 24, 28, 29, 30, 31, 32, 33, 34, 35, 36, 25, 26, 27, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var cardAns = [20, 21, 22, 23, 24, 28, 29, 30, 31, 32, 33, 34, 35, 36, 25, 26, 27, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

var cardImg = [];
var cardImg2 = [];
var cardVal = [];
var cardVal2 = [];//20

var cardNme = ["Jeruk Maman", "Kuih Karas", "Nasi Ulam", "Pulut Harum Manis", "Pekasam Puyu", "Cucur Peneram", "Gedung Chak", "Gulai Batang Pisang", "Gulai Siam", "Kuih Bunga Pudak", "Kuih Cucur Jawa", "Kuih Dangai", "Peknga", "Ubi Telampong", "Laksa Penang", "Nasi Kandar", "Pasembor", "Bubur Anak Lebah", "Dadar Telur Ikan Loma", "Daging Masak Hitam", "Gulai Kemahang", "Gulai Lemak Pucuk Asam Gelugur", "Gulai Tempoyak", "Ikan Masak Belotak", "Ikan Pindang Daun Seniar", "Kebebe", "Kelamai", "Kuih Cecemek", "Kuih Kalakatar", "Kuih Kandar", "Kuih Limas", "Laksa Kuala", "Nasi Lemuni", "Pais Ikan Keramat", "Penjan Ubi Kayu", "Rendang Tok", "Serawa Kuinin"];
var cardChosen = [];

if (deckLimit > cardNme.length) deckLimit = cardNme.length;

for (var i = 0; i != board / 2; i++)
{
    var pick = Math.floor(Math.random() * deckLimit);
    cardVal.push(cardDat[pick]);
    cardVal2.push(cardAns[pick]);
    cardImg.push(cardDat[pick]);
    cardImg2.push(cardAns[pick]);
    cardChosen.push(cardNme[pick]);
    cardDat.splice(pick, 1);
    cardAns.splice(pick, 1);
    cardNme.splice(pick, 1);
    
    deckLimit--;
}

var match = [];
var deck = [];

for (var i = 0; i != board / 2; i++)
{
    var pick = Math.floor(Math.random() * cardVal.length);
    deck.push(cardVal[pick]);
    imgs[i].src = ("Assets/" + cardImg[pick] + ".jpg");
    cardVal.splice(pick, 1);
    cardImg.splice(pick, 1);
}

for (var i = board / 2; i != board; i++)
{
   var pick = Math.floor(Math.random() * cardVal2.length);
   deck.push(cardVal2[pick]);
   imgs[i].src = ("Assets/" + cardImg2[pick] + ".png");
   imgs[i].alt = cardChosen[pick];
   nme[i - board / 2].innerHTML = cardChosen[pick];
   cardVal2.splice(pick, 1);
   cardImg2.splice(pick, 1);
   cardChosen.splice(pick, 1);
}

var cards = document.getElementsByClassName("cards");
for (var i = 0; i != cards.length; i++)
{
    if (window.innerWidth > window.innerHeight)
    {
        cards[i].style.width = "calc(100% / 6 - 8px)";
        cards[i].style.height = "calc(100% / 2 - 8px)";
    }
    cards[i].addEventListener("click", click);
    cards[i].addEventListener("mouseenter", enter);
    cards[i].addEventListener("mouseleave", leave);
    cards[i].id = i;
}

function enter(evt)
{
    evt.target.style.border = "1px solid yellow";
    //evt.target.style.color = "yellow";
}

function leave(evt)
{
    evt.target.style.border = "1px solid #bdbdbd";
    //evt.target.style.color = "darkred";
}

window.onresize = size;

function size()
{
    for (var i = 0; i != cards.length; i++)
    {
        if (window.innerWidth > window.innerHeight)
        {
            cards[i].style.width = "calc(100% / 6 - 8px)";
            cards[i].style.height = "calc(100% / 2 - 8px)";
        }
        else
        {
            cards[i].style.width = "calc(100% / 3 - 4px)";
            cards[i].style.height = "calc(100% / 4 - 4px)";
        }
    }
}

var block = false;
var start = false;
var tries = 0;

function click(evt)
{
    if (!start)
    {
        last = Date.now();
        window.requestAnimationFrame(score);
        start = true;
    }
    if (!block)
    {
        if (select1 == -1)
        {
            delay = 1;
                
            var dupe = false;
            for (var i = 0; i != match.length; i++)
            {
                if (this.id == match[i])
                    dupe = true;
            }
            if (!dupe)
            {
                select1 = this.id;
                evt.target.style.color = "darkred";
            }
        }
        
        else if (select1 != -1 && select1 != this.id)
        {
            var dupe = false;
            for (var i = 0; i != match.length; i++)
            {
                if (this.id == match[i])
                    dupe = true
            }
            if (!dupe)
            {
                select2 = this.id;
                evt.target.style.color = "darkred";
            }
        }
    }
    
    if (select1 != -1 && select2 != -1)
    {
        block = true;
        
        if (deck[select1] == deck[select2])
        {
            match.push(select1);
            match.push(select2);
        }
    }
    
    window.requestAnimationFrame(update);
}

var correct = true;

function update()
{
    if (select1 != -1)
    {
        cards[select1].style.backgroundColor = "white";
        imgs[select1].style.display = "block";
        //cards[select1].innerHTML = deck[select1];
    }
    
    if (select2 != -1)
    {
        cards[select2].style.backgroundColor = "white";
        imgs[select2].style.display = "block";
        //cards[select2].innerHTML = deck[select2];
    }
    
    
    if (select1 != -1 && select2 != -1)
    {
        delay = 500;
        
        //cards[select1].innerHTML = deck[select1];
        //cards[select2].innerHTML = deck[select2];
        
        if (deck[select1] == deck[select2])
        {
            for (var i = 0; i != match.length; i++)
            {
                cards[match[i]].style.backgroundColor = "white";
                //cards[match[i]].innerHTML = deck[match[i]];
                imgs[match[i]].style.display = "block";
                delay = 0;
            }
            
            window.requestAnimationFrame(update);
            correct = true;
            window.setTimeout(hide, delay);
        }
        
        else
        {
            correct = false;
            window.setTimeout(hide, delay);
        }
    }
    
    for (var i = 0; i != match.length; i++)
    {
        cards[match[i]].style.backgroundColor = "white";
        //cards[match[i]].innerHTML = deck[match[i]];
        imgs[match[i]].style.display = "block";
    }
}

var delay;

function hide()
{
    if (!correct && block)
    {
        tries++;
        pts -= 100;
        if (pts < 0) pts = 0;
        
        correct = true;
    }
    
    if (select1 == select2)
        block = false;
    else
        window.setTimeout(function()
        {
            block = false;
        }, 500);
    //cards[select1].innerHTML = " ";
    imgs[select1].style.display = "none";
    //cards[select2].innerHTML = " ";
    imgs[select2].style.display = "none";
    cards[select1].style.backgroundColor = "darkred";
    cards[select2].style.backgroundColor = "darkred";
    cards[select1].style.color = "#00000000";
    cards[select2].style.color = "#00000000";
    
    select1 = -1;
    select2 = -1;
}

var time = 0;
var last = Date.now();
var now = 0;
var pts = 3000;

function score()
{
    now = Date.now();
    time += (now - last) / 1000;
    pts -= (now - last) / 1000;
    if (pts < 0) pts = 0;
    last = now;
    
    if (pts < 10)
        pStr = "000" + Math.floor(pts);
    else if (pts < 100)
        pStr = "00" + Math.floor(pts);
    else if (pts < 1000)
        pStr = "0" + Math.floor(pts);
    else
        pStr = Math.floor(pts);
    
    document.getElementsByClassName("header")[0].innerHTML = "Kulimori | Skor: " + pStr;
    if (match.length != board) window.requestAnimationFrame(score);
    else
    {
        pStr = parseInt(pStr) * parseInt(window.localStorage.level);
        window.localStorage.newScore = "true";
        window.localStorage.last10 = window.localStorage.last9;
        window.localStorage.last9 = window.localStorage.last8;
        window.localStorage.last8 = window.localStorage.last7;
        window.localStorage.last7 = window.localStorage.last6;
        window.localStorage.last6 = window.localStorage.last5;
        window.localStorage.last5 = window.localStorage.last4;
        window.localStorage.last4 = window.localStorage.last3;
        window.localStorage.last3 = window.localStorage.last2;
        window.localStorage.last2 = window.localStorage.last1;
        window.localStorage.last1 = pStr;
        
        var newRec = false;
        var head = document.getElementsByClassName("header")[0];
        var lcl = document.getElementById("stats");
        
        //head.style.height = "100%";
        lcl.style.height = "calc(100% - 8vh - 2px - 16px)";
        lcl.style.padding = "16px";
        lcl.style.margin = "8px";
        lcl.style.border = "1px solid #bdbdbd";
        
        lcl = document.getElementById("info");
        
        if (pStr > window.localStorage.best)
        {
            window.localStorage.best = pStr;
            newRec = true;
        }
        
        lcl.innerHTML += "Masa yang diambil: " + Math.floor(time) + "s<br/>";
        lcl.innerHTML += "<br/>Padanan salah: " + tries;
        
        lcl.innerHTML += "<br/>Tahap: x " + window.localStorage.level;
                  
        lcl.innerHTML += "<br/><br/>Skor Anda: " + pStr + "pts ";
        
        if (newRec)
        {
            lcl.innerHTML += "<br/><br/>Skor Terbaik: " + window.localStorage.best;
            lcl.innerHTML += " (BARU)";
            window.localStorage.exp = parseInt(window.localStorage.exp) + 3;
        }
        
        else
        {
            if (pStr > window.localStorage.last2)
            {
                lcl.innerHTML += " (+" + (pStr - window.localStorage.last2) + ")";
                window.localStorage.exp = parseInt(window.localStorage.exp) + 2;
            }
            else if (pStr < window.localStorage.last2)
            {
                lcl.innerHTML += " (-" + (window.localStorage.last2 - pStr) + ")";
                window.localStorage.exp = parseInt(window.localStorage.exp) + 1;
            }
            else
            {
                lcl.innerHTML += " (+0pts)";
                window.localStorage.exp = parseInt(window.localStorage.exp) + 1;
            }
            
            lcl.innerHTML += "<br/><br/>Skor Terbaik: " + window.localStorage.best;
            
            window.localStorage.level = Math.floor(parseInt(window.localStorage.exp) / 10 + 1);
        }
    }
}