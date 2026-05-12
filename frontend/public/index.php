<?php
session_start();
$loggedInUsername = $_SESSION['username'] ?? '';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="./Stock.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Live finance</title>
    <link rel="stylesheet" href="./main.css">
  </head>
  
  <body class="all_pages">
 <header>
  <div id="profit_lose_news">
  </div>
  <nav>
    <div id="nav_holder">
      <a href="./index.php"><div id="Home_nav" class="nav_tab">Home</div></a>
      <a href="./marknad.html"><div id="Market_nav" class="nav_tab">Market</div></a>
      <a href="./nyheter.php"><div id="News_nav" class="nav_tab">News</div></a>
      <a href="./telegram-bot.html"><div id="Telegram_Bot_nav" class="nav_tab">Telegram bot</div></a>
      <a href="./about-us.html"><div id="Aboutus_nav" class="nav_tab">About us</div></a>
      <a href="./login-signup.php"><div id="login_Signup_nav" class="nav_tab">Login/Sign up</div></a>
    </div>
  </nav>
 </header>

 <section class="home_intro">
  <p
    id="login_greeting"
    class="login_greeting"
    data-username="<?php echo htmlspecialchars($loggedInUsername, ENT_QUOTES, 'UTF-8'); ?>"
  ></p>
 </section>

 <div class="home_panels">
  <iframe src="livedata.html" frameborder="0" style="border: 0.2vw solid #FFD95A; height: 30vw; margin-left: 10vw;">kop/salj</iframe>
  <iframe src="nyheter_index.html" frameborder="0" style="border: 0.2vw solid #FFD95A; height: 30vw;">nyheter</iframe>
  <iframe src="login_index.html" frameborder="0" style="border: 0.2vw solid #FFD95A; height: 30vw;">konto</iframe>
 </div>

 <p class="chatbot">Behöver du hjälp? <br> Låt våran chatbot hjälpa dig! <a style="color: red;" href="chatbot.html">Chatbot</a></p>
<footer>
<div id="Contact">
  <p class="contact_heading">Contact us</p>
  <input type="text" name="" id="" placeholder="Your email"><br>
  <input type="text" placeholder="Your reason for contacting us"><br>
  <button>Send</button>
</div>
</footer>
<script src="dropDownLogic.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script src="contactFooter.js"></script>
<script src="logoutOnClose.js"></script>
<script>
  const greetingElement = document.getElementById("login_greeting");

  if (greetingElement) {
    const username = greetingElement.dataset.username;
    const currentHour = new Date().getHours();
    let greetingText = "Good Evening";

    if (currentHour < 12) {
      greetingText = "Good Morning";
    } else if (currentHour < 20) {
      greetingText = "Good Afternoon";
    }

    greetingElement.textContent = username !== ""
      ? `${greetingText}, ${username}`
      : greetingText;
  }
</script>
  </body>
</html>
