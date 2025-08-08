// Error Page Background color
if(document.title=="Page not found :(")
{
    document.body.style.backgroundColor="black";
}
else
{
    document.body.style.backgroundColor="var(--nav-col)";

    // Navbar functions
    var pPos = window.pageYOffset;
    var opac=  document.getElementById("navbar").style.opacity;

    // Scroll Function
    window.onscroll = function() { 
        var cPos = window.pageYOffset;
        document.getElementById("navbar").style.transition= "all 0.35s";
        if(pPos > cPos)
        {
            document.getElementById("navbar").style.opacity = opac;
            document.getElementById("navbar").style.zIndex="999";
        }
        else
        {
            document.getElementById("navbar").style.opacity = "0%";
            document.getElementById("navbar").style.zIndex="-999";
        }
        pPos = cPos;
    }

    // Navbar Button
    const navButton = document.getElementById("nav-button");
    const navContent = document.getElementById("nav-contents");

    navButton.addEventListener("click", open_close);

    var navState = 0; // 0 is hidden and 1 is shown 
    function open_close() {
        if(navState == 0){
            navState = 1;
            navContent.classList.remove("nav-contents"); // shows div
        }
        else {
            navState = 0;
            navContent.classList.add("nav-contents"); // hides div
        }
    }
}
