// alert("Hi");
const crole=window.location.pathname.split("/").pop();
$.ajax(
    {
        url: 'http://localhost:8080/ekart/SessionValidate',
        type: 'GET',
        success: function(data) {
            if(!crole.startsWith(data))
            {
                console.log(data);
                window.location.replace(data);
            }
        }
    }
);
function invalidate()
{
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