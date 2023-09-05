/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

const question = {
    type: "input",
    name: "url",
    message: "enter url to convert to qr-code: "
};
const questions = [question];

inquirer.prompt(questions).then((answers)=>{
    //console.log(`the url you entered was: ${answers.url}`);
    const userEnteredURL = answers.url;
    const txtFileName = userEnteredURL+'.txt';
    fs.writeFile(txtFileName, userEnteredURL,(err)=>{
        if (err) {
            console.log(err);
        }else{
            console.log('txt file written successfully');
        }
    });
    const qr_svg = qr.image(userEnteredURL, {type:'png'});
    qr_svg.pipe(fs.createWriteStream(`${userEnteredURL}.png`));
    console.log('png file created successfully');

}).catch((error)=>{
    if (error.isTtyError) {
        console.log('failed to render in the current environment');
    }else{
        console.log(error);
    }
})