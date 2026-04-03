
let btn_login = document.getElementById("btn_login")

btn_login.addEventListener("click", function() {
    let login = document.getElementById("login").value
    let password = document.getElementById("password").value
    let check_login = document.getElementById("login_stat_check")

    let Name = "akin"
    let pass = "kader012"

    if (login === Name && password === pass) {
        check_login.innerHTML = "du är inloggad"
        check_login.style.color = "green"
    } else {
        check_login.innerHTML = "du är inte loggad"
        check_login.style.color = "red"
    }
})