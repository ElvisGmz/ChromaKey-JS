const videoView = document.querySelector('#videoView');
const canvasView = document.querySelector('#canvasView');
const ctx = canvasView.getContext('2d');

navigator.mediaDevices.getUserMedia({
    video: true
})
.then((streamVideo) => {
    videoView.srcObject = streamVideo;
});
    
videoView.addEventListener('loadeddata', () => {
    canvasView.width = videoView.videoWidth
    canvasView.height = videoView.videoHeight
    setInterval(() => {
chromaKey();
    }, 40);
});

function chromaKey() {
    ctx.drawImage(videoView, 0, 0, canvasView.width, canvasView.height);
    const imageData = ctx.getImageData(0, 0, canvasView.width, canvasView.height);
    const dataLength = imageData.data.length / 4;

    for (let i = 0; i < imageData.data.length; i++) {
    const offset = i * 4;
    const red = imageData.data[offset + 0];
    const green = imageData.data[offset + 1];
    const blue = imageData.data[offset + 2];

if (blue > 135 && blue > red && blue > green){
    imageData.data[offset + 3] = 0;
}
    }
    ctx.putImageData(imageData, 0, 0);
}