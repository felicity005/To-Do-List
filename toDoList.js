/*//global array of the quotes
var quotes = new Array();
quotes[0] = "<q>I am in the right place at the right time, doing the right thing.</q>";
quotes[1] = "<q>Conscious breathing is my anchor.</q>";
quotes[2] = "<q>You are loved just for being who you are, just for existing.</q>";
quotes[3] = "<q>Courage starts with showing up and letting ourselves be seen.</q>";
quotes[4] = "<q>Keep your face always toward the sunshine, and the shadows will fall behind you.</q>";
quotes[5] = "<q>Do your thing and don’t care if they don’t like it.</q>";
quotes[6] = "<q>To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.</q>";
quotes[7] = "<q>Beauty begins the moment you decide to be yourself.</q>";
quotes[8] = "<q>I must undertake to love myself and to respect myself as though my very life depends upon self-love and self-respect.</q>";
quotes[9] = "<q>Be yourself; everyone else is already taken.</q>";
quotes[10] = "<q>Life is really simple, but we insist on making it complicated.</q>";
quotes[11] = "<q>Life is too short for long-term grudges.</q>";
quotes[12] = "<q>Love the life you live. Live the life you love.</q>";
quotes[13] = "<q>I was taught that the way of progress was neither swift nor easy.</q>";
quotes[14] = "<q>Live for each second without hesitation.</q>";
quotes[15] = "<q>Folks are usually about as happy as they make their minds up to be.</q>";
quotes[16] = "<q>Whoever is happy will make others happy.</q>";
quotes[17] = "<q>Happiness depends upon ourselves.</q>";
quotes[18] = "<q>Omly the pursuit of happiness is garanteed. The rest is up to you.</q>";

//global array of the names/authors
var names = new Array();
names[0] = "- Louise Hay";
names[1] = "- Thich Nhat Hanh";
names[2] = "- Ram Dass";
names[3] = "- Brene Brown";
names[4] = "- Walt Whitman";
names[5] = "- Tina Fey";
names[6] = "- Ralph Waldo Emerson";
names[7] = "- Coco Chanel";
names[8] = "- Maya Angelou";
names[9] = "- Oscar Wilde";
names[10] = "- Confucius";
names[11] = "- Elon Musk";
names[12] = "- Bob Marley";
names[13] = "- Marie Curie";
names[14] = "- Elton John";
names[15] = "- Abraham Lincoln";
names[16] = "- Anne Frank";
names[17] = "- Aristotle";
names[18] = "- David J. Fagan";

let taskList = []; //stores the list of tasks
let priority = []; //stores the priority for each task
let taskCount = 1; //globalized task count

//function to display a random quote
function getQuote() 
{
    let index = Math.floor(Math.random() * quotes.length);  //generates a random index
    let output = quotes[index] + "<br>" + names[index] + "<br>";  //adds quote and name of generated index
    document.getElementById("quote").innerHTML = output;  //displays quote in the HTML element with id "quote"
}

//function to enter a new task along with its priority
function enterTask() 
{  
    let taskAndPriority = [];   // Temporary array to store the task and its priority
    let entry = prompt("Enter your task");   // Prompt user to enter a task
    if (entry) 
    {
        taskAndPriority[0] = entry;   // Store the task description
    } 
  else 
    {
        alert("Please enter a valid task.");  // If no task is entered, push a default message
        entry = prompt("Enter your task");  // Prompt the user to enter another task
        taskAndPriority[0] = entry; // Store it in place of the undefined
    }

    // Store the task temporarily in the task list with 'pending' priority
    taskAndPriority[1] = "pending";  // Mark priority as pending until selected
    taskList.push(taskAndPriority);   // Add task to task list (without displaying it yet)

    // Create priority buttons for High and Low priority
   let prioritySelectionHtml = 
    "<p><b>Select task priority:</b></p>" + "<button onclick='setPriority(" + (taskList.length - 1) + ", \"H\")'>High Priority</button>" + "<button onclick='setPriority(" + (taskList.length - 1) + ", \"L\")'>Low Priority</button>";
    // Display the priority selection buttons
    let prioritySection = document.getElementById("priority-selection");
    prioritySection.innerHTML = prioritySelectionHtml;  // Display the buttons
}

// Function to set the priority when the user clicks a button
function setPriority(taskIndex, priorityValue) 
{
    // Update the priority for the task
    taskList[taskIndex][1] = priorityValue;  // Set the priority (H or L)

    // Hide the priority buttons after selection
    document.getElementById("priority-selection").innerHTML = "";  // Clear the priority selection buttons
    displayTasks();  // Update the task list display
}

//function to display tasks
function displayTasks() 
{
    let taskDisplay = document.getElementById("task");
    taskDisplay.innerHTML = "";   //clears previous tasks displayed

    //organize tasks based on priority using organizePriority function
    let organizedTasks = organizePriority(taskList, priority);

    //loop through all tasks and display them based on priority
    for (let i = 0; i < organizedTasks.length; i++) 
    {
        //only display tasks with selected priority (not 'pending')
        if (organizedTasks[i][1] != "pending") 
        {
            let taskItem = document.createElement("div");   //creates a new div for each task
            taskItem.innerHTML = organizedTasks[i][0];   //set the task to the indexof the array

            let finishButton = document.createElement("button");   //creates a button to finish the task
            if (organizedTasks[i][1] == "H") 
            {
                finishButton.innerHTML = "Finish SOON!";  //creates this type of finish button for priority tasks
            }
            else 
            {
                finishButton.innerHTML = "Finish!";  //creates this type for non-priority tasks
            }     
            finishButton.onclick = function () //triggerred on the click of the finish button
            {
                finishTask(i);  //button calls finishTask
                taskCount++;  //task count increases when the finished task button is clicked.
            };

            taskItem.appendChild(finishButton);   // Add finish button to task div
            taskDisplay.appendChild(taskItem);   // Add task div to display area
        }
    }
}

//organizes the tasks and their corresponding priority so that the ones with a "H" are ahead of the "L" in the array.
function organizePriority(userTasks) {
    let highPriorityTasks = [];  //creates an array for the tasks with a "H" assigned to it
    let lowPriorityTasks = [];  //creates an array for the tasks with a "L" assigned to it

    for (let i = 0; i < userTasks.length; i++) 
    {
        if (userTasks[i][1] == "H") 
        {
            highPriorityTasks.push(userTasks[i]);
            //adds the "H" or high priority tasks so that they are in the highPriorityTasks list
        } 
       else if (userTasks[i][1] == "L") 
        {
            lowPriorityTasks.push(userTasks[i]);
            //adds the "L" or low priority tasks so that they are in the lowPriorityTasks list
        }
    }

    // Combine high and low priority tasks
    let combinedTasks = [];  //creates an array to combine both the high and low priority tasks.

    for (let i = 0; i < highPriorityTasks.length; i++) 
    {
        combinedTasks.push(highPriorityTasks[i]);
        //pushes the highPriorityTasks so that they are at the front of the array.
    }
  
    for (let i = 0; i < lowPriorityTasks.length; i++) 
    {
        combinedTasks.push(lowPriorityTasks[i]);
        //pushes the lowPriorityTasks so that they are  behind the high priority tasks.
    }

    return combinedTasks;
}

//function to mark a task as finished, and display the count and quote (whcih are triggered when the task is finished).
function finishTask(index) 
{
    taskList.splice(index, 1);  //removes specified task
    priority.splice(index, 1);  //removes specified index
    getQuote();  //displays new motivational quote after finishing a task
    displayTasks();  //updates task list display
    let countDisplay = document.getElementById("count");
    countDisplay.innerHTML = "Finished Tasks: " + taskCount;

    if (taskList.length == 0) 
    {
        alert("All tasks completed! Great job!");  //alerts when all tasks are completed
    }
}
*/
const quotes = [  // Using array literal syntax
    "<q>I am in the right place at the right time, doing the right thing.</q>",
    "<q>Conscious breathing is my anchor.</q>",
    "<q>You are loved just for being who you are, just for existing.</q>",
    "<q>Courage starts with showing up and letting ourselves be seen.</q>",
    "<q>Keep your face always toward the sunshine, and the shadows will fall behind you.</q>",
    "<q>Do your thing and don’t care if they don’t like it.</q>",
    "<q>To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.</q>",
    "<q>Beauty begins the moment you decide to be yourself.</q>",
    "<q>I must undertake to love myself and to respect myself as though my very life depends upon self-love and self-respect.</q>",
    "<q>Be yourself; everyone else is already taken.</q>",
    "<q>Life is really simple, but we insist on making it complicated.</q>",
    "<q>Life is too short for long-term grudges.</q>",
    "<q>Love the life you live. Live the life you love.</q>",
    "<q>I was taught that the way of progress was neither swift nor easy.</q>",
    "<q>Live for each second without hesitation.</q>",
    "<q>Folks are usually about as happy as they make their minds up to be.</q>",
    "<q>Whoever is happy will make others happy.</q>",
    "<q>Happiness depends upon ourselves.</q>",
    "<q>Only the pursuit of happiness is guaranteed. The rest is up to you.</q>"
];

const names = [  // Using array literal syntax
    "- Louise Hay", "- Thich Nhat Hanh", "- Ram Dass", "- Brene Brown",
    "- Walt Whitman", "- Tina Fey", "- Ralph Waldo Emerson", "- Coco Chanel",
    "- Maya Angelou", "- Oscar Wilde", "- Confucius", "- Elon Musk",
    "- Bob Marley", "- Marie Curie", "- Elton John", "- Abraham Lincoln",
    "- Anne Frank", "- Aristotle", "- David J. Fagan"
];

let taskList = [];  // Stores the list of tasks
let taskCount = 0;  // Initialize task count to 0

// Function to display a random quote
function getQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    const output = `${quotes[index]}<br>${names[index]}<br>`;  // Template literals for clarity
    document.getElementById("quote").innerHTML = output;  // Display quote in the HTML element with id "quote"
}

// Function to enter a task and display priority options
function enterTask() {
    let entry = prompt("Enter your task");  // Prompt user to enter a task
    while (!entry) {  // Loop until a valid task is entered
        alert("Please enter a valid task.");  // Alert user
        entry = prompt("Enter your task");
    }

    const taskAndPriority = [entry, "pending"];  // Store task with pending priority
    taskList.push(taskAndPriority);  // Add task to the task list

    // Create and display priority buttons
    const taskIndex = taskList.length - 1;
    const prioritySelectionHtml = `
        <p>Select task priority:</p>
        <button onclick='setPriority(${taskIndex}, "H")'>High Priority</button>
        <button onclick='setPriority(${taskIndex}, "L")'>Low Priority</button>
    `;
    document.getElementById("priority-selection").innerHTML = prioritySelectionHtml;  // Display the buttons
}

// Function to set the priority when the user clicks a button
function setPriority(taskIndex, priorityValue) {
    taskList[taskIndex][1] = priorityValue;  // Update the priority for the task
    document.getElementById("priority-selection").innerHTML = "";  // Clear the priority selection buttons
    displayTasks();  // Update the task list display
}

// Function to organize tasks by priority (High Priority first, then Low Priority)
function organizePriority(userTasks) {
    return userTasks.sort((a, b) => {
        if (a[1] === "H" && b[1] === "L") return -1;
        if (a[1] === "L" && b[1] === "H") return 1;
        return 0;  // Preserve the order for pending tasks, if any
    });
}

// Function to display tasks
function displayTasks() {
    const taskDisplay = document.getElementById("task");
    taskDisplay.innerHTML = "";  // Clears previous tasks displayed

    const organizedTasks = organizePriority(taskList);  // Get the tasks sorted by priority

    organizedTasks.forEach((task, i) => {
        if (task[1] !== "pending") {  // Only display tasks with 'not pending' priority
            const taskItem = document.createElement("div");
            taskItem.innerHTML = task[0];  // Set the task text

            const finishButton = document.createElement("button");
            finishButton.innerHTML = task[1] === "H" ? "Finish SOON!" : "Finish!";
            finishButton.onclick = () => finishTask(i);  // Calls finishTask function

            taskItem.appendChild(finishButton);  // Add finish button to task div
            taskDisplay.appendChild(taskItem);  // Add task div to the display area
        }
    });

    document.getElementById("count").innerHTML = `Finished Tasks: ${taskCount}`;  // Update the "finished tasks" counter
}

// Function to finish (remove) a task
function finishTask(index) {
    taskList.splice(index, 1);  // Removes specific task from the task list
    taskCount++;  // Increments task counter for each finished task
    getQuote();  // Displays a new motivational quote after finishing a task
    displayTasks();  // Displays the updated task list

    if (taskList.length === 0) {
        alert("All tasks completed! Great job!");  // Alert when all tasks are done
    }
}
