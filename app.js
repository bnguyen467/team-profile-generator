const Manager = require("./Assets/lib/Manager");
const Engineer = require("./Assets/lib/Engineer");
const Intern = require("./Assets/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Assets/lib/htmlRenderer");
// const { type } = require("os");


// Write code to use inquirer to gather information about the development team members, and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different information; write your code to ask different questions via inquirer depending on employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer, and Intern classes should all extend from a class named Employee; see the directions for further information. Be sure to test out each class and verify it generates an object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work! ```

let members = [];

const buildEngineer = data =>
{
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'github',
                message: `Enter member's github username: `
            }
        ])
        .then( ({github}) => {
            members.push(new Engineer(data.name, data.id, data.email, github))
            moreMember();
        })
        .catch(error => { console.log(error) })
}

const buildManager = (data) =>
{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'number',
            message: `Enter Manager office number: `
        }
    ])
    .then( ({number}) => {
        members.push(new Manager(data.name, data.id, data.email, number))
        moreMember();
    })
    .catch(error => { console.log(error) })
}

const buildIntern = (data) =>
{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'school',
            message: `Enter member's school: `
        }
    ])
    .then( ({school}) => {
        members.push(new Intern(data.name, data.id, data.email, school))
        moreMember();
    })
    .catch(error => { console.log(error) })
}

const moreMember = () =>
{
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'again',
            message: `Is there any other member to add?`,
            choices: ['Yes', 'No']
        }
    ])
    .then( ({again}) => {
        switch(again)
        {
            case 'Yes': 
                addMember();
                break;
            case 'No':
                createFile();
                break;
        }
    })
    .catch(error => { console.log(error) })
}

const addMember = () =>
{
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `Enter member's name: `
            },
            {
                type: 'input',
                name: 'id',
                message: `Enter member's id:`
            },
            {
                type: 'input',
                name: 'email',
                message: `Enter member's email:`
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the member?',
                choices: ['Engineer', 'Manager', 'Intern']
            }
        ])
        .then(answers => {
            switch(answers.role)
            {
                case 'Engineer': 
                    buildEngineer(answers);
                    break;
                case 'Manager':
                    buildManager(answers);
                    break;
                case 'Intern':
                    buildIntern(answers);
                    break;
            }
        })

        .catch(error => { console.log(error) })
}

addMember();

// Function to check if there is 'output' folder, if no, create output folder.
// then create and write team.html
const createFile = () => {
    fs.access('./output', function(error){
        if(error)   // Directory does not exist
        {
            fs.mkdirSync('./output');
        }

        const html = render(members);
        fs.writeFileSync(outputPath, html);
    })
}
