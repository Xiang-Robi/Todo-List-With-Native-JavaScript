require("bootstrap/dist/css/bootstrap.css");
import styles from './style.css';

window.onload = function() {
  // read data from localStorage when re-open tab
  for (let i=0, len = Object.keys(localStorage).length; i<len; i++) {
    let tempContent = localStorage.getItem(Object.keys(localStorage)[i]);
    let liEl = createTaskItem(tempContent);
    liEl.id=Object.keys(localStorage)[i];
  };
  
  // used in reading data from localStorage & addTask() 
  function createTaskItem(taskContent) {
    let baseEl = document.querySelector('ul');
    let liEl = document.createElement('li');
    liEl.className = "d-flex flex-row align-items-center";

    let checkBoxEl = document.createElement('input');
    checkBoxEl.type = "checkbox";
    checkBoxEl.addEventListener('click', enteredTextStrikethrough)
    
    let enteredTextEl = document.createElement('p');
    enteredTextEl.textContent = taskContent;

    let delBtnHoverEl = document.createElement('button');
    delBtnHoverEl.textContent = 'X';
    delBtnHoverEl.className = 'btn primary-btn btn-sm';
    delBtnHoverEl.addEventListener('click', delWhenHover)
    liEl.append(checkBoxEl);
    liEl.append(enteredTextEl);
    liEl.append(delBtnHoverEl);
    baseEl.append(liEl);
    return liEl;
  }


  ////////////////////////////////////////////////////////////
  // El ⟹ #inputBox
  // Event ⟹ press enter && #inputBox.value is not empty
  // Browser Action - addTask(): 
  // 1. insert a <li> to the <ul>
  // 2. li > checkBox + <p>enteredText</p> + delBtnHover
  // 3. clear #inputBox.value
  ////////////////////////////////////////////////////////////
  let inputBoxEl = document.querySelector('#inputBox');

  function addTask(e) {

    if(e.keyCode === 13 && !!inputBoxEl.value ===true) {
      let liEl = createTaskItem(inputBoxEl.value);

      // get timestamp, will be used as keys
      let tempKey = new Date();
      let tempKeyStr = tempKey.toString()
      localStorage.setItem(tempKeyStr, inputBoxEl.value);
      liEl.id = tempKeyStr;


      // clear inputBox.value
      inputBoxEl.value = '';
      let displayAreaCtnEl = document.querySelector('#displayAreaCtn');

      displayAreaCtnEl.scrollTop = displayAreaCtnEl.scrollHeight;

    };
  }
  inputBoxEl.addEventListener('keypress', addTask);

  ////////////////////////////////////////////////////////////
  // El ⟹ checkBox
  // Event ⟹ checked
  // Browser Action: input text will have a strikethrough 
  ////////////////////////////////////////////////////////////
  function enteredTextStrikethrough() {
    let tempEl = this.nextSibling;     

    tempEl.innerHTML = (this.checked === true) ?
    "<strike>"+tempEl.textContent+"</strike>" : tempEl.textContent;
  }

  ////////////////////////////////////////////////////////////
  // El ⟹ delBtnSelected
  // Event ⟹ click
  // Browser Action: 
  // 1. find selected task items: checkBox.checked = true
  // 2. <li>.remove()
  let delBtnSelectedEl = document.querySelector('#delBtnSelected');
  
  function delSelectedItems() {
    let liElArr = document.querySelectorAll('li');
    // test if the task list is empty
    if (!!liElArr.length === true) { 
      for (let i=0, len=liElArr.length; i<len; i++) {
        // del 'checked' task item
        let tempCheckboxEl = liElArr[i].querySelector('input');
        if (tempCheckboxEl.checked) {
          liElArr[i].remove();
        };
      };
    };
  }

  delBtnSelectedEl.addEventListener('click', delSelectedItems)

  ////////////////////////////////////////////////////////////
  // El ⟹ clearBtn
  // Event ⟹ click
  // Browser Action: 
  // (all <li>).innerHTML = ''
  let clearBtnEl = document.querySelector('#clearBtn');
  function clearAll() {
    let ulEl = document.querySelector('ul');
    let liElArr = document.querySelectorAll('li');

    if (!!liElArr.length === true && confirm("This will clear all your task!")) {
      ulEl.innerHTML = '';
      // clear from localStorage
      localStorage.clear();
    };
  } 
  clearBtnEl.addEventListener('click', clearAll)

  ////////////////////////////////////////////////////////////
  // El ⟹ delBtnHover
  // Event ⟹ click
  // Browser Reaction ⟹ remove the parent <li> node
  ////////////////////////////////////////////////////////////
  function delWhenHover() {
    let tempEl = this.closest('li');
    tempEl.remove();
  }

};