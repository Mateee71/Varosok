$(function (){
   $("#vnev").on("keyup", beolvas);
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
//            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

//function kiir(){
//    $(".javaslat")
//}

