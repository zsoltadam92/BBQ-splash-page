console.log('hello');


const form = document.querySelector('.main__form')
const firstName = document.getElementById('name');
const errorLength = document.querySelector('.main__error--length')
const errorUppercase = document.querySelector('.main__error--uppercase')
const email = document.getElementById('email');
const errorEmail = document.querySelector('.main__error--email')
const submit = document.getElementById('submit');

firstName.value = localStorage.getItem('firstName');
email.value = localStorage.getItem('email');

firstName.addEventListener('input' , () => {
  let text = firstName.value;
  let pattern = /^[A-ZÁÉÍÓÖŐÚÜŰ]/;
  let result = pattern.test(text);

  if(!result) {
    errorUppercase.style.display = "block"; 
  } else {
    errorUppercase.style.display = "none"; 
  }

  if(text.length < 3) {
    errorLength.style.display = "block"; 
  } else {
    errorLength.style.display = "none"; 
  }
})

email.addEventListener('input' , () => {
  let text = email.value;
  let pattern = /[\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ.-]{6,}@[a-zA-Z]{4,}.[a-zA-Z]{2,3}$/;
  let result = pattern.test(text);

  if(!result) {
    errorEmail.style.display = "block"; 
  } else {
    errorEmail.style.display = "none"; 
  }
})

submit.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('firstName', firstName.value)
  localStorage.setItem('email', email.value)
  form.reset()
})