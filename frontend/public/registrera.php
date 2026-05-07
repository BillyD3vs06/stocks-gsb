<?php
$message = $_GET['message'] ?? '';
$isSuccess = isset($_GET['success']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn/SignUp</title>
    <link rel="stylesheet" href="main.css">
</head>
<body class="all_pages">
    <header>
        <div id="profit_lose_news"></div>
        <nav>
            <div id="nav_holder">
                <a href="./index.php"><div id="Home_nav" class="nav_tab">Home</div></a>
                <a href="./marknad.html"><div id="Market_nav" class="nav_tab">Market</div></a>
                <a href="./kop-salj.html"><div id="Buy_Sell_nav" class="nav_tab">Buy/Sell</div></a>
                <a href="./nyheter.php"><div id="News_nav" class="nav_tab">News</div></a>
                <a href="./telegram-bot.html"><div id="Telegram_Bot_nav" class="nav_tab">Telegram bot</div></a>
                <a href="./about-us.html"><div id="Aboutus_nav" class="nav_tab">About us</div></a>
                <a href="./login-signup.php"><div id="login_Signup_nav" class="nav_tab">Login/Sign up</div></a>

            </div>
        </nav>
    </header>


    <main class="page_section">
        <section class="registrera_card">
            <h1 style="color: #ffd700;">Sign In</h1>
            <p style="color: gold;"> Create your account today!</p>
            <?php if ($message !== ''): ?>
                <p style="color: <?php echo $isSuccess ? 'lightgreen' : '#ff7b7b'; ?>;">
                    <?php echo htmlspecialchars($message); ?>
                </p>
            <?php endif; ?>


            <form class="registrera_form" action="register.php" method="post" novalidate>
                <input type="email" name="email" placeholder="E-mail" required>
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="password" name="confirm_password" placeholder="Confirm password" required>
                <button type="submit" class="registrera_button">Create Account</button>
            </form>


        </section>
    </main>
    <footer>
        <div id="Contact">
          <p class="contact_heading">Contact us</p>
          <input type="text" placeholder="Your email"><br>
          <input type="text" placeholder="Your reason for contacting us"><br>
          <button>Send</button>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script src="contactFooter.js"></script>
    <script src="logoutOnClose.js"></script>
</body>
</html>
