


const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./generateMarkdown.js");

//Validation for text input
const inputValidation = async function (input) {
    if (input === '') {
        return "You must have text in this field"
    }

    return true
};
//Validation for number input
const numberValidation = async function (input) {
    if (!input.match(/[0=9]/)) {
        return "This must be a number"
    }
    return true
};

//Array of questions for user
const questions = [
    {
        type: 'input',
        message: 'What is your Github username?',
        name: 'githubUsername',
        validate: inputValidation
    },
    {
        type: 'input',
        message: 'What is the name of your Github repo?',
        name: 'githubRepo',
        validate: inputValidation
    },

    {
        type: 'input',
        message: 'What is your Project Title?',
        name: 'title',
        validate: inputValidation
    },

    {
        type: 'input',
        message: 'Please describe your project:',
        name: 'description',
        validate: inputValidation
    },
    {
        type: 'confirm',
        message: 'Would you like a table of contents?',
        name: 'table',
    },


    {
        type: 'input',
        message: 'What command does the user need to run to install dependencies?',
        name: 'install',
        default: 'npm i',
        validate: inputValidation

    },

    {
        type: 'input',
        message: 'How does one use your product?',
        name: 'usage',
        validate: inputValidation
    },
    {
        type: 'list',
        message: 'What type of licensing do you need?',
        name: 'license',
        default: 'Use arrow key to navigate',
        choices: ['MIT', 'GPL 3.0', 'APACHE 2.0', 'BSD 3', 'No license']
    },
    {
        type: 'confirm',
        message: 'Would you like to inform someone how to contribute?',
        name: 'contributeTrueOrFalse'
    },
    {
        type: 'confirm',
        message: 'Would you like to include a Tests section?',
        name: 'testsTrueorFalse'
    }, 
    
    {
        when: function (response) {
            return response.testsTrueorFalse;
        },
        type: 'input',
        message: 'What command does the user need to test your program?',
        name: 'testsContent',
        default: 'npm test',
        validate: inputValidation
    },
];

const exitQues = [
    {
        type: 'confirm',
        message: 'Exit this console?',
        name: 'exitTrueOrFalse'
    }
    ]

// function to write README file
function writeToFile(fileName, data) {
    let generated = generateMarkdown(data);
    fs.writeFile(fileName, generated, function () {
        console.log(`${fileName} has been generated!`);
        inquirer.prompt(exitQues).then(function (answers) {
            writeToFile(`${answers.githubRepo}-README.md`, answers);
        })
    });
}

//function to initialize program
function init() {
    inquirer.prompt(questions).then(function (answers) {
        writeToFile(`${answers.githubRepo}-README.md`, answers);
    })
}

//function call to initialize program
init();
