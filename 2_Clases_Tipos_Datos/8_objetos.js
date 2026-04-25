const developer1 = {
    name: "Carlos",
    age : 28,
    isEmployed: true,
    skills : ["javascript", "Python","HTML","CSS"],
    passwd: "123456"
};

const developer2 = {
    name: "Ana",
    age : 18,
    isEmployed: true,
    skills : ["javascript", "Python","HTML","CSS"],
    passwd: "rosita234567"
};

let programadores = [developer1, developer2]
console.log(programadores);

if((developer1.passwd==="123456")&&(developer1.name==="Carlos")){
    console.log("Welcome Charles");
}else{
    console.log("Fuck off, i'm calling the police");
}