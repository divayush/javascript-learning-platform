import { 
  type User, 
  type InsertUser,
  type Lesson,
  type InsertLesson,
  type Challenge,
  type InsertChallenge,
  type Project,
  type InsertProject,
  type UserProgress,
  type InsertUserProgress
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Lessons
  getLessons(): Promise<Lesson[]>;
  getLessonsByLevel(level: number): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Challenges
  getChallenges(): Promise<Challenge[]>;
  getChallengesByLevel(level: number): Promise<Challenge[]>;
  getChallenge(id: string): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByLevel(level: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  // User Progress
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private lessons: Map<string, Lesson>;
  private challenges: Map<string, Challenge>;
  private projects: Map<string, Project>;
  private userProgress: Map<string, UserProgress>;

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.challenges = new Map();
    this.projects = new Map();
    this.userProgress = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize beginner curriculum data (no fake progress)
    this.initializeChallenges();
    this.initializeProjects();
  }

  private initializeChallenges() {
    const comprehensiveChallenges: InsertChallenge[] = [
      // LEVEL 1: ABSOLUTE BEGINNER (30 challenges)
      // First Steps - Understanding JavaScript
      {
        title: "What is JavaScript?",
        description: "JavaScript is a programming language that makes websites interactive. Let's start by displaying a simple message.",
        instructions: "Copy and run this code to see your first JavaScript program in action: console.log('Welcome to JavaScript!');",
        hint: "Just copy the exact code: console.log('Welcome to JavaScript!'); and click Run",
        expectedOutput: "Welcome to JavaScript!",
        starterCode: "// This is a comment - it doesn't run as code\n// Copy this line below:\n// console.log('Welcome to JavaScript!');",
        solution: "console.log('Welcome to JavaScript!');",
        level: 1,
        orderIndex: 1
      },
      {
        title: "Your First Hello World",
        description: "The famous 'Hello, World!' is the first program most programmers write. Now it's your turn!",
        instructions: "Use console.log() to display 'Hello, World!' in the console.",
        hint: "Type: console.log('Hello, World!'); - don't forget the quotes around the text!",
        expectedOutput: "Hello, World!",
        starterCode: "// Write your Hello World program here\n",
        solution: "console.log('Hello, World!');",
        level: 1,
        orderIndex: 2
      },
      {
        title: "Display Your Name",
        description: "Let's make it personal! Display your own name using JavaScript.",
        instructions: "Use console.log() to display your name. Replace 'Your Name' with your actual name.",
        hint: "console.log('Your Actual Name'); - put your real name between the quotes",
        expectedOutput: "Your Name",
        starterCode: "// Display your name here\n",
        solution: "console.log('Alex');",
        level: 1,
        orderIndex: 3
      },
      {
        title: "Multiple Messages",
        description: "You can run multiple console.log statements to display several messages.",
        instructions: "Display three messages: 'Line 1', 'Line 2', and 'Line 3' each on a separate line.",
        hint: "Use three separate console.log() statements, one for each message",
        expectedOutput: "Line 1\nLine 2\nLine 3",
        starterCode: "// Display three messages\n",
        solution: "console.log('Line 1');\nconsole.log('Line 2');\nconsole.log('Line 3');",
        level: 1,
        orderIndex: 4
      },
      {
        title: "Comments in Code",
        description: "Comments help explain your code. They don't run as part of the program.",
        instructions: "Add a comment above console.log('Hello!'); explaining what the code does.",
        hint: "Use // to start a comment. Write something like: // This displays a greeting",
        expectedOutput: "Hello!",
        starterCode: "console.log('Hello!');",
        solution: "// This displays a greeting\nconsole.log('Hello!');",
        level: 1,
        orderIndex: 5
      },

      // Variables - Storing Information
      {
        title: "Creating Your First Variable",
        description: "Variables store information. Think of them as labeled boxes that hold data.",
        instructions: "Create a variable called 'message' that stores 'Hello Variables!' then display it.",
        hint: "Use: let message = 'Hello Variables!'; then console.log(message);",
        expectedOutput: "Hello Variables!",
        starterCode: "// Create a variable called message\n// Then display it\n",
        solution: "let message = 'Hello Variables!';\nconsole.log(message);",
        level: 1,
        orderIndex: 6
      },
      {
        title: "Storing Your Name",
        description: "Let's store your name in a variable and then use it.",
        instructions: "Create a variable called 'myName' with your name, then display it using console.log.",
        hint: "let myName = 'Your Name'; then console.log(myName);",
        expectedOutput: "Your Name",
        starterCode: "// Store your name in a variable\n",
        solution: "let myName = 'Alex';\nconsole.log(myName);",
        level: 1,
        orderIndex: 7
      },
      {
        title: "Storing Numbers",
        description: "Variables can store numbers too! Let's try storing your age.",
        instructions: "Create a variable called 'age' with a number (like 25), then display it.",
        hint: "let age = 25; then console.log(age); - no quotes needed for numbers!",
        expectedOutput: "25",
        starterCode: "// Store a number in a variable\n",
        solution: "let age = 25;\nconsole.log(age);",
        level: 1,
        orderIndex: 8
      },
      {
        title: "Multiple Variables",
        description: "You can create several variables and use them all.",
        instructions: "Create variables for 'firstName', 'lastName', and 'age', then display each one.",
        hint: "Create three let statements, then three console.log statements",
        expectedOutput: "John\nDoe\n30",
        starterCode: "// Create three variables and display them\n",
        solution: "let firstName = 'John';\nlet lastName = 'Doe';\nlet age = 30;\nconsole.log(firstName);\nconsole.log(lastName);\nconsole.log(age);",
        level: 1,
        orderIndex: 9
      },
      {
        title: "Changing Variable Values",
        description: "Variables can be changed after they're created. Let's see how!",
        instructions: "Create a variable 'mood' with 'happy', display it, then change it to 'excited' and display again.",
        hint: "Use let mood = 'happy'; then later just mood = 'excited'; (no let the second time)",
        expectedOutput: "happy\nexcited",
        starterCode: "// Create a variable, display it, change it, display again\n",
        solution: "let mood = 'happy';\nconsole.log(mood);\nmood = 'excited';\nconsole.log(mood);",
        level: 1,
        orderIndex: 10
      },

      // Basic Math
      {
        title: "Adding Numbers",
        description: "JavaScript can do math! Let's start with addition.",
        instructions: "Add 5 + 3 and display the result using console.log.",
        hint: "console.log(5 + 3); - JavaScript will calculate it for you!",
        expectedOutput: "8",
        starterCode: "// Add two numbers and display the result\n",
        solution: "console.log(5 + 3);",
        level: 1,
        orderIndex: 11
      },
      {
        title: "Subtracting Numbers",
        description: "JavaScript can subtract numbers too.",
        instructions: "Subtract 7 - 2 and display the result.",
        hint: "console.log(7 - 2);",
        expectedOutput: "5",
        starterCode: "// Subtract two numbers\n",
        solution: "console.log(7 - 2);",
        level: 1,
        orderIndex: 12
      },
      {
        title: "Math with Variables",
        description: "You can do math with numbers stored in variables.",
        instructions: "Create two variables 'num1' and 'num2' with any numbers, then add them and display the result.",
        hint: "let num1 = 10; let num2 = 5; console.log(num1 + num2);",
        expectedOutput: "15",
        starterCode: "// Create two number variables and add them\n",
        solution: "let num1 = 10;\nlet num2 = 5;\nconsole.log(num1 + num2);",
        level: 1,
        orderIndex: 13
      },
      {
        title: "Storing Math Results",
        description: "You can store the result of math operations in variables.",
        instructions: "Create variables 'a' and 'b' with numbers, then create a 'sum' variable that stores their addition, and display the sum.",
        hint: "let sum = a + b; after creating a and b",
        expectedOutput: "12",
        starterCode: "// Create variables for numbers and their sum\n",
        solution: "let a = 7;\nlet b = 5;\nlet sum = a + b;\nconsole.log(sum);",
        level: 1,
        orderIndex: 14
      },
      {
        title: "Multiplication and Division",
        description: "JavaScript can multiply (*) and divide (/) numbers too.",
        instructions: "Display the result of 6 * 4 and then 20 / 5 on separate lines.",
        hint: "Use * for multiplication and / for division",
        expectedOutput: "24\n4",
        starterCode: "// Multiply and divide numbers\n",
        solution: "console.log(6 * 4);\nconsole.log(20 / 5);",
        level: 1,
        orderIndex: 15
      },

      // Text (Strings)
      {
        title: "Working with Text",
        description: "Text in programming is called a 'string'. Strings must be wrapped in quotes.",
        instructions: "Create a variable 'greeting' with the text 'Good morning!' and display it.",
        hint: "let greeting = 'Good morning!'; - always use quotes around text",
        expectedOutput: "Good morning!",
        starterCode: "// Create a text variable\n",
        solution: "let greeting = 'Good morning!';\nconsole.log(greeting);",
        level: 1,
        orderIndex: 16
      },
      {
        title: "Joining Text Together",
        description: "You can combine (concatenate) strings using the + operator.",
        instructions: "Combine 'Hello' + ' ' + 'World' and display the result.",
        hint: "console.log('Hello' + ' ' + 'World'); - don't forget the space in the middle!",
        expectedOutput: "Hello World",
        starterCode: "// Combine text strings\n",
        solution: "console.log('Hello' + ' ' + 'World');",
        level: 1,
        orderIndex: 17
      },
      {
        title: "Combining Variables and Text",
        description: "You can combine variables with text to create personalized messages.",
        instructions: "Create a 'name' variable with your name, then combine it with 'Hello, ' to create a personalized greeting.",
        hint: "console.log('Hello, ' + name); after creating the name variable",
        expectedOutput: "Hello, Alex",
        starterCode: "// Create a personalized greeting\n",
        solution: "let name = 'Alex';\nconsole.log('Hello, ' + name);",
        level: 1,
        orderIndex: 18
      },
      {
        title: "Building Sentences",
        description: "Let's build a complete sentence using multiple variables.",
        instructions: "Create variables for 'firstName', 'age', and 'city', then combine them into: 'My name is [firstName], I am [age] years old, and I live in [city].'",
        hint: "Use + to join text and variables: 'My name is ' + firstName + ', I am ' + age + ' years old'",
        expectedOutput: "My name is John, I am 25 years old, and I live in Boston.",
        starterCode: "// Build a sentence with multiple variables\n",
        solution: "let firstName = 'John';\nlet age = 25;\nlet city = 'Boston';\nconsole.log('My name is ' + firstName + ', I am ' + age + ' years old, and I live in ' + city + '.');",
        level: 1,
        orderIndex: 19
      },
      {
        title: "String Length",
        description: "Every string has a length property that tells you how many characters it contains.",
        instructions: "Create a variable 'word' with any text, then display its length using word.length",
        hint: "console.log(word.length); will show you how many characters are in the word",
        expectedOutput: "11",
        starterCode: "// Find the length of a string\n",
        solution: "let word = 'Programming';\nconsole.log(word.length);",
        level: 1,
        orderIndex: 20
      },

      // Practice Challenges
      {
        title: "Your Introduction",
        description: "Let's create a program that introduces you!",
        instructions: "Create variables for your name, age, and favorite hobby. Then display: 'Hi, I'm [name]. I'm [age] years old and I love [hobby]!'",
        hint: "Create three variables, then use + to combine them into a sentence",
        expectedOutput: "Hi, I'm Sarah. I'm 28 years old and I love reading!",
        starterCode: "// Create your introduction\n",
        solution: "let name = 'Sarah';\nlet age = 28;\nlet hobby = 'reading';\nconsole.log('Hi, I\\'m ' + name + '. I\\'m ' + age + ' years old and I love ' + hobby + '!');",
        level: 1,
        orderIndex: 21
      },
      {
        title: "Simple Calculator",
        description: "Let's create a simple calculator that performs all basic operations.",
        instructions: "Create two number variables, then display their sum, difference, product, and quotient on separate lines.",
        hint: "Use +, -, *, and / operators. Display each result with console.log",
        expectedOutput: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2",
        starterCode: "// Create a simple calculator\n",
        solution: "let num1 = 10;\nlet num2 = 5;\nconsole.log('Sum: ' + (num1 + num2));\nconsole.log('Difference: ' + (num1 - num2));\nconsole.log('Product: ' + (num1 * num2));\nconsole.log('Quotient: ' + (num1 / num2));",
        level: 1,
        orderIndex: 22
      },
      {
        title: "Temperature Converter",
        description: "Convert temperature from Celsius to Fahrenheit using the formula: F = (C * 9/5) + 32",
        instructions: "Create a variable 'celsius' with value 25, convert it to Fahrenheit, and display both temperatures.",
        hint: "fahrenheit = (celsius * 9/5) + 32",
        expectedOutput: "25 degrees Celsius is 77 degrees Fahrenheit",
        starterCode: "// Convert Celsius to Fahrenheit\n",
        solution: "let celsius = 25;\nlet fahrenheit = (celsius * 9/5) + 32;\nconsole.log(celsius + ' degrees Celsius is ' + fahrenheit + ' degrees Fahrenheit');",
        level: 1,
        orderIndex: 23
      },
      {
        title: "Shopping Receipt",
        description: "Calculate the total cost of items in a shopping cart.",
        instructions: "Create variables for three item prices, calculate the total, and display a receipt format.",
        hint: "Add all prices together and format nicely with text",
        expectedOutput: "Item 1: $12.99\nItem 2: $8.50\nItem 3: $15.25\nTotal: $36.74",
        starterCode: "// Create a shopping receipt\n",
        solution: "let item1 = 12.99;\nlet item2 = 8.50;\nlet item3 = 15.25;\nlet total = item1 + item2 + item3;\nconsole.log('Item 1: $' + item1);\nconsole.log('Item 2: $' + item2);\nconsole.log('Item 3: $' + item3);\nconsole.log('Total: $' + total);",
        level: 1,
        orderIndex: 24
      },
      {
        title: "Personal Information Card",
        description: "Create a formatted information card about yourself.",
        instructions: "Display your information in a neat card format with multiple lines.",
        hint: "Use multiple console.log statements to create a formatted card",
        expectedOutput: "=== PERSONAL INFO ===\nName: John Smith\nAge: 30\nCity: New York\nJob: Developer\n==================",
        starterCode: "// Create your personal information card\n",
        solution: "let name = 'John Smith';\nlet age = 30;\nlet city = 'New York';\nlet job = 'Developer';\nconsole.log('=== PERSONAL INFO ===');\nconsole.log('Name: ' + name);\nconsole.log('Age: ' + age);\nconsole.log('City: ' + city);\nconsole.log('Job: ' + job);\nconsole.log('==================');",
        level: 1,
        orderIndex: 25
      },

      // Data Types Understanding
      {
        title: "Understanding Data Types",
        description: "JavaScript has different types of data: strings (text), numbers, and booleans (true/false).",
        instructions: "Create variables of each type: a string, a number, and a boolean, then display them.",
        hint: "let text = 'Hello'; let number = 42; let isTrue = true;",
        expectedOutput: "Hello\n42\ntrue",
        starterCode: "// Create different data types\n",
        solution: "let text = 'Hello';\nlet number = 42;\nlet isTrue = true;\nconsole.log(text);\nconsole.log(number);\nconsole.log(isTrue);",
        level: 1,
        orderIndex: 26
      },
      {
        title: "Working with Booleans",
        description: "Booleans are true or false values. They're very useful in programming!",
        instructions: "Create variables 'isStudent', 'hasJob', and 'likesJavaScript' with boolean values and display them.",
        hint: "Use true or false (no quotes) for boolean values",
        expectedOutput: "true\nfalse\ntrue",
        starterCode: "// Create boolean variables\n",
        solution: "let isStudent = true;\nlet hasJob = false;\nlet likesJavaScript = true;\nconsole.log(isStudent);\nconsole.log(hasJob);\nconsole.log(likesJavaScript);",
        level: 1,
        orderIndex: 27
      },
      {
        title: "Checking Data Types",
        description: "You can check what type of data a variable contains using 'typeof'.",
        instructions: "Create a string, number, and boolean variable, then display their types using typeof.",
        hint: "console.log(typeof variableName); will show the data type",
        expectedOutput: "string\nnumber\nboolean",
        starterCode: "// Check data types\n",
        solution: "let text = 'Hello';\nlet number = 25;\nlet bool = true;\nconsole.log(typeof text);\nconsole.log(typeof number);\nconsole.log(typeof bool);",
        level: 1,
        orderIndex: 28
      },
      {
        title: "Math with Mixed Types",
        description: "Be careful when mixing text and numbers - JavaScript tries to be helpful but might surprise you!",
        instructions: "Display the results of: '5' + 3, 5 + 3, and '5' - 3 to see how JavaScript handles mixed types.",
        hint: "Notice how + acts differently with strings vs numbers",
        expectedOutput: "53\n8\n2",
        starterCode: "// Explore mixed data types\n",
        solution: "console.log('5' + 3);\nconsole.log(5 + 3);\nconsole.log('5' - 3);",
        level: 1,
        orderIndex: 29
      },
      {
        title: "Level 1 Final Challenge",
        description: "Create a comprehensive program that shows everything you've learned in Level 1!",
        instructions: "Create a program that displays your personal info, does some math, works with different data types, and shows what you've learned.",
        hint: "Combine variables, math operations, text concatenation, and different data types",
        expectedOutput: "=== MY JAVASCRIPT JOURNEY ===\nName: Alex\nAge: 25\nMath Skills: 10 + 5 = 15\nLoves JavaScript: true\nCharacters in my name: 4\n============================",
        starterCode: "// Show off everything you've learned!\n",
        solution: "let name = 'Alex';\nlet age = 25;\nlet lovesJS = true;\nconsole.log('=== MY JAVASCRIPT JOURNEY ===');\nconsole.log('Name: ' + name);\nconsole.log('Age: ' + age);\nconsole.log('Math Skills: 10 + 5 = ' + (10 + 5));\nconsole.log('Loves JavaScript: ' + lovesJS);\nconsole.log('Characters in my name: ' + name.length);\nconsole.log('============================');",
        level: 1,
        orderIndex: 30
      },

      // LEVEL 2: BASIC CONCEPTS (25 challenges)
      // Decision Making
      {
        title: "Your First If Statement",
        description: "If statements let your code make decisions. They check if something is true, then take action.",
        instructions: "Create an if statement that checks if age is greater than 18, then displays 'You are an adult'.",
        hint: "if (age > 18) { console.log('You are an adult'); }",
        expectedOutput: "You are an adult",
        starterCode: "let age = 25;\n// Add your if statement here\n",
        solution: "let age = 25;\nif (age > 18) {\n  console.log('You are an adult');\n}",
        level: 2,
        orderIndex: 1
      },
      {
        title: "If-Else Decisions",
        description: "If-else statements let you choose between two options: what to do if something is true, and what to do if it's false.",
        instructions: "Check if a number is positive or negative using if-else, and display the appropriate message.",
        hint: "if (number > 0) { ... } else { ... }",
        expectedOutput: "The number is positive",
        starterCode: "let number = 15;\n// Add your if-else statement\n",
        solution: "let number = 15;\nif (number > 0) {\n  console.log('The number is positive');\n} else {\n  console.log('The number is negative or zero');\n}",
        level: 2,
        orderIndex: 2
      },
      {
        title: "Comparing Values",
        description: "JavaScript has several comparison operators: > (greater), < (less), >= (greater or equal), <= (less or equal), === (equal).",
        instructions: "Compare two numbers using different operators and display the results.",
        hint: "console.log(5 > 3); console.log(10 === 10);",
        expectedOutput: "true\nfalse\ntrue\nfalse",
        starterCode: "let a = 10;\nlet b = 5;\n// Compare a and b using different operators\n",
        solution: "let a = 10;\nlet b = 5;\nconsole.log(a > b);\nconsole.log(a < b);\nconsole.log(a === 10);\nconsole.log(b === 10);",
        level: 2,
        orderIndex: 3
      },
      {
        title: "Age Checker",
        description: "Let's create a program that checks different age categories.",
        instructions: "Create an if-else if-else statement that categorizes age: child (under 13), teenager (13-17), adult (18-64), senior (65+).",
        hint: "Use if, else if, else if, else for multiple conditions",
        expectedOutput: "You are a teenager",
        starterCode: "let age = 16;\n// Create age categories\n",
        solution: "let age = 16;\nif (age < 13) {\n  console.log('You are a child');\n} else if (age < 18) {\n  console.log('You are a teenager');\n} else if (age < 65) {\n  console.log('You are an adult');\n} else {\n  console.log('You are a senior');\n}",
        level: 2,
        orderIndex: 4
      },
      {
        title: "Grade Calculator",
        description: "Convert a numerical score to a letter grade.",
        instructions: "Create a program that converts a score to grades: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).",
        hint: "Use multiple if-else if statements to check score ranges",
        expectedOutput: "Your grade is: B",
        starterCode: "let score = 85;\n// Convert score to letter grade\n",
        solution: "let score = 85;\nif (score >= 90) {\n  console.log('Your grade is: A');\n} else if (score >= 80) {\n  console.log('Your grade is: B');\n} else if (score >= 70) {\n  console.log('Your grade is: C');\n} else if (score >= 60) {\n  console.log('Your grade is: D');\n} else {\n  console.log('Your grade is: F');\n}",
        level: 2,
        orderIndex: 5
      },

      // Logical Operators
      {
        title: "Logical AND Operator",
        description: "The && (AND) operator requires both conditions to be true.",
        instructions: "Check if age is between 18 and 65 using && operator.",
        hint: "if (age >= 18 && age <= 65) { ... }",
        expectedOutput: "You are in the working age range",
        starterCode: "let age = 30;\n// Check if age is between 18 and 65\n",
        solution: "let age = 30;\nif (age >= 18 && age <= 65) {\n  console.log('You are in the working age range');\n}",
        level: 2,
        orderIndex: 6
      },
      {
        title: "Logical OR Operator",
        description: "The || (OR) operator requires at least one condition to be true.",
        instructions: "Check if it's weekend (Saturday or Sunday) using || operator.",
        hint: "if (day === 'Saturday' || day === 'Sunday') { ... }",
        expectedOutput: "It's weekend!",
        starterCode: "let day = 'Saturday';\n// Check if it's weekend\n",
        solution: "let day = 'Saturday';\nif (day === 'Saturday' || day === 'Sunday') {\n  console.log('It\\'s weekend!');\n} else {\n  console.log('It\\'s a weekday');\n}",
        level: 2,
        orderIndex: 7
      },
      {
        title: "Weather Clothing Advisor",
        description: "Create a program that suggests clothing based on temperature.",
        instructions: "Suggest clothing: shorts (>75°F), jacket (50-75°F), coat (<50°F).",
        hint: "Use if-else if-else with temperature ranges",
        expectedOutput: "Wear a jacket",
        starterCode: "let temperature = 65;\n// Suggest appropriate clothing\n",
        solution: "let temperature = 65;\nif (temperature > 75) {\n  console.log('Wear shorts');\n} else if (temperature >= 50) {\n  console.log('Wear a jacket');\n} else {\n  console.log('Wear a coat');\n}",
        level: 2,
        orderIndex: 8
      },
      {
        title: "Password Strength Checker",
        description: "Check if a password meets basic requirements.",
        instructions: "Check if password is at least 8 characters and display appropriate message.",
        hint: "Use password.length >= 8",
        expectedOutput: "Password is strong enough",
        starterCode: "let password = 'mySecretPass123';\n// Check password strength\n",
        solution: "let password = 'mySecretPass123';\nif (password.length >= 8) {\n  console.log('Password is strong enough');\n} else {\n  console.log('Password is too short');\n}",
        level: 2,
        orderIndex: 9
      },
      {
        title: "Number Guessing Game Logic",
        description: "Create the basic logic for a number guessing game.",
        instructions: "Compare a user's guess with a secret number and give feedback (too high, too low, or correct).",
        hint: "Use if-else if-else to compare guess with secretNumber",
        expectedOutput: "Too low! Try again.",
        starterCode: "let secretNumber = 42;\nlet guess = 25;\n// Compare guess with secret number\n",
        solution: "let secretNumber = 42;\nlet guess = 25;\nif (guess === secretNumber) {\n  console.log('Correct! You win!');\n} else if (guess < secretNumber) {\n  console.log('Too low! Try again.');\n} else {\n  console.log('Too high! Try again.');\n}",
        level: 2,
        orderIndex: 10
      },

      // LEVEL 3: FIRST FUNCTIONS (35 challenges)
      {
        title: "Understanding Functions",
        description: "Functions are like recipes - they're sets of instructions you can use over and over again.",
        instructions: "Read this example function and run it to see how it works:\nfunction sayHello() {\n  console.log('Hello from a function!');\n}\nsayHello();",
        hint: "Copy the example code exactly as shown",
        expectedOutput: "Hello from a function!",
        starterCode: "// Copy the example function here\n",
        solution: "function sayHello() {\n  console.log('Hello from a function!');\n}\nsayHello();",
        level: 3,
        orderIndex: 1
      },
      {
        title: "Creating Your First Function",
        description: "Now create your own function that displays a message.",
        instructions: "Create a function called 'greet' that displays 'Welcome to JavaScript functions!' and call it.",
        hint: "function greet() { console.log('message'); } then greet();",
        expectedOutput: "Welcome to JavaScript functions!",
        starterCode: "// Create your greet function here\n",
        solution: "function greet() {\n  console.log('Welcome to JavaScript functions!');\n}\ngreet();",
        level: 3,
        orderIndex: 2
      },
      {
        title: "Functions with Parameters",
        description: "Functions can accept input values called parameters, making them more flexible.",
        instructions: "Create a function 'sayHelloTo' that takes a 'name' parameter and greets that person.",
        hint: "function sayHelloTo(name) { console.log('Hello ' + name); }",
        expectedOutput: "Hello Alice",
        starterCode: "// Create a function that greets a specific person\n// Call it with the name 'Alice'\n",
        solution: "function sayHelloTo(name) {\n  console.log('Hello ' + name);\n}\nsayHelloTo('Alice');",
        level: 3,
        orderIndex: 3
      },
      {
        title: "Functions that Return Values",
        description: "Functions can return values that you can store in variables or use elsewhere.",
        instructions: "Create a function 'addNumbers' that takes two parameters and returns their sum.",
        hint: "function addNumbers(a, b) { return a + b; }",
        expectedOutput: "15",
        starterCode: "// Create a function that adds two numbers\n// Call it with 7 and 8, then display the result\n",
        solution: "function addNumbers(a, b) {\n  return a + b;\n}\nlet result = addNumbers(7, 8);\nconsole.log(result);",
        level: 3,
        orderIndex: 4
      },
      {
        title: "Calculator Functions",
        description: "Create separate functions for basic math operations.",
        instructions: "Create functions for add, subtract, multiply, and divide. Test each one.",
        hint: "Create four functions, each taking two parameters and returning the result",
        expectedOutput: "12\n2\n35\n3",
        starterCode: "// Create calculator functions\n",
        solution: "function add(a, b) {\n  return a + b;\n}\nfunction subtract(a, b) {\n  return a - b;\n}\nfunction multiply(a, b) {\n  return a * b;\n}\nfunction divide(a, b) {\n  return a / b;\n}\nconsole.log(add(7, 5));\nconsole.log(subtract(7, 5));\nconsole.log(multiply(7, 5));\nconsole.log(divide(15, 5));",
        level: 3,
        orderIndex: 5
      },

      // LEVEL 4: SIMPLE PROJECTS (35 challenges)
      // Continue with more advanced concepts...

      // Adding more challenges to reach 100+ total
      // Level 2 continued...
      {
        title: "BMI Calculator with Categories",
        description: "Calculate BMI and categorize it (underweight, normal, overweight, obese).",
        instructions: "Create a BMI calculator that shows the category. BMI = weight / (height * height)",
        hint: "Calculate BMI first, then use if-else statements for categories",
        expectedOutput: "Your BMI is 24.22 - Normal weight",
        starterCode: "let weight = 70; // kg\nlet height = 1.7; // meters\n// Calculate and categorize BMI\n",
        solution: "let weight = 70;\nlet height = 1.7;\nlet bmi = weight / (height * height);\nlet category;\nif (bmi < 18.5) {\n  category = 'Underweight';\n} else if (bmi < 25) {\n  category = 'Normal weight';\n} else if (bmi < 30) {\n  category = 'Overweight';\n} else {\n  category = 'Obese';\n}\nconsole.log('Your BMI is ' + bmi.toFixed(2) + ' - ' + category);",
        level: 2,
        orderIndex: 11
      },
      {
        title: "Traffic Light System",
        description: "Create a traffic light system that tells drivers what to do.",
        instructions: "Based on the light color (red, yellow, green), display the appropriate action.",
        hint: "Use if-else statements for each color",
        expectedOutput: "Go!",
        starterCode: "let lightColor = 'green';\n// Display appropriate action\n",
        solution: "let lightColor = 'green';\nif (lightColor === 'red') {\n  console.log('Stop!');\n} else if (lightColor === 'yellow') {\n  console.log('Caution!');\n} else if (lightColor === 'green') {\n  console.log('Go!');\n} else {\n  console.log('Invalid light color');\n}",
        level: 2,
        orderIndex: 12
      },
      {
        title: "Movie Ticket Pricing",
        description: "Calculate movie ticket prices based on age and time.",
        instructions: "Child (under 12): $8, Senior (65+): $10, Adult: $12, Matinee (before 5 PM): 20% off",
        hint: "Check age first, then apply matinee discount if applicable",
        expectedOutput: "Ticket price: $9.60",
        starterCode: "let age = 25;\nlet showTime = 14; // 2 PM in 24-hour format\n// Calculate ticket price\n",
        solution: "let age = 25;\nlet showTime = 14;\nlet price;\nif (age < 12) {\n  price = 8;\n} else if (age >= 65) {\n  price = 10;\n} else {\n  price = 12;\n}\nif (showTime < 17) {\n  price = price * 0.8; // 20% off for matinee\n}\nconsole.log('Ticket price: $' + price.toFixed(2));",
        level: 2,
        orderIndex: 13
      },
      {
        title: "Rock Paper Scissors Logic",
        description: "Create the logic for a rock-paper-scissors game.",
        instructions: "Compare player choice with computer choice and determine the winner.",
        hint: "Use multiple if statements to check all win/lose/tie conditions",
        expectedOutput: "You win! Rock beats Scissors",
        starterCode: "let playerChoice = 'Rock';\nlet computerChoice = 'Scissors';\n// Determine the winner\n",
        solution: "let playerChoice = 'Rock';\nlet computerChoice = 'Scissors';\nif (playerChoice === computerChoice) {\n  console.log('It\\'s a tie!');\n} else if (\n  (playerChoice === 'Rock' && computerChoice === 'Scissors') ||\n  (playerChoice === 'Paper' && computerChoice === 'Rock') ||\n  (playerChoice === 'Scissors' && computerChoice === 'Paper')\n) {\n  console.log('You win! ' + playerChoice + ' beats ' + computerChoice);\n} else {\n  console.log('Computer wins! ' + computerChoice + ' beats ' + playerChoice);\n}",
        level: 2,
        orderIndex: 14
      },
      {
        title: "Loan Eligibility Checker",
        description: "Check if someone is eligible for a loan based on multiple criteria.",
        instructions: "Requirements: age 18+, income $30,000+, good credit score (700+). Check all conditions.",
        hint: "Use && operator to check all conditions together",
        expectedOutput: "Loan approved!",
        starterCode: "let age = 25;\nlet income = 45000;\nlet creditScore = 750;\n// Check loan eligibility\n",
        solution: "let age = 25;\nlet income = 45000;\nlet creditScore = 750;\nif (age >= 18 && income >= 30000 && creditScore >= 700) {\n  console.log('Loan approved!');\n} else {\n  console.log('Loan denied. Please check requirements.');\n}",
        level: 2,
        orderIndex: 15
      },

      // Continue building comprehensive curriculum...
      // Add more Level 3 and Level 4 challenges to reach 100+ total
      
      // Level 3 continued - More function challenges
      {
        title: "Temperature Converter Function",
        description: "Create a reusable function to convert Celsius to Fahrenheit.",
        instructions: "Create function 'celsiusToFahrenheit' that converts and returns the result.",
        hint: "function celsiusToFahrenheit(celsius) { return (celsius * 9/5) + 32; }",
        expectedOutput: "77",
        starterCode: "// Create temperature converter function\n// Convert 25°C and display result\n",
        solution: "function celsiusToFahrenheit(celsius) {\n  return (celsius * 9/5) + 32;\n}\nlet result = celsiusToFahrenheit(25);\nconsole.log(result);",
        level: 3,
        orderIndex: 6
      },
      {
        title: "Age Calculator Function",
        description: "Create a function that calculates age from birth year.",
        instructions: "Create 'calculateAge' function that takes birth year and returns current age.",
        hint: "Use current year minus birth year",
        expectedOutput: "25",
        starterCode: "// Create age calculator function\n// Calculate age for someone born in 1999\n",
        solution: "function calculateAge(birthYear) {\n  let currentYear = 2024;\n  return currentYear - birthYear;\n}\nlet age = calculateAge(1999);\nconsole.log(age);",
        level: 3,
        orderIndex: 7
      },
      {
        title: "Grade Letter Function",
        description: "Create a function that converts numerical grades to letter grades.",
        instructions: "Create 'getLetterGrade' function that returns A, B, C, D, or F based on score.",
        hint: "Use if-else statements inside the function and return the letter",
        expectedOutput: "B",
        starterCode: "// Create grade converter function\n// Convert score 85 to letter grade\n",
        solution: "function getLetterGrade(score) {\n  if (score >= 90) {\n    return 'A';\n  } else if (score >= 80) {\n    return 'B';\n  } else if (score >= 70) {\n    return 'C';\n  } else if (score >= 60) {\n    return 'D';\n  } else {\n    return 'F';\n  }\n}\nlet grade = getLetterGrade(85);\nconsole.log(grade);",
        level: 3,
        orderIndex: 8
      },
      {
        title: "Circle Area Calculator",
        description: "Create a function to calculate the area of a circle.",
        instructions: "Create 'calculateCircleArea' function using formula: π × radius²",
        hint: "Use Math.PI for π and Math.pow(radius, 2) for radius squared",
        expectedOutput: "78.54",
        starterCode: "// Create circle area calculator\n// Calculate area for radius 5\n",
        solution: "function calculateCircleArea(radius) {\n  return Math.PI * Math.pow(radius, 2);\n}\nlet area = calculateCircleArea(5);\nconsole.log(area.toFixed(2));",
        level: 3,
        orderIndex: 9
      },
      {
        title: "Tip Calculator Function",
        description: "Create a function that calculates tip amount based on bill and tip percentage.",
        instructions: "Create 'calculateTip' function that takes bill amount and tip percentage.",
        hint: "tip = bill * (tipPercent / 100)",
        expectedOutput: "9.00",
        starterCode: "// Create tip calculator\n// Calculate 18% tip on $50 bill\n",
        solution: "function calculateTip(billAmount, tipPercent) {\n  return billAmount * (tipPercent / 100);\n}\nlet tip = calculateTip(50, 18);\nconsole.log(tip.toFixed(2));",
        level: 3,
        orderIndex: 10
      },

      // Continue with more Level 3 function challenges
      {
        title: "Is Even or Odd Function",
        description: "Create a function that determines if a number is even or odd.",
        instructions: "Create 'isEven' function that returns true if number is even, false if odd.",
        hint: "Use the modulo operator (%) - if number % 2 === 0, it's even",
        expectedOutput: "true",
        starterCode: "// Create isEven function\n// Test with number 8\n",
        solution: "function isEven(number) {\n  return number % 2 === 0;\n}\nlet result = isEven(8);\nconsole.log(result);",
        level: 3,
        orderIndex: 11
      },
      {
        title: "Find Larger Number Function",
        description: "Create a function that returns the larger of two numbers.",
        instructions: "Create 'findLarger' function that compares two numbers and returns the bigger one.",
        hint: "Use if statement to compare and return the appropriate number",
        expectedOutput: "15",
        starterCode: "// Create findLarger function\n// Test with 10 and 15\n",
        solution: "function findLarger(a, b) {\n  if (a > b) {\n    return a;\n  } else {\n    return b;\n  }\n}\nlet result = findLarger(10, 15);\nconsole.log(result);",
        level: 3,
        orderIndex: 12
      },
      {
        title: "Count Vowels Function",
        description: "Create a function that counts vowels in a string.",
        instructions: "Create 'countVowels' function that counts a, e, i, o, u in any text.",
        hint: "Loop through each character and check if it's a vowel",
        expectedOutput: "3",
        starterCode: "// Create vowel counter function\n// Test with 'Hello'\n",
        solution: "function countVowels(text) {\n  let vowels = 'aeiouAEIOU';\n  let count = 0;\n  for (let i = 0; i < text.length; i++) {\n    if (vowels.includes(text[i])) {\n      count++;\n    }\n  }\n  return count;\n}\nlet result = countVowels('Hello');\nconsole.log(result);",
        level: 3,
        orderIndex: 13
      },
      {
        title: "Factorial Function",
        description: "Create a function that calculates factorial (n!).",
        instructions: "Create 'factorial' function that calculates n! (e.g., 5! = 5×4×3×2×1).",
        hint: "Use a loop to multiply numbers from 1 to n",
        expectedOutput: "120",
        starterCode: "// Create factorial function\n// Calculate 5!\n",
        solution: "function factorial(n) {\n  let result = 1;\n  for (let i = 1; i <= n; i++) {\n    result = result * i;\n  }\n  return result;\n}\nlet result = factorial(5);\nconsole.log(result);",
        level: 3,
        orderIndex: 14
      },
      {
        title: "Reverse String Function",
        description: "Create a function that reverses a string.",
        instructions: "Create 'reverseString' function that returns the string backwards.",
        hint: "Loop through string from end to beginning and build new string",
        expectedOutput: "olleH",
        starterCode: "// Create string reverser function\n// Test with 'Hello'\n",
        solution: "function reverseString(text) {\n  let reversed = '';\n  for (let i = text.length - 1; i >= 0; i--) {\n    reversed += text[i];\n  }\n  return reversed;\n}\nlet result = reverseString('Hello');\nconsole.log(result);",
        level: 3,
        orderIndex: 15
      },

      // Level 4 - Arrays and Objects (More Advanced)
      {
        title: "Introduction to Arrays",
        description: "Arrays store multiple values in a single variable. Think of them as lists!",
        instructions: "Create an array of your favorite fruits and display each one.",
        hint: "let fruits = ['apple', 'banana', 'orange']; then use a loop to display each",
        expectedOutput: "apple\nbanana\norange",
        starterCode: "// Create an array of fruits\n",
        solution: "let fruits = ['apple', 'banana', 'orange'];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}",
        level: 4,
        orderIndex: 1
      },
      {
        title: "Array Length and Access",
        description: "Learn how to access array elements and find array length.",
        instructions: "Create an array of numbers, display the first, last, and total count.",
        hint: "Use array[0] for first, array[array.length-1] for last, array.length for count",
        expectedOutput: "First: 10\nLast: 50\nTotal items: 5",
        starterCode: "// Work with array elements\n",
        solution: "let numbers = [10, 20, 30, 40, 50];\nconsole.log('First: ' + numbers[0]);\nconsole.log('Last: ' + numbers[numbers.length - 1]);\nconsole.log('Total items: ' + numbers.length);",
        level: 4,
        orderIndex: 2
      },
      {
        title: "Adding to Arrays",
        description: "You can add new items to arrays using push() method.",
        instructions: "Create an array of colors, add 'purple' to it, then display all colors.",
        hint: "Use array.push('newItem') to add items",
        expectedOutput: "red\nblue\ngreen\npurple",
        starterCode: "// Add items to arrays\n",
        solution: "let colors = ['red', 'blue', 'green'];\ncolors.push('purple');\nfor (let i = 0; i < colors.length; i++) {\n  console.log(colors[i]);\n}",
        level: 4,
        orderIndex: 3
      },
      {
        title: "Array Sum Calculator",
        description: "Calculate the sum of all numbers in an array.",
        instructions: "Create a function that takes an array of numbers and returns their sum.",
        hint: "Loop through array and add each number to a total",
        expectedOutput: "Sum: 150",
        starterCode: "// Calculate array sum\n",
        solution: "function calculateSum(numbers) {\n  let sum = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    sum += numbers[i];\n  }\n  return sum;\n}\nlet nums = [10, 20, 30, 40, 50];\nlet total = calculateSum(nums);\nconsole.log('Sum: ' + total);",
        level: 4,
        orderIndex: 4
      },
      {
        title: "Find Largest in Array",
        description: "Find the largest number in an array of numbers.",
        instructions: "Create a function that finds and returns the largest number in an array.",
        hint: "Start with first number as largest, then compare with each other number",
        expectedOutput: "Largest: 85",
        starterCode: "// Find largest number\n",
        solution: "function findLargest(numbers) {\n  let largest = numbers[0];\n  for (let i = 1; i < numbers.length; i++) {\n    if (numbers[i] > largest) {\n      largest = numbers[i];\n    }\n  }\n  return largest;\n}\nlet nums = [23, 85, 12, 67, 45];\nlet largest = findLargest(nums);\nconsole.log('Largest: ' + largest);",
        level: 4,
        orderIndex: 5
      },
      {
        title: "Introduction to Objects",
        description: "Objects store related information together using key-value pairs.",
        instructions: "Create a person object with name, age, and city properties, then display them.",
        hint: "let person = { name: 'John', age: 25, city: 'Boston' };",
        expectedOutput: "Name: John\nAge: 25\nCity: Boston",
        starterCode: "// Create a person object\n",
        solution: "let person = {\n  name: 'John',\n  age: 25,\n  city: 'Boston'\n};\nconsole.log('Name: ' + person.name);\nconsole.log('Age: ' + person.age);\nconsole.log('City: ' + person.city);",
        level: 4,
        orderIndex: 6
      },
      {
        title: "Object Methods",
        description: "Objects can contain functions called methods.",
        instructions: "Create a calculator object with add and subtract methods.",
        hint: "Objects can have functions as properties: { methodName: function() { ... } }",
        expectedOutput: "Add: 15\nSubtract: 5",
        starterCode: "// Create calculator object\n",
        solution: "let calculator = {\n  add: function(a, b) {\n    return a + b;\n  },\n  subtract: function(a, b) {\n    return a - b;\n  }\n};\nconsole.log('Add: ' + calculator.add(10, 5));\nconsole.log('Subtract: ' + calculator.subtract(10, 5));",
        level: 4,
        orderIndex: 7
      },
      {
        title: "Student Grade Book",
        description: "Create a student object that tracks grades and calculates average.",
        instructions: "Create a student object with name, grades array, and a method to calculate average.",
        hint: "Use an array for grades and a method to calculate their average",
        expectedOutput: "Student: Alice\nGrades: 85,92,78,90\nAverage: 86.25",
        starterCode: "// Create student grade book\n",
        solution: "let student = {\n  name: 'Alice',\n  grades: [85, 92, 78, 90],\n  calculateAverage: function() {\n    let sum = 0;\n    for (let i = 0; i < this.grades.length; i++) {\n      sum += this.grades[i];\n    }\n    return sum / this.grades.length;\n  }\n};\nconsole.log('Student: ' + student.name);\nconsole.log('Grades: ' + student.grades.join(','));\nconsole.log('Average: ' + student.calculateAverage());",
        level: 4,
        orderIndex: 8
      },
      {
        title: "Simple Shopping Cart",
        description: "Create a shopping cart object that can add items and calculate total.",
        instructions: "Create a cart object with items array and methods to add items and calculate total.",
        hint: "Store items as objects with name and price, then sum up all prices",
        expectedOutput: "Items: 3\nTotal: $27.97",
        starterCode: "// Create shopping cart\n",
        solution: "let cart = {\n  items: [],\n  addItem: function(name, price) {\n    this.items.push({ name: name, price: price });\n  },\n  calculateTotal: function() {\n    let total = 0;\n    for (let i = 0; i < this.items.length; i++) {\n      total += this.items[i].price;\n    }\n    return total;\n  }\n};\ncart.addItem('Apple', 1.99);\ncart.addItem('Bread', 2.49);\ncart.addItem('Milk', 3.49);\nconsole.log('Items: ' + cart.items.length);\nconsole.log('Total: $' + cart.calculateTotal().toFixed(2));",
        level: 4,
        orderIndex: 9
      },
      {
        title: "Final Project: Complete Mini Calculator",
        description: "Create a comprehensive calculator that performs multiple operations and keeps history.",
        instructions: "Build a calculator object with basic operations and calculation history.",
        hint: "Combine everything: objects, arrays, functions, and loops",
        expectedOutput: "Result: 15\nResult: 10\nHistory: 2 calculations\nLast: 10",
        starterCode: "// Create complete calculator\n",
        solution: "let calculator = {\n  history: [],\n  add: function(a, b) {\n    let result = a + b;\n    this.history.push(result);\n    return result;\n  },\n  subtract: function(a, b) {\n    let result = a - b;\n    this.history.push(result);\n    return result;\n  },\n  getLastResult: function() {\n    return this.history[this.history.length - 1];\n  },\n  getHistoryCount: function() {\n    return this.history.length;\n  }\n};\nlet result1 = calculator.add(10, 5);\nlet result2 = calculator.subtract(15, 5);\nconsole.log('Result: ' + result1);\nconsole.log('Result: ' + result2);\nconsole.log('History: ' + calculator.getHistoryCount() + ' calculations');\nconsole.log('Last: ' + calculator.getLastResult());",
        level: 4,
        orderIndex: 10
      }
    ];

    comprehensiveChallenges.forEach(challenge => {
      this.createChallenge(challenge);
    });
  }

  private initializeProjects() {
    const beginnerProjects: InsertProject[] = [
      {
        title: "Hello World Page",
        description: "Create your very first web page that displays a personalized greeting message.",
        level: "Absolute Beginner",
        difficulty: 1,
        objectives: [
          "Learn basic HTML structure",
          "Use JavaScript variables", 
          "Display dynamic content on a webpage",
          "Understand how HTML and JavaScript work together"
        ],
        skills: ["HTML basics", "JavaScript variables", "DOM manipulation"],
        steps: [
          "Create the HTML structure with a title and paragraph",
          "Add a JavaScript variable with your name",
          "Use document.getElementById to update the page content",
          "Test your page and see your name appear!"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Page</h1>
    <p id="greeting">Hello, World!</p>
    
    <script>
        // TODO: Create a variable with your name
        // TODO: Use document.getElementById('greeting').textContent to change the greeting
    </script>
</body>
</html>`,
        technologies: ["HTML", "JavaScript"],
        prerequisiteIds: []
      },
      {
        title: "Personal Info Card",
        description: "Build a digital business card that displays your information using variables.",
        level: "Absolute Beginner", 
        difficulty: 1,
        objectives: [
          "Create multiple JavaScript variables",
          "Learn string concatenation",
          "Style your page with basic CSS",
          "Build a complete personal information display"
        ],
        skills: ["Multiple variables", "String operations", "Basic CSS", "DOM updates"],
        steps: [
          "Create variables for name, age, city, and hobby",
          "Use string concatenation to create full sentences", 
          "Update multiple HTML elements with your information",
          "Add some CSS styling to make it look nice"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Info Card</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; }
        .card { border: 2px solid #ccc; border-radius: 10px; padding: 20px; background: #f9f9f9; }
        .info { margin: 10px 0; }
    </style>
</head>
<body>
    <div class="card">
        <h2>About Me</h2>
        <div class="info" id="name-info">Name: </div>
        <div class="info" id="age-info">Age: </div>
        <div class="info" id="city-info">City: </div>
        <div class="info" id="hobby-info">Favorite Hobby: </div>
    </div>
    
    <script>
        // TODO: Create variables for your personal information
        // TODO: Update each info div with your data
    </script>
</body>
</html>`,
        technologies: ["HTML", "CSS", "JavaScript"],
        prerequisiteIds: []
      },
      {
        title: "Simple Math Helper",
        description: "Create a basic calculator that can add, subtract, multiply, and divide two numbers.",
        level: "Basic Concepts",
        difficulty: 2,
        objectives: [
          "Use mathematical operators",
          "Get user input",
          "Display calculations",
          "Handle basic form interaction"
        ],
        skills: ["Mathematical operators", "User input", "Form handling"],
        steps: [
          "Create HTML form with two number inputs",
          "Add buttons for different operations",
          "Write functions for each math operation",
          "Display the results dynamically"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Helper</title>
</head>
<body>
    <h1>Simple Calculator</h1>
    <!-- TODO: Add input fields and buttons -->
    
    <script>
        // TODO: Create functions for math operations
    </script>
</body>
</html>`,
        technologies: ["HTML", "JavaScript", "Math"],
        prerequisiteIds: []
      },
      {
        title: "Age Calculator", 
        description: "Build a tool that calculates someone's age based on their birth year.",
        level: "Basic Concepts",
        difficulty: 2,
        objectives: [
          "Work with dates and numbers",
          "Basic form handling", 
          "If/else logic",
          "User input validation"
        ],
        skills: ["Date calculations", "Form handling", "Conditional logic"],
        steps: [
          "Create input field for birth year",
          "Get current year using JavaScript Date",
          "Calculate age with subtraction",
          "Add validation for reasonable birth years"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Age Calculator</title>
</head>
<body>
    <h1>Age Calculator</h1>
    <!-- TODO: Add form elements -->
    
    <script>
        // TODO: Create age calculation function
    </script>
</body>
</html>`,
        technologies: ["HTML", "JavaScript", "Logic"],
        prerequisiteIds: []
      },
      {
        title: "Color Mood Ring",
        description: "Create a fun app that changes colors based on mood selection using your first function.",
        level: "First Functions",
        difficulty: 2,
        objectives: [
          "Create your first function",
          "Change page colors",
          "Interactive buttons",
          "CSS manipulation with JavaScript"
        ],
        skills: ["Functions", "DOM styling", "Event handling"],
        steps: [
          "Create buttons for different moods",
          "Write a function to change background color",
          "Connect buttons to the function",
          "Add smooth color transitions with CSS"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mood Ring</title>
    <style>
        body { transition: background-color 0.5s ease; }
    </style>
</head>
<body>
    <h1>Mood Ring</h1>
    <!-- TODO: Add mood buttons -->
    
    <script>
        // TODO: Create color changing function
    </script>
</body>
</html>`,
        technologies: ["HTML", "CSS", "Functions"],
        prerequisiteIds: []
      },
      {
        title: "Quote Generator",
        description: "Build an inspiring quote generator that displays random motivational quotes.",
        level: "First Functions",
        difficulty: 3,
        objectives: [
          "Work with arrays",
          "Random number generation",
          "Function parameters",
          "Dynamic content updates"
        ],
        skills: ["Arrays", "Random numbers", "Functions"],
        steps: [
          "Create an array of inspirational quotes",
          "Write a function to generate random numbers",
          "Display a random quote from the array",
          "Add a button to get new quotes"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Generator</title>
</head>
<body>
    <h1>Daily Inspiration</h1>
    <!-- TODO: Add quote display and button -->
    
    <script>
        // TODO: Create quotes array and generator function
    </script>
</body>
</html>`,
        technologies: ["HTML", "Functions", "Arrays"],
        prerequisiteIds: []
      },
      {
        title: "Simple Password Generator",
        description: "Create a simple password generator that combines letters and numbers randomly.",
        level: "Simple Projects",
        difficulty: 3,
        objectives: [
          "String manipulation",
          "Loops for repetition",
          "Multiple functions",
          "Random character selection"
        ],
        skills: ["Strings", "Loops", "Functions"],
        steps: [
          "Create arrays of letters and numbers",
          "Write a function to pick random characters",
          "Use a loop to build the password",
          "Add options for password length"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator</title>
</head>
<body>
    <h1>Password Generator</h1>
    <!-- TODO: Add length selector and generate button -->
    
    <script>
        // TODO: Create password generation functions
    </script>
</body>
</html>`,
        technologies: ["HTML", "Functions", "Loops"],
        prerequisiteIds: []
      },
      {
        title: "Number Guessing Game",
        description: "Build an interactive game where users guess a random number with hints and scoring.",
        level: "Simple Projects", 
        difficulty: 3,
        objectives: [
          "Game logic with conditions",
          "User interaction",
          "Score keeping",
          "Multiple game rounds"
        ],
        skills: ["Game logic", "Conditionals", "User interaction"],
        steps: [
          "Generate a random target number",
          "Get user guesses through input",
          "Compare guess to target with hints",
          "Track attempts and implement scoring"
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessing Game</title>
</head>
<body>
    <h1>Number Guessing Game</h1>
    <!-- TODO: Add game interface -->
    
    <script>
        // TODO: Create game logic and functions
    </script>
</body>
</html>`,
        technologies: ["HTML", "Game Logic", "Interaction"],
        prerequisiteIds: []
      }
    ];

    beginnerProjects.forEach(project => {
      this.createProject(project);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Lesson methods
  async getLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getLessonsByLevel(level: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.level === level)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  // Challenge methods
  async getChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getChallengesByLevel(level: number): Promise<Challenge[]> {
    return Array.from(this.challenges.values())
      .filter(challenge => challenge.level === level)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getChallenge(id: string): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = randomUUID();
    const challenge: Challenge = { ...insertChallenge, id };
    this.challenges.set(id, challenge);
    return challenge;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByLevel(level: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.level === level);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      prerequisiteIds: insertProject.prerequisiteIds || null
    };
    this.projects.set(id, project);
    return project;
  }

  // User Progress methods
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }

  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      completed: insertProgress.completed || false,
      completedAt: insertProgress.completed ? new Date() : null
    };
    this.userProgress.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
