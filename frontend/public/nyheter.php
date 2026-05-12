<?php
session_start();
$loggedInUsername = $_SESSION['username'] ?? '';
$loggedInUserId = $_SESSION['user_id'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News</title>
    <link rel="stylesheet" href="main.css">
    <script src="newsLogic.js" defer></script>
</head>
<body class="all_pages">
    <header>
        <div id="profit_lose_news"></div>
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

    <main
      id="news_page"
      data-current-user-id="<?php echo htmlspecialchars((string)$loggedInUserId, ENT_QUOTES, 'UTF-8'); ?>"
      data-current-username="<?php echo htmlspecialchars($loggedInUsername, ENT_QUOTES, 'UTF-8'); ?>"
    >
      <?php if ($loggedInUsername !== ''): ?>
      <button id="Lagg-Till-Nyhet"><a href="nyheter_lagg_till.php">Add news +</a></button>
      <?php else: ?>
    <button id= "Lagg-Till-Nyhet">
      <a href="login-signup.php?message=<?php echo urlencode('You must be logged in to post a news article!'); ?>">Add news +</a>
    </button>
    <p class="news_login_hint">You must be logged in to post a news article! </p>
    <?php endif; ?>

      <div id="news_holder"></div>
    </main>

    <div id="delete_popup_overlay" class="delete_popup_overlay hidden">
      <div class="delete_popup">
        <h2 class="delete_popup_title">Delete post?</h2>
        <p class="delete_popup_text">Are you sure you want to delete this post?</p>
        <div class="delete_popup_actions">
          <button id="delete_popup_cancel" type="button" class="delete_popup_button delete_popup_button_secondary">No</button>
          <button id="delete_popup_confirm" type="button" class="delete_popup_button delete_popup_button_primary">Yes</button>
        </div>
      </div>
    </div>

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
    <script src="deleteButtonEffects.js"></script>
    <script src="logoutOnClose.js"></script>
</body>
</html>
