const onSubmit = () => {
  const alert_form = document.getElementById("alert");
  const form = document.getElementById("form-add-data");
  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData.entries());
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(jsonData.email)) {
    alert("Email salah");
    return;
  }
  if (jsonData.password.length < 8) {
    alert("Password minimal 8 karakter");
    return;
  }
  if (jsonData.password != jsonData.confirmPassword) {
    alert("Password tidak cocok");
    return;
  }
  alert_form.style.display = "block";
};
