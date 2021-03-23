$(function (){
   $("#vnev").on("keyup", beolvas);
   $("article").delegate("th","click", rendezes);
   $("article").delegate("th","mouseenter", rarak);
   $("article").delegate("th","mouseleave", levesz);
});

var varosok = [];

function beolvas(){
    console.log($("#vnev").val());
    
    $.ajax({
        type: "GET",
        url: "feldolgoz.php?nev="+$("#vnev").val(),
        success: function (result){
//            console.log(result);
            varosok = JSON.parse(result);
            console.log(varosok);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

function kiir(){
    var txt = "<table><tr><th id='id'>ID</th><th id='nev'>Város</th><th id='megye'>Megye</th><th id='jaras'>Járás</th><th>Kistérség</th><th>Népesség</th><th>Terület</th><th>IRSZ</th><th>Mióta város</th><th>Típus</th><th></th></tr>";
    for (var i = 0; i < varosok.length; i++) {
        txt += "<tr><td>" + varosok[i].id + "</td><td>" + varosok[i].nev + "</td><td>" + varosok[i].megye + "</td><td>" + varosok[i].jaras + "</td><td>" + varosok[i].kisterseg + "</td><td>" + varosok[i].nepesseg + "</td><td>" + varosok[i].terulet + "</td><td>" + varosok[i].iranyitoszam + "</td><td>" + varosok[i].miota_varos + "</td><td>" + varosok[i].tipus + "</td><td><button id='torol'>Töröl</button></td></tr>";
    }
    txt += "</table>";

    $("article").html(txt);
    
    txt = '<select name="varosok" id="varosok">';
    
    for (var i = 0; i < varosok.length; i++) {
        txt+='<option value="'+varosok[i].nev+'">'+varosok[i].nev+'</option>'
    }
    txt += "</select>";
    
    $("#legordulo").html(txt);
    
}

function rarak(){
    $(this).addClass("kijelol");
}
function levesz(){
    $(this).removeClass("kijelol");
}

var irany = false;

function rendezes(){
    console.log($(this).attr("id"));
    var ez = $(this).attr("id");
    
    if (ez === "id") {
        varosok.sort(function(a, b){
            if (irany) {
                return Number(a[ez]) - Number(b[ez]);
            }else{
                return Number(b[ez]) - Number(a[ez]);
            }
        });
    }else{
         varosok.sort(function(a, b){
            if (irany) {
                return Number(a[ez] > b[ez]) - 0.5;
            }else{
                return Number(a[ez] < b[ez]) - 0.5;
            }

        });
    }
    
   
    
    irany =!irany;
    kiir();
}

