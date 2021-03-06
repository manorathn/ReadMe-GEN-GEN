// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);


// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is title of your project?',
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub user name?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for your project:',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the instructions for installation?',
            default: "npm install"
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What commands are need to run?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'What licenses are needed?',
            choices: [
                "MIT License",
                "Boost Software License 1.0",
                "Mozilla Public License 1.1 (MPL 1.1)",
                "Eclipse Public License 1.0",
                "Apache License, Version 2.0"
            ]
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'Are there any contributors?',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What are the test instructions for this package?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email for questions?',
        },
    ])
};

// TODO: Create a function to write README file
const generateREADME = (answers) =>
    `
### Licenses
<img width="65" alt="Screen Shot 2021-01-11 at 10 59 23 PM" src="https://img.shields.io/badge/license-${answers.license.replace(/ /g, "%20")}-blue?style=flat-square">

# ${answers.title}

### Created  by ${answers.username} Github user.

### Description
${answers.description} 

## Table of Content
- Installation
- Usage
- Contributions
- Tests
- License 
- Questions


### Installation
${answers.installation} 

### How to use.
${answers.usage} 

### Contributors
${answers.contributors} 

### Tests
${answers.tests} 

### Reach out for any questions.
${answers.email} 

`;

// TODO: Create a function to initialize app
const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('ReadMe.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to ReadMe.md'))
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();
