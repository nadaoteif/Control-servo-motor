
let input = document.querySelector(".inputBx input"),
    btn = document.querySelector(".inputBx .icon"),
    icon = document.querySelector(".inputBx .icon i"),
    status = document.querySelector(".home-content p"),
    SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

var slider = document.getElementById("servoSlider");
var servoP = document.getElementById("servoPos");
servoP.innerHTML = slider.value;

let recognition = new SpeechRecognition();
	recognition.lang = "ar-SA";
    
           
if (SpeechRecognition){
    console.log("supported");
    btn.addEventListener("click",()=> {
        if (icon.classList.contains('fa-microphone')){
            recognition.start();
        }
        else{
            recognition.stop();
        }
    })
    recognition.addEventListener("start",()=>{
        icon.classList.replace("fa-microphone","fa-microphone-slash");
        status.innerHTML= " يتم الآن تحويل الصوت ";
    })
    recognition.addEventListener("nomatch",()=>{
        icon.classList.replace("fa-microphone-slash","fa-microphone");
        status.innerHTML="لايوجد صوت";
    })
    recognition.addEventListener("error",()=>{
        icon.classList.replace("fa-microphone-slash","fa-microphone");
        status.innerHTML="يرجى المحاولة مرة أخرى";
    })
    recognition.addEventListener("end",()=>{
        icon.classList.replace("fa-microphone-slash","fa-microphone");
        status.innerHTML="انقر على بداية التسجيل";
    })
    recognition.addEventListener("result",(event)=>{
        let transcript = event.results[0][0].transcript;
        arduino()
        input.value = transcript;
        if(transcript=="يمين"){
            slider.value = 180;
            servoP.innerHTML = 180;     
        }
        if(transcript=="يسار"){
            slider.value = 0;
            servoP.innerHTML = 0;     
        }
    })
}
else{
    console.log("not supported");
}    

slider.oninput = function() {
  slider.value = this.value;
  servoP.innerHTML = this.value;
}
$.ajaxSetup({timeout:1000});
function servo(pos) {
  $.get("/?value=" + pos + "&");
  {Connection: close};
}



