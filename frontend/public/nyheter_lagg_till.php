<?php
session_start();
$loggedInUsername = $_SESSION['username'] ?? '';
$loggedInUserId = $_SESSION['user_id'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Add news article.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script src="newsLogic.js" defer></script>
</head>
<body class="all_pages">
    <div
      id="news_form_page"
      data-current-user-id="<?php echo htmlspecialchars((string)$loggedInUserId, ENT_QUOTES, 'UTF-8'); ?>"
      data-current-username="<?php echo htmlspecialchars($loggedInUsername, ENT_QUOTES, 'UTF-8'); ?>"
    >
      <h1>Post a news article.</h1>
      <a href="nyheter.php">Back to news.</a>

      <?php if ($loggedInUsername !== ''): ?>
      <div id="type_holder">
        <input type="text" id="type" placeholder="title"><br>
        <input type="text" id="des_news" placeholder="description"><br>
        <button id="post_news_button" type="button">Upload.</button>
      </div>
      <?php else: ?>
      <p class="news_login_hint">You must be logged in to post a news article! </p>
      <p class="news_login_hint"><a href="login-signup.php">Go to login.</a></p>
      <?php endif; ?>
    </div>
    <script src="logoutOnClose.js"></script>
</body>
</html>
