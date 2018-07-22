function showEmployer() {
  var numberOfEmployers = 0;
  var allEmployerContainers = document.querySelectorAll(".employer-container");
  for (var i = 0; i < allEmployerContainers.length; i++) {
    if (allEmployerContainers[i].style.display == "none") {
      numberOfEmployers++;
    }
  } 
  if (numberOfEmployers > 0) {
    var employerContainer = document.getElementById(`emp-container-${allEmployerContainers.length - numberOfEmployers}`);
    var employerContainerChildren = [];
    employerContainerChildren.push(employerContainer.children[0].children[0],
                                   employerContainer.children[1].children[0],
                                   employerContainer.children[2]);
    employerContainer.style.display = "inline-block";
    assignAttributesToChildren(employerContainerChildren);
  } else {
    return;
  }
}

function assignAttributesToChildren(containerChildren) {
  for (var i = 0; i < containerChildren.length; i++) {
    containerChildren[i].setAttribute("class", "user-input");
  }
}

function removeBoxShadow(id) {
  document.getElementById(id).style.boxShadow = "none";
}

function validate(event) {
  var emptyCount = 0;
  var inputFields = document.querySelectorAll(".user-input");
  for (var i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value == "") {
      inputFields[i].style.boxShadow = "inset 0px 0px 1px 1px rgba(255,0,0,0.75)";
      emptyCount++;
    }
  }
  if (emptyCount > 0) {
    alert("Please fill in empty fields.");
    return false;
  }
  var regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (regEx.test(document.getElementById("email").value) == true) {
    var resumeInfo = getResumeInfo();
    generateNewResume(resumeInfo);
  } else {
    alert("Email address is invalid.");
    return false;
  }
}

function getResumeInfo() {
  var employers = [];
  var startdates = [];
  var enddates = [];
  var employerContainers = document.querySelectorAll(".employer-container");
  for (var i = 0; i < employerContainers.length; i++) {
    if (employerContainers[i].style.display == "inline-block") {
      employers.push(employerContainers[i].children[2]);
      startdates.push(employerContainers[i].children[0].children[0]);
      enddates.push(employerContainers[i].children[1].children[0]);
    }
  }

  var resumeInfo = {"NAME" : document.getElementById("name").value,
                    "ADDRESS" : document.getElementById("address").value,
                    "PHONE" : document.getElementById("phone").value,
                    "EMAIL" : document.getElementById("email").value,
                    "CAREER OBJECTIVES" : document.getElementById("objectives").value,
                    "PERSONAL DATA" : document.getElementById("personal").value,
                    "EDUCATION" : document.getElementById("education").value,
                    "EMPLOYMENT EXPERIENCE" : "",
                    };
  for (var t = 0; t < employers.length; t++) {
      var startdate = formatDate(startdates[t].value);
      var enddate = formatDate(enddates[t].value);
      resumeInfo[`${startdate} - ${enddate}`] = (document.getElementsByName("employer")[t].value);
  }
  resumeInfo["BUSINESS REFERENCES"] = document.getElementById("business").value;
  resumeInfo["CHARACTER REFERENCES"] = "Upon request";
  return resumeInfo;
}

function formatDate(date) {
  var splitDate = date.split('-');
  var rearrangedDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
  var newDate = new Date(rearrangedDate);
  var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  var reformattedDate = `${months[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`;
  return reformattedDate;
}

function generateNewResume(resumeInfo) {
    var newResume = window.open("newresume.html", "New Resume");
    var headerData = Object.values(resumeInfo).slice(0, 4);
    var leftColData = Object.keys(resumeInfo).slice(4);
    var rightColData = Object.values(resumeInfo).slice(4);
    var text = `<html><head><title>New Resume</title>`;
    text += `<link rel="stylesheet" type="text/css" href="resumestyle.css">`;
    text += `</head><body id="resume-body">`;
    text += `<h3>${headerData[0]}</h3>`; // full name
    text += `<p>`;
    for (var g = 1; g < 4; g++) {
        text +=`<span id="resume-header">${headerData[g]}</span>`;
    }
    text += `</p>`;
    text += `<hr id="resume-hr" /><br />`;
    
    for (var a = 0; a < leftColData.length; a++) {
        text += `<div class="row">`;
        text += `<div class="col">`;
        text += `${leftColData[a]}`;
        text += `</div>`;
        text += `<div class="col">`;
        text += `${rightColData[a]}`;
        text += `</div>`;
        text += `</div>`;
    }
    
    text += `</body></html>`;
    
    newResume.document.write(text);
}