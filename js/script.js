// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjJzApHuy4IVrufmIVJVdteZAuuP3YP9c",
    authDomain: "kulimori-uum.firebaseapp.com",
    databaseURL: "https://kulimori-uum.firebaseio.com",
    projectId: "kulimori-uum",
    storageBucket: "kulimori-uum.appspot.com",
    messagingSenderId: "773636088636",
    appId: "1:773636088636:web:bdcf52d1fffe410ca67439",
    measurementId: "G-66EDTCSP41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function scroll()
{
    if (!(scrollY >= document.getElementById("header").offsetHeight))
    {
        window.scrollTo(0, document.getElementById("header").offsetHeight);
    }
}

window.onload = function()
{
    if (!window.localStorage.profile) var forceScroll = window.setTimeout(scroll, 2000);
    else scroll();
    
    rld();
}

function hardReset()
{
    firebase.database().ref().once("value", function(snapshot)
    {
        var name = window.localStorage.profile;
        var id = window.localStorage.id;
        var str = name + id;
        
        snapshot.forEach(function(child)
        {
            if (child.val().name == str)
            {
                firebase.database().ref().child(child.key).update({"name": "&ltdel&gt -00000001", "score": "0000"});
            }
        });
    });
    
    window.localStorage.clear();
    rld();
}

function change()
{
    var ans = window.confirm("Anda pasti anda ingin mengubah nama akaun anda?");
    if (ans) reset();
}

function reset()
{
    window.localStorage.removeItem("profile");
    
    while (!window.localStorage.profile)
    {
        var profile = window.prompt("Sila masukkan nama baru anda (maksimum 10 huruf & tanpa jarak)");
        
        if (profile == null) profile = null;
        else if (profile.indexOf(" ") != -1) profile = null;
        else if (profile.indexOf("<") != -1 || profile.indexOf(">") != -1) profile = null;
        else if (profile == "") profile = null;
        else if (profile.length > 10) profile = null;
        else
        {
            while (profile.length < 10) profile += " ";
            window.localStorage.profile = profile;
        }
    }
    
    fbUdte();
    setup();
}

function fbUdte()
{
    firebase.database().ref().once("value", function(snapshot)
    {
        var newName = window.localStorage.profile;
        var id = window.localStorage.id;
        var str = newName + id;
        
        snapshot.forEach(function(child)
        {
            if (child.val().name.slice(10) == id)
            {
                firebase.database().ref().child(child.key).update({"name": str});
            }
        });
    });
}

function rld()
{
    if (!window.localStorage.profile)
    {
        while (!window.localStorage.profile)
        {
            var profile = window.prompt("Sila masukkan nama anda (maksimum 10 huruf & tanpa jarak)");
            
            if (profile == null) profile = null;
            else if (profile.indexOf(" ") != -1) profile = null;
            else if (profile == "") profile = null;
            else if (profile.indexOf("<") != -1 || profile.indexOf(">") != -1) profile = null;
            else if (profile.length > 10) profile = null;
            else
            {
                while (profile.length < 10) profile += " ";
                window.localStorage.profile = profile;
            }
        }
        
        window.alert("Kulimori menghormati data peribadi anda.\n Kulimori hanya akan mengumpul nama dan markah setiap permainan anda sahaja.\nPihak Kulimori tidak akan sesekali meminta apa-apa maklumat selain daripada data-data ini.");
        
        //window.localStorage.profile = profile;
        window.localStorage.id = (Date.now().toString(36));
        cfg();
    }
    
    if (!window.localStorage.level || !window.localStorage.exp|| !window.localStorage.id)
    {
        document.getElementById("reset").style.visibility = "visible";
    }
    
    setup();
}

function cfg()
{
    window.localStorage.newScore = "false";
    
    window.localStorage.level = 1;
    window.localStorage.exp = 0;
    window.localStorage.best = "0000";
    window.localStorage.last1 = "0000";
    window.localStorage.last2 = "0000";
    window.localStorage.last3 = "0000";
    window.localStorage.last4 = "0000";
    window.localStorage.last5 = "0000";
    window.localStorage.last6 = "0000";
    window.localStorage.last7 = "0000";
    window.localStorage.last8 = "0000";
    window.localStorage.last9 = "0000";
    window.localStorage.last10 = "0000";
    
    window.location.reload();
}

function setup()
{
    var localScore = document.getElementById("lcl");
    localScore.innerHTML = "Markah Terbaik: " + window.localStorage.best + "pts";
    localScore.innerHTML += "<br/><br/>10 Cubaan Terbaru :-<br/>";
    localScore.innerHTML += "<br/>01. " + window.localStorage.last1 + "pts";
    localScore.innerHTML += "<br/>02. " + window.localStorage.last2 + "pts";
    localScore.innerHTML += "<br/>03. " + window.localStorage.last3 + "pts";
    localScore.innerHTML += "<br/>04. " + window.localStorage.last4 + "pts";
    localScore.innerHTML += "<br/>05. " + window.localStorage.last5 + "pts";
    localScore.innerHTML += "<br/>06. " + window.localStorage.last6 + "pts";
    localScore.innerHTML += "<br/>07. " + window.localStorage.last7 + "pts";
    localScore.innerHTML += "<br/>08. " + window.localStorage.last8 + "pts";
    localScore.innerHTML += "<br/>09. " + window.localStorage.last9 + "pts";
    localScore.innerHTML += "<br/>10. " + window.localStorage.last10 + "pts";
    
    var det = document.getElementById("user");
    
    det.innerHTML = "";
    det.innerHTML += "Nama : " + window.localStorage.profile + " ";
    
    det = document.getElementById("id");
    
    det.innerHTML = "";
    det.innerHTML += "ID   : " + window.localStorage.id;
    
    det = document.getElementById("exp"); 
    
    det.innerHTML = "";
    det.innerHTML += "Tahap " + Math.floor(parseInt(window.localStorage.level)) + " - " + (parseInt(window.localStorage.exp) % 10) + " / 10 <sup>exp</sup>" ;
    det.style.width = (window.localStorage.exp % 10 / 10) * 100 + "%";
    
    fbLoad();
}

//FIREBASE CODES

function fbLoad()
{
    sortDat();
    
    firebase.database().ref().orderByChild("score").once("value", function(snapshot)
    {
        var srt = [];
        
        snapshot.forEach(function(child)
        {
            srt.push(child);
        });
        
        var found = false;
        
        for (var i = srt.length - 1; i >= 0; i--)
        {
            if (srt[i].val().name.slice(10) == window.localStorage.id && found == false) found = true;
            else if (srt[i].val().name.slice(10) == window.localStorage.id && found == true)
            {
                firebase.database().ref().child(srt[i].key).remove();
                srt.splice(i, 1);
            }
        }
        
        if (srt.length > 10)
        {
            for (var i = srt.length - 11; i >= 0; i--)
            {
                firebase.database().ref().child(srt[i].key).remove();
            }
        }
    });
    
    firebase.database().ref().orderByChild("score").on("value", function(snapshot)
    {
        var srt = [];
        
        snapshot.forEach(function(child)
        {
            srt.push(child.val());
        });
        
        for (var i = 0; i != srt.length; i++)
        {
            if (srt[i].name.slice(0, 10).search(/fuck|shit|fvck|sh1t|sh!t|5h!t/gi) != -1) srt[i].name = srt[i].name.slice(0, 10).replace(/fuck|shit|fvck|sh1t|sh!t|5h!t/gi, "****") + srt[i].name.slice(10);
            if (srt[i].name.slice(0, 10).search(/bitch/gi) != -1) srt[i].name = srt[i].name.slice(0, 10).replace(/bitch/gi, "*****") + srt[i].name.slice(10);
        }
        
        var globalScore = document.getElementById("gbl");
        globalScore.innerHTML = "10 Markah Terbaik :-<br/>";
        
        if (srt.length == 10)
        {
            globalScore.innerHTML += "<br/>01. " + srt[9].name.slice(0,10) + " : " + srt[9].score + "pts";
            if (srt[9].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>02. " + srt[8].name.slice(0,10) + " : " + srt[8].score + "pts";
            if (srt[8].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>03. " + srt[7].name.slice(0,10) + " : " + srt[7].score + "pts";
            if (srt[7].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>04. " + srt[6].name.slice(0,10) + " : " + srt[6].score + "pts";
            if (srt[6].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>05. " + srt[5].name.slice(0,10) + " : " + srt[5].score + "pts";
            if (srt[5].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>06. " + srt[4].name.slice(0,10) + " : " + srt[4].score + "pts";
            if (srt[4].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>07. " + srt[3].name.slice(0,10) + " : " + srt[3].score + "pts";
            if (srt[3].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>08. " + srt[2].name.slice(0,10) + " : " + srt[2].score + "pts";
            if (srt[2].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>09. " + srt[1].name.slice(0,10) + " : " + srt[1].score + "pts";
            if (srt[1].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
            globalScore.innerHTML += "<br/>10. " + srt[0].name.slice(0,10) + " : " + srt[0].score + "pts";
            if (srt[0].name.slice(10) == window.localStorage.id) globalScore.innerHTML += " (anda)";
        }
        else
        {
            globalScore.innerHTML += "<br/>Data tidak mencukupi...";
        }
    });
}

//firebase.database().ref().child("top10/best1").set({"name" : "dfx"});

function sortDat()
{
    var nameL = window.localStorage.profile;
    var id = window.localStorage.id;
    
    var str = nameL + id;
    
    var score = window.localStorage.last1;
    
    if (window.localStorage.newScore == "true")
    {
        window.localStorage.newScore = "false";
        firebase.database().ref().push({"name": str, "score": score});
    }
    
}