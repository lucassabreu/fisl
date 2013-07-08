var image = new Image();
image.onload = function() {
    context.drawImage(image, 30, 30);
};
image.src = "images/smurf.png"