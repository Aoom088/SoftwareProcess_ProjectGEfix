let dashboardElement = document.querySelector('.dashboard');
let assignmentElement = document.querySelector('.assignment');
let personalElement = document.querySelector('.personal');
let assessmentElement = document.querySelector('.assessment');
//เปลียนสีของ topbar box อื่นๆนอกจากที่เลือก
function setColor(otherElement) {
    otherElement.forEach(element => {
        element.style.color = "#ffffff";
        element.style.borderColor = "#ebebeb00";
    });
}
function loading() {
  text = `
    <div class="load">
      <div id="loading">
        <a>Loading...</a>
        <div class="color"></div>
      </div>
    </div>
  `;
  document.getElementById('content').innerHTML = text;
}
// get html css js
function getHtml(selectedElement, otherElements) {
  loading();
  // เปลี่ยนสี topbar
  selectedElement.style.color = "#FFE881";
  selectedElement.style.borderColor = "#FFE881";
  // เปลี่ยนสี topbar boxอื่น
  setColor(otherElements);
  // get name 
  const pageName = selectedElement.classList[0];
  fetch($,{pageName}.html)
      .then(res => {
        if (res.status != 200) { throw new Error("Bad Server Response"); }
        return res.text();
      })
      .then(function(html) {
        document.getElementById('content').innerHTML = html; //เอาเนื้อหาใน data ไปแสดงใน content
        // Initialize the DOM parser
        const parser = new DOMParser();
        // Parse the text
        const doc = parser.parseFromString(html, "text/html");
        const head = document.querySelector('head'); //head ของtopbar.html
        const scripts = doc.querySelectorAll('script[type="text/javascript"'); //js จาก data
        const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]'); //css จาก data
        scripts.forEach(script => { // เอาjs ใส่ใน head
            const newScript = document.createElement('script');
            newScript.src = script.getAttribute('src');
            head.appendChild(newScript);
        });
        stylesheets.forEach(stylesheet => { // เอาcss ใส่ใน head
            const newStylesheet = document.createElement('link');
            newStylesheet.rel = 'stylesheet';
            newStylesheet.href = stylesheet.getAttribute('href');
            head.appendChild(newStylesheet);
        });
      })
      .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
      });
}
// topbar Menu
function dashboard() {
  const otherElements = [assignmentElement, personalElement, assessmentElement];
  getHtml(dashboardElement, otherElements);
}

function assignment() {
  const otherElements = [dashboardElement, personalElement, assessmentElement];
  getHtml(assignmentElement, otherElements);
}

function personal() {
  const otherElements = [dashboardElement, assignmentElement, assessmentElement];
  getHtml(personalElement, otherElements);
}

function assessment() {
  const otherElements = [dashboardElement, assignmentElement, personalElement];
  getHtml(assessmentElement, otherElements);
}
// Drop-down Profile Menu
 function toggleMenu() {
    let dropdownMenu = document.getElementById("menu");
    dropdownMenu.classList.toggle("open-menu");
}
