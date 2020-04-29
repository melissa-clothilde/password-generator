// DOM elements
var resultEl = document.getElementById('result');
var generateBtn = document.getElementById('generate');
var clipboardBtn = document.getElementById('clipboard');

// emtpy array to hold getRandom function variables once pushed within getTemplate function
var recipe = [];

// Generate a Password Button. When clicked, invoke getTemplate function to alert user for the template
generateBtn.addEventListener('click', getTemplate);

//Copy to clipboard button
clipboardBtn.addEventListener('click', copyToClipboard);

function copyToClipboard() {
    var passwordText = document.querySelector('#result');
    passwordText.select();
    document.execCommand('copy');
    alert('Password copied to clipboard! ' + passwordText.value + ' ');
}

// Functions to generate different characters
function getRandomSymbol() {
    var symbols = "!#$&()*+/@_^[]{}~?><=;:%";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
//End of functions to generate different characters

// Object/Array of all the getRandom functions above
var randomFunc = {
    symbol: getRandomSymbol,
    numeric: getRandomNumber,
    lower: getRandomLower,
    upper: getRandomUpper,
};

// getTemplate function to get user input. If user confirms a character, push that random character to the end of the recipe array, changing the length of the array based on number of times user confirms.
// getTemplate(passwordLength)
function getTemplate() {
    //start with empty array
    recipe = [];
    //prompt user for password length
    var passwordLength = prompt("How long would you like your password to be? Try to create a password that is at least 8 characters and no more than 128 characters.");

    if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
        alert('No secure password for you!') //working??
        return // We return a null object of the template if the user cancels or fills it out incorrectly
    }
    
    var hasSpecialChars = confirm('Do you want your password to have special characters?')

    if (hasSpecialChars) {
        alert("One order of special characters coming right up!");
        recipe.push('symbol');
    }
    else {
        alert("You confirmed that you do not want special characters in your password.");
    }

    var hasNumericChars = confirm("Click OK to add numeric characters to your password.");

    if (hasNumericChars) {
        alert("One order of numeric characters coming right up!");
        recipe.push('numeric');
    }
    else {
        alert("You confirmed that you do not want numeric characters in your password.");
    }

    var hasLowercaseChars = confirm("Do you want to add lowercase characters to your password?");

    if (hasLowercaseChars) {
        alert("One order of lowercase characters coming right up!");
        recipe.push('lower');
    }

    else {
        alert("You confirmed that you do not want lowercase characters in your password.");
    }

    var hasUppercaseChars = confirm("Click OK to add uppercase characters to your password.");

    if (hasUppercaseChars) {
        alert("One order of uppercase characters coming right up!");
        recipe.push('upper');
    }

    else {
        alert("You confirmed that you do not want uppercase characters in your password.");
    }
    // template object/array with variables of what the password will have
    var template = {
        length: passwordLength,
        special: hasSpecialChars,
        numeric: hasNumericChars,
        lowercase: hasLowercaseChars,
        uppercase: hasUppercaseChars,
    }
    // / generatePassword(template) function takes in template object and returns final password by 
    // Result goes into result element. Set resultEl to whatever this generatePassword gives us with the template object values passed in.
    resultEl.innerText = generatePassword(template);
}

// Pass in variable oject of all the getRandom functions
function generatePassword(template) {

    var generatedPassword = ''; //Initialize varaible. Password is empty before we make changes to it.//

    if (!template) {
        return '';
    }

    //option: make sure first x amount of characters are one of each based on what was selected by user

    //create for loop with password length condition

    for (let i = 0; i < template.length; i++) {
        var randomType = Math.floor(Math.random() * recipe.length);
        
        //add characters to generated password
        generatedPassword += randomFunc[recipe[randomType]]();
    }

    //while not loop? does my generate password have at least one type

    var finalPassword = generatedPassword;

    return finalPassword //we are returning final password from our generated function. finalPassword will get put into the resultEl.innerText//
}
