window.onload=function getCategory() {
    getData(1,"All");
    console.log("Hii from onload");
    $.ajax({
        url: 'http://localhost:8080/ekart/GetCategory',
        type: 'GET',
        success: function(data) {
            console.log(data);
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
    console.log($(document).height()-$(window).height());
    console.log(Math.round($(window).scrollTop()));
    // console.log("in");
    console.log("GetData Rownum: "+rownum);
    console.log("GetData Flag: "+flag);
    console.log("in1");
    if(flag==1)
    if(Math.round($(window).scrollTop()) == ($(document).height()-$(window).height())) {
        console.log("in12");
        rownum++;
        var category = $("#category").val();
        console.log("Hi from scroll");
        getData(rownum,category);
        
    }
}
);
function gotocart()
{
    location.assign("http://localhost:8080/ekart/Cart");
}

function categoryfind() {
    // window.scrollTo(0,0);
    // console.log("Scrolled to top");
    window.scrollTo(0,0);
    console.log("Scrolled to top");
    window.setTimeout(c1,10);
}
function callgetData()
{
    window.scrollTo(0,0);
    console.log("Scrolled to top");
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
    console.log("Hi from callgetData");
    getData(1,"All");
}
function c1() {
    rownum=1;
    flag=1;
    console.log("Category find : rownum : "+rownum);
    console.log("Category find : flag : "+flag);
    var category = $("#category").val();
    console.log(category);
    
    var main=document.getElementById("main");
    main.innerHTML="";
    console.log("Hi from category find");
    getData(1,category);
}


function addq(id)
{
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    // x.style.display="block";
    console.log(x);
    if(itemq.hasOwnProperty(id)&&(itemq[id]> +x.innerHTML))
    {
        x.innerHTML=+(x.innerHTML)+1;
    }
    else if(itemq[id]<= +x.innerHTML)
    {
        console.log(itemq[id]+"  "+x.innerHTML);
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
                // console.log(data);
                itemq[id]=data[id];
                // console.log(itemq);
                if(itemq[id]> +x.innerHTML)
                {
                    x.innerHTML=+(x.innerHTML)+1;
                }
                else if(itemq[id]<= +(x.innerHTML))
                {
                    console.log("Hlo");
                    console.log(itemq[id]+"  "+x.innerHTML);
                    alert("You can't add more than Available items");
                }
            }
        });
    }
    
}

function subq(id) {
    console.log(id);
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    console.log(x);
    if(+x.innerHTML>0)
    {
        x.innerHTML=+(x.innerHTML)-1;
    }
}

function getData(row,val)
{
    console.log(row,val);
    $.ajax({
        method:"post",
        url:"http://localhost:8080/ekart/GetItems",
        data:{rownum:row,category:val},
        success:function(data)
        {
            console.log(data);
            if(data.length==0)
            {
                flag=0;
            }
            else
            {
                for(var i=0;i<data.length;i++)
                {
                    var main=document.getElementById("main");
                    console.log(main);
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
    console.log(id);
    var x=document.getElementById(id).childNodes[2].childNodes[1].childNodes[1];
    console.log(x);
    var qty=+x.innerHTML;
    console.log(qty);
    if(qty>0)
    {
        var item=document.getElementById(id);
        var name=item.childNodes[1].childNodes[1].innerHTML;
        var price=item.childNodes[3].innerHTML;
        console.log(item.childNodes[2]);
        var qty=item.childNodes[2].childNodes[1].childNodes[1].innerHTML;
        // console.log(name,price,qty);
        var id=item.id;
        console.log(name,price,qty,id);
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
                            console.log(data);
                            alert("Item added to cart Successfully");
                            location.reload();
                        }
                    });
                }
                console.log(data);
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