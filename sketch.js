let x, y;
let rectSize = 2;
let timeDelay = 1;
let button;
let array, arrayBackup;

function setup() {
    x = windowWidth;
    y = parseInt(windowHeight * 0.95);
    createCanvas(x, y);
    stroke(1);
    fill('green');
    noLoop();
    createArray();
    button = createButton('New Array');
    button.mousePressed(createArray);
    button = createButton('Reset Array');
    button.mousePressed(resetArray);
    button = createButton('Bubble Sort');
    button.mousePressed(bubbleSort);
    button = createButton('Selection Sort');
    button.mousePressed(selectionSort);
    button = createButton('Insertion Sort');
    button.mousePressed(insertionSort);
    button = createButton('Merge Sort');
    button.mousePressed(mergeSortCall);
}

function draw() {
    background(0, 0, 0);
    for (let i = 0; i < array.length; i++)
        rect(i * rectSize, y, rectSize, -array[i]);
}

function createArray() {
    array = [];
    arrayBackup = [];

    for (let i = 0; i < x / rectSize; i++) {
        array.push(Math.floor(Math.random() * y));
        arrayBackup.push(array[i]);
    }
    redraw();
}

function resetArray() {
    array = [];

    for (let i = 0; i < arrayBackup.length; i++)
        array.push(arrayBackup[i]);

    redraw();
}

async function bubbleSort() {
    let change;
    let cont = 0;

    do {
        change = false;
        for (let i = 0; i < array.length - 1 - cont; i++)
            if (array[i] > array[i + 1]) {
                swap(i, i + 1);
                change = true;
            }
        cont++;
        await drawWithDelay();
    } while (change)

    redraw();
    console.log("Done!");
}

async function selectionSort() {
    let min;

    for (let i = 0; i < array.length; i++) {
        min = i;
        for (let j = 0; j < array.length; j++)
            if (array[i + j] < array[min])
                min = i + j;
        if (min > i)
            swap(i, min);
        await drawWithDelay();
    }
    redraw();
    console.log("Done!");
}

async function insertionSort() {
    let key, j;

    for (let i = 1; i < array.length; i++) {
        key = array[i];
        j = i - 1;
        while (j >= 0 && key < array[j]) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        await drawWithDelay();
    }
    redraw();
    console.log("Done!");
}

function mergeSortCall() {
    mergeSort(0, array.length - 1);
    redraw();
    console.log("Done!");
}

async function mergeSort(start, end) {
    if (start < end) {
        let mid = parseInt((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    let arr1 = new Array(mid - start + 1);
    let arr2 = new Array(end - mid);

    for (let i = 0; i < arr1.length; i++)
        arr1[i] = array[start + i];

    for (let i = 0; i < arr2.length; i++)
        arr2[i] = array[mid + i + 1];

    let i = 0;
    let j = 0;
    let k = start;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j])
            array[k++] = arr1[i++];
        else
            array[k++] = arr2[j++];

        await drawWithDelay();
    }

    while (i < arr1.length) {
        array[k++] = arr1[i++];
        await drawWithDelay();
    }

    while (j < arr2.length) {
        array[k++] = arr2[j++];
        await drawWithDelay();
    }
}

function swap(i, j) {
    let a = array[i];
    array[i] = array[j];
    array[j] = a;
}

async function drawWithDelay() {
    redraw();
    await sleep(timeDelay);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
