$.ajax(

    {
        url: "http://localhost:8080/ekart/CartDetails",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.length==0)
            {
                $("#cart").html("<h3>No items in cart</h3>");
                // $("#tbl").style.display="none";
                var c=$("#cart");
                c.css("display","block");
                
            }
            else{
                // $("#cart").style.display="none";
                var tbl=$("#tbl");
                tbl.css("display","block");
                var totl=$("#total");
                totl.css("display","inline-block");
                var ordr=$("#order");
                ordr.css("display","inline-block");
            var table=$("#tbl tbody");
            table.empty();
            var total=0;
            for(var i=0;i<data.length;i++)
            {
                var row="<tr><td>"+data[i]["NAME"]+"</td><td>"+data[i]["PRICE"]+"</td><td>"+data[i]["QUANTITY"]+"</td><td>"+data[i]["PRICE"]*data[i]["QUANTITY"]+"</td><td class='btn'><i class='material-icons'>edit</i></td><td class='btn' onclick='deletefromcart("+data[i]['ITEM_ID']+")'><i class='material-icons'>delete</i></td></tr>";
                table.append(row);
                total+=data[i]["PRICE"]*data[i]["QUANTITY"];
            }
            totl.html("Total: Rs."+total);
        }
        }
    }
);

function deletefromcart(id,event) {
    var r=confirm("Are you sure you want to delete this item?");
    if(r==true)
    {
        // var tr=$(this).closest("tr");
        // console.log(tr);
        // var id=tr.attr("id");
        console.log(id);
        // var x=event.target;
        // console.log(x);
        // alert($(this).closest("tr").attr("attr"));
        $.ajax(
            {
                url: "http://localhost:8080/ekart/DeleteFromCart",
                type: "post",
                data: {itemid:id},
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            }
        );
    }
    
}


function placeorder() {
    var r=confirm("Are you sure you want to place order?");
    if(r==true)
    {
        $.ajax(
            {
                url: "http://localhost:8080/ekart/PlaceOrder",
                type: "get",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            }
        );
    }
}