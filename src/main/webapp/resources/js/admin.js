function custmodal()
{
    var modal = document.getElementById("viewCust");
    $.ajax(
        {
            type: "GET",
            url: "http://localhost:8080/ekart/GetCustomers",
            success: function(data) {
                var table = $("#tbl tbody");
                for(var i=0;i<data.length;i++)
                {
                   var x="<tr><td>"+data[i]["USER_ID"]+"</td><td>"+data[i]["FIRSTNAME"]+"</td><td>"+data[i]["LASTNAME"]+"</td><td>"+data[i]["USERNAME"]+"</td><td>"+data[i]["MAIL"]+"</td><td>"+data[i]["PHONE"]+"</td></tr>";
                     table.append(x);
                     modal.style.display = "block";
                }
            }
        }
    );
    
    var span = document.getElementsByClassName("close1")[0];
    span.onclick = function() {
        $("#tbl tbody tr").remove();
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            $("#tbl tbody tr").remove();
            modal.style.display = "none";
        }
    }

}




function adminmodal()
{
    var modal = document.getElementById("viewadmin");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close1")[1];

    $.ajax(
        {
            type: "GET",
            url: "http://localhost:8080/ekart/GetAdminDetails",
            success: function(data) {
                var table = $("#tbl1 tbody");
                for(var i=0;i<data.length;i++)
                {
                   var x="<tr><td>"+data[i]["USER_ID"]+"</td><td>"+data[i]["FIRSTNAME"]+"</td><td>"+data[i]["LASTNAME"]+"</td><td>"+data[i]["USERNAME"]+"</td><td>"+data[i]["MAIL"]+"</td><td>"+data[i]["PHONE"]+"</td></tr>";
                     table.append(x);
                }
            }
        }
    );
    span.onclick = function() {
        $("#tbl1 tbody tr").remove();
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            $("#tbl1 tbody tr").remove();
            modal.style.display = "none";
        }
    }
}



function valid()
{
    event.preventDefault();
    var fname=document.getElementById("fname");
    var lname=document.getElementById("lname");
    var name = document.getElementById("username");
    var password = document.getElementById("password");
    var pwd1=document.getElementById("pwd1");
    var mail=document.getElementById("mailid");
    var phone=document.getElementById("phno1");
    var phone2=document.getElementById("phno2");
    var error = document.getElementById("error");
    var errorMessage = "";
    var valid = true;
    var list={};
    if(phone2.value==""&&phone.value.length==10)
    {
        list.fname=fname.value;
        list.lname=lname.value;
        list.name=name.value;
        list.password=password.value;
        list.mail=mail.value;
        list.phone=phone.value;
        list.phone2=0;
    }
    else if(phone2.value.length==10&&phone.value.length==10)
    {
        list.fname=fname.value;
        list.lname=lname.value;
        list.name=name.value;
        list.password=password.value;
        list.mail=mail.value;
        list.phone=phone.value;
        list.phone2=phone2.value;
    }
    else
    {
        errorMessage += "Enter valid phone number ";
        valid = false;
    }
    if(password.value!=pwd1.value)
    {
        valid = false;
        errorMessage += "Passwords do not match ";
    }
    if(valid == false)
                {
                    error.innerHTML = errorMessage;
                }
    else{
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:8080/ekart/Valid ",
            data: {
                username: name.value,
            },
            success: function(data) {
                if(data.length==1)
                {
                    valid = false;
                    errorMessage += "Username already exists ";
                }
                if(valid == false)
                {
                    error.innerHTML = errorMessage;
                }
                else
                {
                    $.ajax(
                        {
                            type: "POST",
                            url: "http://localhost:8080/ekart/AddAdmin",
                            data: list,
                            success: function(data) {
                            }
                        }
                    );
                    alert("Admin added successfully");
                    $("#adminadd").modal("hide");
                }
            }
        }
    );
    }
}




function validuser()
{
    event.preventDefault();
    var fname=document.getElementById("fname1");
    var lname=document.getElementById("lname1");
    var name = document.getElementById("username1");
    var password = document.getElementById("password1");
    var pwd1=document.getElementById("pwd11");
    var mail=document.getElementById("mailid1");
    var phone=document.getElementById("phno11");
    var phone2=document.getElementById("phno21");
    var error = document.getElementById("error1");
    var errorMessage = "";
    var valid = true;
    var list={};
    if(phone2.value==""&&phone.value.length==10)
    {
        list.fname=fname.value;
        list.lname=lname.value;
        list.name=name.value;
        list.password=password.value;
        list.mail=mail.value;
        list.phone=phone.value;
        list.phone2=0;
    }
    else if(phone2.value.length==10&&phone.value.length==10)
    {
        list.fname=fname.value;
        list.lname=lname.value;
        list.name=name.value;
        list.password=password.value;
        list.mail=mail.value;
        list.phone=phone.value;
        list.phone2=phone2.value;
    }
    else
    {
        errorMessage += "Enter valid phone number ";
        valid = false;
    }
    if(password.value!=pwd1.value)
    {
        valid = false;
        errorMessage += "Passwords do not match ";
    }
    if(valid == false)
                {
                    error.innerHTML = errorMessage;
                }
    else{
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:8080/ekart/Valid ",
            data: {
                username: name.value,
            },
            success: function(data) {
                if(data.length==1)
                {
                    valid = false;
                    errorMessage += "Username already exists ";
                }
                if(valid == false)
                {
                    error.innerHTML = errorMessage;
                }
                else
                {
                    $.ajax(
                        {
                            type: "POST",
                            url: "http://localhost:8080/ekart/Signup",
                            data: list,
                            success: function(data) {
                            }
                        }
                    );
                    alert("Customer added successfully");
                    $("#adminadd").modal("hide");
                }
            }
        }
    );
    }
}




function addItem()
{
    event.preventDefault();
    var form=document.getElementById("item");
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    var category=document.getElementById("category");
    var error = document.getElementById("error");
    var errorMessage = "";
    var valid = true;
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:8080/ekart/ItemValid",
            data: {
                name: name.value
            },
            success: function(data) {
                if(data.length==1)
                {
                    valid = false;
                    errorMessage += "Item already exists ";
                }
                if(valid == false)
                {
                    error.innerHTML = errorMessage;
                }
                else
                {
                    $.ajax(
                        {
                            type: "POST",
                            url: "http://localhost:8080/ekart/AddItem",
                            data: {
                                name: name.value,
                                price: price.value,
                                quantity: quantity.value,
                                category: category.value
                            },
                            success: function(data) {
                                alert("Item added successfully");
                            }
                        }
                    );
                    $("#itemadd").modal("hide");
                }

            }
        }
    );
}



function vouchermodal()
{
    var modal = document.getElementById("addvoucher");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close1")[2];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


