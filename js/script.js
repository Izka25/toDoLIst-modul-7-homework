{
  let tasks = [
    {
      content: "przerobić lekcje",
      done: false,
    },
    {
      content: "przepisać notatki",
      done: true,
    },
  ];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      taskIndex === index ? { ...task, done: !task.done } : task
    );

    render();
  };

  const hideDoneButton = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li 
    class="js-task task ${task.done && hideDoneTasks ? "task--hidden" : ""}"
    ${task.done ? ' style="text-decoration: line-through"' : ""}>
    <button class="js-toggleDone toggleDone">
    ${task.done ? "✔" : ""}
    </button>
    
<span class="tasks__content${task.done ? " tasks__content--done" : ""}">
    ${task.content}</span>
    <button class="js-remove remove">
    🗑
    </button>
    
 </li>
    
    `;
    
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtonsString = "";

    if (!tasks.length) {
      return;
    }

    htmlButtonsString += `
    
    <button class = "hideDoneButton js-hideDoneButton ">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
    </button>

    <button class = "finishButton js-finishButton " ${
      tasks.every(({ done }) => done) ? "disabled" : ""
    }>
        Ukończ wszystkie
    </button>
    
     `;

    document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
  };

  const bindButtonsEvents = () => {
    const hideDoneButtonElement = document.querySelector(".js-hideDoneButton");

    if (hideDoneButtonElement) {
      hideDoneButtonElement.addEventListener("click", hideDoneButton);
    }
  };

  const bindButtonsFinishs = () => {
    const finishButton = document.querySelector(".js-finishButton");

    if (finishButton) {
      finishButton.addEventListener("click", toggleAllTasksDone);
    }
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
    bindButtonsFinishs();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);

    newTaskElement.value = "";

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
