const saveImage = (canvas: HTMLCanvasElement) => {
  let canvasImage = canvas.toDataURL("image/png");

  let xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(xhr.response);
    a.download = "image_name.png";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  xhr.open("GET", canvasImage);
  xhr.send();
};
export default saveImage;
