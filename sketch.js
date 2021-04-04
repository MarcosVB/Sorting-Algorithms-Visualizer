let x, y;
let rectSize = 10;
let timeDelay = 1;
let buttonNewArray, buttonShuffleArray, buttonBubbleSort;
var array, arrayBackup;
var pos;
let delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let pivots = [];

function setup() {
  x = windowWidth;
  y = parseInt(windowHeight * 0.95);
  createCanvas(x, y);
  fill('green');
  stroke(1);
  noLoop();
  createArray();
  buttonNewArray = createButton('New Array');
  buttonNewArray.mousePressed(createArray);
  buttonShuffleArray = createButton('Reset Array');
  buttonShuffleArray.mousePressed(resetArray);
  buttonBubbleSort = createButton('Bubble Sort');
  buttonBubbleSort.mousePressed(bubbleSort);
  buttonBubbleSort = createButton('Selection Sort');
  buttonBubbleSort.mousePressed(selectionSort);
  buttonBubbleSort = createButton('Insertion Sort');
  buttonBubbleSort.mousePressed(insertionSort);
}

function draw() {
  background(0, 0, 0);
  for(let i = 0; i < this.array.length; i++) {
    if(pivots.includes(i))
      fill('red');
    else
      fill('green');
    rect(i*rectSize, y, rectSize, -this.array[i]);
  }
}

function createArray() {
  array = [];
  arrayBackup = [];
  for(let i = 0; i < x/rectSize; i++) {
    array.push(Math.floor(Math.random()*y));
    arrayBackup.push(array[i]);
  }
  redraw();
}

function resetArray() {
  array = [];
  for(let i = 0; i < arrayBackup.length; i++) {
    array.push(arrayBackup[i]);
  }
  redraw();
}

async function bubbleSort() {
  redraw();
  await sleep(timeDelay);
  let change;
  let cont = 0;
  do {
    change = false;
    for(let i = 0; i < array.length-1-cont; i++) {
        pivots[0] = i; //Visualize pivots
        pivots[1] = i+1; //Visualize pivots
        if(array[i] > array[i+1]) {
          let aux = array[i];
          array[i] = array[i+1];
          array[i+1] = aux;
          change = true;
        }
        redraw();
        await sleep(timeDelay);
    }
    cont++;
  }while(change)
  pivots = []; //Reset pivots
  redraw();
  console.log("Done!");
}

async function selectionSort() {
  redraw();
  await sleep(timeDelay);
  let min;
  for(let i = 0; i < array.length; i++) {
    min = i;
    pivots[0] = min; //Visualize pivots
    for(let j = 0; j < array.length; j++) {
      pivots[1] = i+j; //Visualize pivots
      if(array[i+j] < array[min]) {
        min = i+j;
        pivots[0] = min; //Visualize pivots
      }
      redraw();
      await sleep(timeDelay);
    }
    if(min > i) {
      let aux = array[i];
      array[i] = array[min];
      array[min] = aux;
      redraw();
      await sleep(timeDelay);
    }
  }
  pivots = []; //Reset pivots
  redraw();
  console.log("Done!");
}

async function insertionSort() {
  redraw();
  await sleep(timeDelay);
  
  let key, j;
  for(let i = 1; i<array.length; i++) {
    key = array[i];
    j = i - 1;
    while(j >= 0 && key < array[j]) {
      array[j+1] = array[j];
      j--;
      pivots[0] = j; //Visualize pivots
      pivots[1] = j+1; //Visualize pivots
      redraw();
      await sleep(timeDelay);
    }
    array[j+1] = key;
  }
  pivots = []; //Reset pivots
  redraw();
  console.log("Done!");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}