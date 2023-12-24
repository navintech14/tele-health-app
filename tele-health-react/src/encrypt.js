export default function encrypt(file, callback){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        let key = "";
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const [encryptedImageData, key1] = scramble(imageData, (source, diff) => {
                return leftRotate(source, diff);
            }, true, key)
            //const [encryptedImageDataFinal, key2] = encryptImageData1(encryptedImageData, key1);
            ctx.putImageData(encryptedImageData, 0, 0);

            canvas.toBlob((blob) => {
                callback([blob, key1]);
              }, 'image/png');
        }
    }
}



export function decrypt(file, decryptionKey){ 
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => {
            img.onload = () => {
                //console.log("Key value goten out of API call" + decryptionKey);
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


                //const decryptedImageData1 = decryptImageData1(imageData, decryptionKey);
                //console.log("Key cal in decrypt function after decryptImageData1 call" + decryptionKey);
                const [decryptedImageDataFinal, key] = scramble(imageData, (source, diff) => {
                    return rightRotate(source, diff);
                }, false, decryptionKey)
                //console.log("Key cal in decrypt function after scramble call" + key);


                imageData.data.set(decryptedImageDataFinal);
                ctx.putImageData(imageData, 0, 0);
                canvas.toBlob((blob) => {
                    const decryptedFile = new File([blob], file.name, { type: file.type });
                    resolve(decryptedFile);
                  }, file.type);
                };
                img.src = reader.result;
                };
                reader.readAsDataURL(file);
    });
}








function encryptImageData1(imageData, key) {
    let x = getRandomValue1(); 
    let r = getRandomValue2(); 
    const rKey = r.toString().substring(r.toString().indexOf('.') + 1);
    const xKey = x.toString().substring(x.toString().indexOf('.') + 1);
    key += String(xKey);
    key += String(rKey);
    for (let i = 0; i < imageData.data.length; i++) {
      x = r * x * (1 - x); 
      imageData.data[i] ^= Math.floor(x * 256);
    }
    return [imageData, key];
}


function decryptImageData1(encryptedImageData, key) {
    console.log("Key value passed to decryptImageData1" + key);
    let x = key.slice(256, 264);
    x = Number(parseFloat("0." + x));
    console.log("X value" + x);
    let r = key.slice(264, 272);
    r = Number(parseFloat("3." + r));
    console.log("r value" + r);
    for (let i = 0; i < encryptedImageData.data.length; i++) {
      x = r * x * (1 - x);
      encryptedImageData.data[i] ^= Math.floor(x * 256); 
    }
    return encryptedImageData;
}


function getRandomValue1() {
    const allowedChars = '0123456789';

    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        randomString += allowedChars[randomIndex];
    }
    return `0.${randomString}`;
}

function getRandomValue2() {
    const allowedChars = '0123456789';

    let randomString = '';
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        randomString += allowedChars[randomIndex];
    }
    return `3.7${randomString}`;
}


function getRandomValue3() {
    const length = 256;

    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomString = '';
    for (let i = 0; i < 256; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        randomString += allowedChars[randomIndex];
    }
    return randomString;
}


function scramble(imageData, rotateFunction, isEncrypt, key) {
    let rand;
    if(isEncrypt)
    {
        rand = getRandomValue3();
        key += rand;
    }
    if(!isEncrypt)
    {
        rand = key.slice(0, 256);
    }
    console.log("key value in scramble" + key)
    console.log("Rand key value in scramble" + rand)
    let random = new Math.seedrandom(rand);
    let max = 257;
    let min = 0;
    for (let index = 0; index < imageData.data.length / 4; index++) {
        let randomNum = () => Math.floor(random() * (max - min)) + min;
        let colorData = getPixel(imageData, index);
        colorData[0] = rotateFunction(colorData[0], randomNum());
        colorData[1] = rotateFunction(colorData[1], randomNum());
        colorData[2] = rotateFunction(colorData[2], randomNum());
        setPixelXY(imageData, Math.floor(index % imageData.width), Math.floor(index / imageData.width), colorData[0], colorData[1], colorData[2], 255);
    }
    return [imageData, key];
}


function rightRotate(source, diff) {
    let circleSize = 256;
    let rotatedVal = (source + diff) % circleSize;
    if (rotatedVal < 0 || rotatedVal > 255) {
        alert("wrong");
    }
    return (source + diff) % circleSize;
}

function leftRotate(source, diff) {
    let circleSize = 256;
    if (source >= diff) {
        return source - diff;
    }
    else {
        return circleSize - (diff - source);
    }
}


function getPixel(imgData, index) {
    var i = index * 4, d = imgData.data;
    return [d[i], d[i + 1], d[i + 2], d[i + 3]]
}

function getPixelXY(imgData, x, y) {
    return getPixel(imgData, y * imgData.width + x);
}

function setPixel(imgData, index, r, g, b, a) {
    var i = index * 4, d = imgData.data;
    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
    d[i + 3] = a;
}

function setPixelXY(imgData, x, y, r, g, b, a) {
    return setPixel(imgData, y * imgData.width + x, r, g, b, a);
}


function encryptImageRook(image) {
    var height = image.height;
    var width = image.width;
  
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var steps = Math.floor(Math.random() * (width - x));
        var direction = Math.random() < 0.5 ? -1 : 1;
  
        var currentX = x;
        var currentY = y;
        for (var i = 0; i < steps; i++) {
          if (direction < 0) {
            currentX--;
            if (currentX < 0) {
              currentX = width - 1;
            }
          } else {
            currentX++;
            if (currentX >= width) {
              currentX = 0;
            }
          }
          var temp = image.data[(currentY * width + currentX) * 4];
          image.data[(currentY * width + currentX) * 4] = image.data[(y * width + x) * 4];
          image.data[(y * width + x) * 4] = temp;
        }
      }
    }
  
    return image;
  }
  

  function decryptImageRook(image) {
    var height = image.height;
    var width = image.width;
  
    // Loop through each pixel in the image (in reverse order)
    for (var y = height - 1; y >= 0; y--) {
      for (var x = width - 1; x >= 0; x--) {
        // Generate the same number of steps and direction as in the encryption process
        var steps = Math.floor(Math.random() * (width - x));
        var direction = Math.random() < 0.5 ? -1 : 1;
  
        // Move the rook and swap the pixels (in reverse order)
        var currentX = x;
        var currentY = y;
        for (var i = 0; i < steps; i++) {
          if (direction < 0) {
            currentX--;
            if (currentX < 0) {
              currentX = width - 1;
            }
          } else {
            currentX++;
            if (currentX >= width) {
              currentX = 0;
            }
          }
          var temp = image.data[(currentY * width + currentX) * 4];
          image.data[(currentY * width + currentX) * 4] = image.data[(y * width + x) * 4];
          image.data[(y * width + x) * 4] = temp;
        }
      }
    }
  
    return image;
  }


  function encryptImageQueen(image) {
    var height = image.height;
    var width = image.width;
  
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var stepsX = Math.floor(Math.random() * (width - x));
        var directionX = Math.random() < 0.5 ? -1 : 1;
        var stepsY = Math.floor(Math.random() * (height - y));
        var directionY = Math.random() < 0.5 ? -1 : 1;
  

        var currentX = x;
        var currentY = y;
        for (var i = 0; i < Math.max(stepsX, stepsY); i++) {
          if (i < stepsX) {
            currentX += directionX;
            if (currentX < 0) {
              currentX = width - 1;
            } else if (currentX >= width) {
              currentX = 0;
            }
          }
          if (i < stepsY) {
            currentY += directionY;
            if (currentY < 0) {
              currentY = height - 1;
            } else if (currentY >= height) {
              currentY = 0;
            }
          }
          var temp = image.data[(currentY * width + currentX) * 4];
          image.data[(currentY * width + currentX) * 4] = image.data[(y * width + x) * 4];
          image.data[(y * width + x) * 4] = temp;
        }
      }
    }
  
    return image;
  }
  
function decryptImageQueen(image) {
  var height = image.height;
  var width = image.width;

  for (var y = height - 1; y >= 0; y--) {
    for (var x = width - 1; x >= 0; x--) {
    
      var stepsX = Math.floor(Math.random() * (width - x));
      var directionX = Math.random() < 0.5 ? -1 : 1;
      var stepsY = Math.floor(Math.random() * (height - y));
      var directionY = Math.random() < 0.5 ? -1 : 1;

      var currentX = x;
      var currentY = y;
      for (var i = 0; i < Math.max(stepsX, stepsY); i++) {
        if (i < stepsX) {
          currentX += directionX;
          if (currentX < 0) {
            currentX = width - 1;
          } else if (currentX >= width) {
            currentX = 0;
          }
        }
        if (i < stepsY) {
          currentY += directionY;
          if (currentY < 0) {
            currentY = height - 1;
          } else if (currentY >= height) {
            currentY = 0;
          }
        }
        var temp = image.data[(currentY * width + currentX
          ) * 4];
          image.data[(currentY * width + currentX) * 4] = image.data[(y * width + x) * 4];
          image.data[(y * width + x) * 4] = temp;
          }
          }
          }
          
          return image;
          }  