function Login()
{
    location.assign("http://localhost:8080/ekart/login");
}
function validate()
{
    event.preventDefault();
    //var form = document.getElementById("form");
    var name = document.getElementById("username");
    var password = document.getElementById("password");
    var error = document.getElementById("error");
    var errorMessage = "";
    var valid = true;
    
    $.ajax({
        type: "POST",
        url: "Login",
        data: {
            username: name.value,
            password: password.value
        },
        success: function(data) {
            console.log(data);
            if(data.length==0)
            {
                console.log("HI");
                valid = false;
                errorMessage += "Invalid username ";
            }
            else if(data[0]["PASSWORD"]!=password.value)
            {
                console.log("Hello");
                console.log(data[0]["PASSWORD"]);
                console.log(password.value);
                valid = false;
                errorMessage += "Invalid password ";
            }
            console.log("HI");
            
    if (valid == false)
    {
        error.innerHTML = errorMessage;
    }
    
            else if(data[0]["ROLE"]=="Customer")
    {
        location.assign("http://localhost:8080/ekart/Customer");
    }
    else if(data[0]["ROLE"]=="Admin")
    {
        location.assign("http://localhost:8080/ekart/Admin");
    }
            
        }
    });
    
}
function signup()
{
    location.assign("http://localhost:8080/ekart/signup");
}
function valid()
{
    event.preventDefault();
    console.log("Jello");
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
    console.log(list);
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
                console.log(data);
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
                                console.log(data);
                            }
                        }
                    );

                    location.assign("http://localhost:8080/ekart/Customer");
                }
            }
        }
    );
    }
}
