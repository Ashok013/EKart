
window.onload=function getCategory() {
    $(".navbar").load("resources/html/navbar.html");
    setTimeout(loadlistener,100);
}

function loadlistener()
{
    document.getElementById("c").style.display="none";
    document.getElementById("hme").addEventListener("click",gotohome);
}
function invalidate()
{
    var r=confirm("Are you sure you want to logout?");
    if(r==true)
    $.ajax(
        {
            url: 'http://localhost:8080/ekart/Invalidate',
            type: 'GET',
            success: function(data) {
                window.location.replace(data);
            }
        }
    );
}
$.ajax(

    {
        url: "http://localhost:8080/ekart/OrderDetails",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if(data.length==0)
            {
                $("#order").html("<h3>No Orders Yet</h3>");
                // $("#tbl").style.display="none";
                var c=$("#order");
                c.css("display","block");
                
            }
            else{
                // $("#cart").style.display="none";
                var table=$("#tbl tbody");
                var tbl=$("#tbl");
                tbl.css("display","block");
            table.empty();
            // var total=0;
            for(var i=0;i<data.length;i++)
            {
                var row="<tr><td>"+data[i]["PURCHASE_ID"]+"</td><td>"+data[i]["NAME"]+"</td><td>"+data[i]["TOTAL"]+"</td><td>"+data[i]['PURCHASE_TIME']+"</td></tr>";
                table.append(row);
                // total+=data[i]["PRICE"]*data[i]["QUANTITY"];
            }
            // totl.html("Total: Rs."+total);
        }
        }
    }
);
function gotoorders()
{
    window.location.href="http://localhost:8080/ekart/Order";
}
function gotocart()
{
    location.assign("http://localhost:8080/ekart/Cart");
}
function gotohome()
{
    location.assign("http://localhost:8080/ekart/Customer");
}

