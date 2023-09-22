
import throttle from 'lodash.throttle';

const inputContent = document.querySelector("input");
const textareaContent = document.querySelector("textarea");
const submitButton = document.querySelector("button");

const formData = localStorage.getItem("feedback-form-state");

if (formData) { 
    const obj = JSON.parse(formData);
    inputContent.value = obj.email;
    textareaContent.value = obj.message;
}

function saveFormData(fieldName, fieldValue) {
    const userForm = localStorage.getItem("feedback-form-state");
    const obj = !userForm ? {} : JSON.parse(userForm);

    obj[fieldName] = fieldValue;
    localStorage.setItem("feedback-form-state", JSON.stringify(obj));
    console.log(obj);
}

submitButton.addEventListener("click", (event) => { 
    event.preventDefault();
    localStorage.removeItem("feedback-form-state");
    inputContent.value = "";
    textareaContent.value = "";
});

inputContent.oninput = throttle((data) => {
    saveFormData("email", data.target.value);
}, 500);

textareaContent.oninput = throttle((data) => {
    saveFormData("message", data.target.value);
}, 500);
