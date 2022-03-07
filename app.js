var pPos = window.pageYOffset;

// Scroll Function
window.onscroll = function() { 
    var cPos = window.pageYOffset;
    document.getElementById("navbar").style.transition= "all 0.35s";
    if(pPos > cPos)
    {
        document.getElementById("navbar").style.opacity = "80%";
        document.getElementById("navbar").style.zIndex="999";
    }
    else
    {
        document.getElementById("navbar").style.opacity = "0%";
        document.getElementById("navbar").style.zIndex="-999";
    }
    pPos = cPos;
}
