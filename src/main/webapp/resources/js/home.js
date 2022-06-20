
window.onload=function getCategory() {
    $(".navbar").load("resources/html/navbar.html");
    getData(1,"All");
    $.ajax({
        url: 'http://localhost:8080/ekart/GetCategory',
        type: 'GET',
        success: function(data) {
            document.getElementById("hme").addEventListener("click",callgetData);
            
            var x=document.getElementById("category");
            for(var i=0;i<data.length;i++)
            {
                var y=document.createElement("option");
                y.innerHTML=data[i]["CATEGORY_NAME"];
                x.appendChild(y);
            }
        }
    });
}
let rownum=1;
let flag=1;
let itemq={};
window.onscroll=(function() {
    if(flag==1)
    if(Math.round($(window).scrollTop()) == ($(document).height()-$(window).height())) {
        rownum++;
        var category = $("#category").val();
        getData(rownum,category);
        
    }
}
);
function gotocart()
{
    location.assign("http://localhost:8080/ekart/Cart");
}

function categoryfind() {
    window.scrollTo(0,0);
    window.setTimeout(c1,10);
}
function callgetData()
{
    window.scrollTo(0,0);
    window.setTimeout(c2,10);
    $("#category option:selected").attr("selected","none");
    $("#category").val("All");
     
    // $("#category option[value='All']").attr("selected","selected");
    // category.setAtribute("selected");
}
function c2() {
    rownum=1;
    flag=1;
    var main=document.getElementById("main");
    main.innerHTML="";
    getData(1,"All");
}
function c1() {
    rownum=1;
    flag=1;
    var category = $("#category").val();    
    var main=document.getElementById("main");
    main.innerHTML="";
    getData(1,category);
}


function addq(id)
{
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    // x.style.display="block";
    if(itemq.hasOwnProperty(id)&&(itemq[id]> +x.innerHTML))
    {
        x.innerHTML=+(x.innerHTML)+1;
    }
    else if(itemq[id]<= +x.innerHTML)
    {
        alert("You can't add more than Available items");
    }
    else
    {
        $.ajax({
            url: 'http://localhost:8080/ekart/GetQuantity',
            type: 'POST',
            data: {
                id: id,
            },
            success: function(data) {
                itemq[id]=data[id];
                if(itemq[id]> +x.innerHTML)
                {
                    x.innerHTML=+(x.innerHTML)+1;
                }
                else if(itemq[id]<= +(x.innerHTML))
                {
                    alert("You can't add more than Available items");
                }
            }
        });
    }
    
}

function subq(id) {
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    if(+x.innerHTML>0)
    {
        x.innerHTML=+(x.innerHTML)-1;
    }
}

function getData(row,val)
{
    $.ajax({
        method:"post",
        url:"http://localhost:8080/ekart/GetItems",
        data:{rownum:row,category:val},
        success:function(data)
        {
            if(data.length==0)
            {
                flag=0;
            }
            else
            {
                for(var i=0;i<data.length;i++)
                {
                    var main=document.getElementById("main");
                    // var x="<div class='section1'><div class='card'><img src='../images/card.jpg' alt='Supermarket'></div><div class='itm'><div class='minus'>-</div><div class='product'>"+data[i]["NAME"]+"</div><div class='plus'>+</div></div><div class='Price'>Price: Rs."+data[i]["PRICE"]+"</div><div class='btn'><button >ADD TO CART</button></div></div>";
                    // main.insertAdjacentHTML("beforeend",x);
                    var sections=document.createElement("div");
                    sections.className="section1";
                    sections.id=data[i]["ITEM_ID"];
                    var card=document.createElement("div");
                    card.className="card";
                    var img=document.createElement("img");
                    img.src="resources/images/card.jpg";
                    img.alt="Supermarket";
                    card.appendChild(img);
                    sections.appendChild(card);
                    var itm=document.createElement("div");
                    itm.className="itm";
                    var minus=document.createElement("div");
                    minus.addEventListener("click",function()
                    {
                        subq(this.parentElement.parentElement.id);
                    });
                    minus.className="minus";
                    minus.innerHTML="-";
                    itm.appendChild(minus);
                    var product=document.createElement("div");
                    product.className="product";
                    product.innerHTML=data[i]["NAME"];
                    itm.appendChild(product);
                    var plus=document.createElement("div");
                    plus.addEventListener("click",function()
                    {
                        addq(this.parentElement.parentElement.id);
                    });
                    plus.className="plus";
                    plus.innerHTML="+";
                    itm.appendChild(plus);
                    
                    // itm.appendChild(qty);
                    sections.appendChild(itm);

                    var qty=document.createElement("div");
                    qty.className="qty";
                    var avai=document.createElement("div");
                    avai.className="avai";
                    var tf=document.createTextNode("Available: "+data[i]["QUANTITY"]);
                    avai.appendChild(tf);
                    qty.appendChild(avai);
                    var buy=document.createElement("div");
                    buy.className="buy";
                    var buyd=document.createElement("div");
                    var bn=document.createTextNode("Added :  ");
                    buyd.appendChild(bn);
                    buy.appendChild(buyd);
                    var qd=document.createElement("div");
                    var buy_qty=document.createTextNode(" 0");
                    qd.style.paddingLeft="10px";
                    // qd.style.display="none"
                    qd.appendChild(buy_qty);
                    buy.appendChild(qd);
                    qty.appendChild(buy);
                    sections.appendChild(qty);  



                    var price=document.createElement("div");
                    price.className="Price";
                    price.innerHTML="Price: Rs."+data[i]["PRICE"];
                    sections.appendChild(price);
                    var btn=document.createElement("div");
                    btn.className="btn";
                    var button=document.createElement("button");
                    button.addEventListener("click",function()
                    {
                        addtocart(this.parentElement.parentElement.id);
                    });
                    button.innerHTML="ADD TO CART";
                    btn.appendChild(button);
                    sections.appendChild(btn);
                    main.appendChild(sections);
            }
        }
    }
});
}
function addtocart(id)
{
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    var qty=+x.innerHTML;
    if(qty>0)
    {
        var item=document.getElementById(id);
        var name=item.childNodes[1].childNodes[1].innerHTML;
        var price=item.childNodes[3].innerHTML;
        var qty=item.childNodes[2].childNodes[1].childNodes[1].innerHTML;
        var id=item.id;
        $.ajax(
        {
            method:"post",
            url:"http://localhost:8080/ekart/ItemExist",
            data:{name:name,price:price,qty:qty,id:id},
            success:function(data)
            {
                if(data.length==1)
                {
                    alert("Item Already exists in the cart");
                }
                else{
                    $.ajax({
                        method:"post",
                        url:"http://localhost:8080/ekart/AddToCart",
                        data:{name:name,price:price,qty:qty,id:id},
                        success:function(data)
                        {
                            alert("Item added to cart Successfully");
                            location.reload();
                        }
                    });
                }
            }
        });
        
    }
    else
    {
        alert("You can't add 0 items");
    }
}

function gotoorders()
{
    window.location.href="http://localhost:8080/ekart/Order";
}