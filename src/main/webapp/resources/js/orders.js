$.ajax(

    {
        url: "http://localhost:8080/ekart/OrderDetails",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
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