
var button = document.getElementById('resultButton');

function imagesToDisplay(productName, src, indexNum){
  this.productName = productName;
  this.src = 'images-to-be-used/' + src;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  this.percentClicked = 0;
  this.indexNum = indexNum;
}

var totalClicks = 0;
var myBarChart = false;

function randomizer () {
  return Math.floor(Math.random() * imageArray.length);
}

var bag = new imagesToDisplay('R2D2 bag', 'bag.jpg', 0);
var banana = new imagesToDisplay('Banana Slicer', 'banana slicer.jpg', 1);
var boots = new imagesToDisplay('Boots', 'boots.jpg', 2);
var chair = new imagesToDisplay('Chair', 'chair.jpg', 3);
var cthulhu = new imagesToDisplay('Cthulhu', 'cthulhu.jpg', 4);
var dragon = new imagesToDisplay('Dragon', 'dragon.jpg', 5);
var pen = new imagesToDisplay('Pen', 'pen.jpg', 6);
var scissors = new imagesToDisplay('Scissors', 'scissors.jpg', 7);
var shark = new imagesToDisplay('Shark', 'shark.jpg', 8);
var sweep = new imagesToDisplay('Sweep', 'sweep.png', 9);
var unicorn = new imagesToDisplay('Unicorn', 'unicorn.jpg', 10);
var usb = new imagesToDisplay('Usb','usb.gif', 11);
var waterCan = new imagesToDisplay('Water Can', 'water-can.jpg', 12);
var wineGlass = new imagesToDisplay('Wine Glass','wine-glass.jpg', 13);

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
  localArray[rand1][1] = imageArray[rand1].timesDisplayed

  rand2 = randomizer();
  while (rand1 === rand2){
    rand2 = randomizer();
  }
  second.src = imageArray[rand2].src
  imageArray[rand2].timesDisplayed++;
  localArray[rand2][1] = imageArray[rand2].timesDisplayed

  rand3 = randomizer();
  while (rand1 === rand3 || rand2 === rand3){
    rand3 = randomizer();
  }
  third.src = imageArray[rand3].src
  imageArray[rand3].timesDisplayed++;
  localArray[rand3][1] = imageArray[rand3].timesDisplayed

  if (myBarChart){
    myBarChart.datasets[0].bars[rand1].value = imageArray[rand1].timesDisplayed;
    myBarChart.datasets[0].bars[rand2].value = imageArray[rand2].timesDisplayed;
    myBarChart.datasets[0].bars[rand3].value = imageArray[rand3].timesDisplayed;
    myBarChart.update();
  }
  localStorage.setItem('itemData', JSON.stringify(localArray));
}

var clrButton = document.getElementById('clrButton');
clrButton.addEventListener('click', function(){
  console.log('Clearing local storage data..');
  localStorage.clear();
})

var localArray = JSON.parse(localStorage.getItem('itemData'));
if (localArray){
  imageArray.forEach(function(imgObj, indexNum){
    imgObj.timesClicked = localArray[indexNum][0];
    imgObj.timesDisplayed = localArray[indexNum][1];
    totalClicks = parseInt(localStorage.getItem('totalClicks'));
  })
} else {
  localArray = [];
  imageArray.forEach(function(imgObj, indexNum){
    var itemTempArray = [];
    itemTempArray[0] = imgObj.timesClicked;
    itemTempArray[1] = imgObj.timesDisplayed;
    localArray.push(itemTempArray);
  })
  localStorage.setItem('itemData', JSON.stringify(localArray));
  localStorage.setItem('totalClicks', totalClicks);
}
if (totalClicks >= 15){
  button.style.display = 'block';
}


getRandomImage();


function eventChangeImage(image) {
  image.timesClicked++;
  totalClicks++;

  if (myBarChart){
    myBarChart.datasets[1].bars[image.indexNum].value = image.timesClicked;
    myBarChart.update();
  }

  localArray[image.indexNum][0] = image.timesClicked;
  localStorage.setItem('itemData', JSON.stringify(localArray));
  localStorage.setItem('totalClicks', totalClicks);

  if (totalClicks < 15) {
    getRandomImage();
  } else {
    button.style.display = 'block';
    getRandomImage();
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

    var clicksArrayForChart = [];

    resultButton.addEventListener('click', firstChart);

    function firstChart() {
      var allClicks = [];
      var allViewings = [];
      for (var i = 0; i < imageArray.length; i++) {
        allViewings[i] = imageArray[i].timesClicked;
        allClicks[i] = imageArray [i].timesDisplayed;
      }
    var data = {
    labels: ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep",
                "unicorn", "usb", "waterCan", "wineGlass"],
    datasets: [
        {
            label: "times clicked",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: allClicks
        },
        {
            label: "times displayed",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: allViewings
        }
    ]
};
var context = document.getElementById('preferences').getContext('2d')
myBarChart = new Chart(context).Bar(data);
}
