const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl=gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        duration:2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2

    })
    .from("#herofooter",{
        y: -10,
        opacity:0,
        duration:1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

//jab mouse move ho to hum log skew kar paaye aur max skew & min skew define
//kr pay , jab mouse move ho to chapta ki value bde, or jab chlna bnd ho jaye to circle bn jaye

var timeout;

function circleChaptaKaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1))`;
        },100);

    });
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnim(); 


//3no elem pr mouse move and find kaha h mouse means mouse x & y position  
//mouse ki x y position replace by image & show & move , move time rotate
//tej mouse rotation tez image rotation

document.querySelectorAll(".elem")
.forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave",function (dets){
        gsap.to(elem.querySelector("img"),{
         opacity: 0,
         ease: Power1,
         duration: 0.5,
        });
     });

    elem.addEventListener("mousemove",function (dets){
       var diff = dets.clientY - elem.getBoundingClientRect().top;
       diffrot = dets.clientX-rotate;
       rotate = dets.clientX;
      
       gsap.to(elem.querySelector("img"),{
        opacity: 1,
        ease: Power1,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot),
       });
    });
});

