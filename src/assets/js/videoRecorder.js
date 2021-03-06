const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) =>{
    const {data : videoFile} = event;
    console.log(videoFile)
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const stopRecording = () =>{
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getRecording);
    recordBtn.innerHTML = "Start recording";
}

const startRecording= ()=>{
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
}
const getRecording= async()=>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{width:1280, height:720}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML="Stop recording";
        streamObject =stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML="☹️ Cant record";
    }finally{
        recordBtn.removeEventListener("click", getRecording);
    }
}

function init(){
    recordBtn.addEventListener("click", getRecording);
}

if(recorderContainer){
    init();
}