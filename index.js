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
                "Mozilla Public License 2.0",
                "Eclipse Public License 1.0",
                "BSD 3-Clause License",
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
# ${licenseBadge(answers)}

# ${answers.title}

### Created by Github user ${answers.username}.

### Description
${answers.description} 

## Table of Content
* [Installation](#installation)
* [Usage](#usage)
* [Contributions](#contributions)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

### Installation
${answers.installation} 

### How to use.
${answers.usage} 

### Contributors
${answers.contributors} 

### Tests
${answers.tests} 

### Licenses
${licenseBadge(answers)}

### Reach out for any questions.
${answers.email} 

`
    ;

// TODO: Create a function to initialize app
const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('ReadMe.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to ReadMe.md'))
        .catch((err) => console.error(err));
};

// Function call to initialize app
init();

let licenseBadge = (answers) => {
    if (answers.license === 'MIT License') {
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    } else if (answers.license === 'Mozilla Public License 2.0') {
        return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
    } else if (answers.license === 'Eclipse Public License 1.0') {
        return '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
    } else if (answers.license === 'BSD 3-Clause License') {
        return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
    } else if (answers.license === 'Apache License, Version 2.0') {
        return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
    } else if (answers.license === 'None') {
        return 'None'
    }
}
