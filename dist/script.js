"use strict";console.log("hello");var form=document.querySelector(".main__form"),firstName=document.getElementById("name"),errorLength=document.querySelector(".main__error--length"),errorUppercase=document.querySelector(".main__error--uppercase"),email=document.getElementById("email"),errorEmail=document.querySelector(".main__error--email"),submit=document.getElementById("submit");firstName.value=localStorage.getItem("firstName"),email.value=localStorage.getItem("email"),firstName.addEventListener("input",(function(){var e=firstName.value,t=/^[A-ZÁÉÍÓÖŐÚÜŰ]/.test(e);errorUppercase.style.display=t?"none":"block",e.length<3?errorLength.style.display="block":errorLength.style.display="none"})),email.addEventListener("input",(function(){var e=email.value,t=/[\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ.-]{6,}@[a-zA-Z]{4,}.[a-zA-Z]{2,3}$/.test(e);errorEmail.style.display=t?"none":"block"})),submit.addEventListener("click",(function(e){e.preventDefault(),localStorage.setItem("firstName",firstName.value),localStorage.setItem("email",email.value),form.reset()}));
//# sourceMappingURL=script.js.map