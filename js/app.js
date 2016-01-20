
var button = document.getElementById('resultButton');

function imagesToDisplay(productName, src){
  this.productName = productName;
  this.src = 'images-to-be-used/' + src;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  this.percentClicked = 0;
}

var totalClicks = 0;

function randomizer () {
  return Math.floor(Math.random() * imageArray.length);
}

var bag = new imagesToDisplay('R2D2 bag', 'bag.jpg');
var banana = new imagesToDisplay('Banana Slicer', 'banana slicer.jpg');
var boots = new imagesToDisplay('Boots', 'boots.jpg');
var chair = new imagesToDisplay('Chair', 'chair.jpg');
var cthulhu = new imagesToDisplay('Cthulhu', 'cthulhu.jpg');
var dragon = new imagesToDisplay('Dragon', 'dragon.jpg');
var pen = new imagesToDisplay('Pen', 'pen.jpg');
var scissors = new imagesToDisplay('Scissors', 'scissors.jpg');
var shark = new imagesToDisplay('Shark', 'shark.jpg');
var sweep = new imagesToDisplay('Sweep', 'sweep.png');
var unicorn = new imagesToDisplay('Unicorn', 'unicorn.jpg');
var usb = new imagesToDisplay('Usb','usb.gif');
var waterCan = new imagesToDisplay('Water Can', 'water-can.jpg');
var wineGlass = new imagesToDisplay('Wine Glass','wine-glass.jpg');

var first= document.getElementById('imageOne');
var second = document.getElementById('imageTwo');
var third = document.getElementById('imageThree');

var rand1;
var rand2;
var rand3;

var imageArray =[bag, banana, boots, chair, cthulhu, dragon, pen, scissors, shark, sweep, unicorn, usb, waterCan, wineGlass];

function getRandomImage() {
  rand1 = randomizer();
  first.src = imageArray[rand1].src
  imageArray[rand1].timesDisplayed++;

  rand2 = randomizer();
  while (rand1 === rand2){
    rand2 = randomizer();
  }
  second.src = imageArray[rand2].src
  imageArray[rand2].timesDisplayed++;

  rand3 = randomizer();
  while (rand1 === rand3 || rand2 === rand3){
    rand3 = randomizer();
  }
  third.src = imageArray[rand3].src
  imageArray[rand3].timesDisplayed++;
}
getRandomImage();


function eventChangeImage(image) {
  image.timesClicked++;
  totalClicks++;
  if (totalClicks < 15) {
    getRandomImage();
  } else {
    button.style.display = 'block';
  }
}


  imageOne.addEventListener ('click', function() {
    console.log(rand1);
    eventChangeImage(imageArray[rand1]);
    });

  imageTwo.addEventListener ('click', function() {
    console.log(rand2);
    eventChangeImage(imageArray[rand2]);
    });

  imageThree.addEventListener ('click', function() {
    console.log(rand3);
    eventChangeImage(imageArray[rand3]);
    });

//     var data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fillColor: "rgba(220,220,220,0.5)",
//             strokeColor: "rgba(220,220,220,0.8)",
//             highlightFill: "rgba(220,220,220,0.75)",
//             highlightStroke: "rgba(220,220,220,1)",
//             data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: "My Second dataset",
//             fillColor: "rgba(151,187,205,0.5)",
//             strokeColor: "rgba(151,187,205,0.8)",
//             highlightFill: "rgba(151,187,205,0.75)",
//             highlightStroke: "rgba(151,187,205,1)",
//             data: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
// };
// var ctx = document.getElementById('whatever is elem html').getContext('2d')
// var myBarChart = new Chart(ctx).Bar(data, options);
// }
