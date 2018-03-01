/*
Author: Jonas Kinnvall & Gabriel Berthold
*/

function wc(data){

    let div = '#wc';

    let parentWidth = $(div).parent().width();
    let margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = parentWidth - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    //Set colors
    let colors = colorbrewer.Set3[5];

    //Split string of words into array of strings and keep track of the word count
    let wordString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
    let wordCount = {};

    // let words = wordSting.split();









}