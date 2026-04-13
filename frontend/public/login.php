<?php
session_start();

$host = 'localhost';
$username = 'root';
$password = '1234';
$database = 'finans_sida';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login-signup.php');
    exit;
}

$email = trim($_POST['email'] ?? '');
$userPassword = $_POST['password'] ?? '';

if ($email === '' || $userPassword === '') {
    header('Location: login-signup.php?message=' . urlencode('Email och password maste fyllas i.'));
    exit;
}

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    header('Location: login-signup.php?message=' . urlencode('Kunde inte ansluta till databasen.'));
    exit;
}

$loginStatement = $connection->prepare('SELECT ID, Email, Username, Password FROM users WHERE Email = ?');
$loginStatement->bind_param('s', $email);
$loginStatement->execute();
$result = $loginStatement->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    $loginStatement->close();
    $connection->close();
    header('Location: login-signup.php?message=' . urlencode('Ingen anvandare hittades med den emailen.'));
    exit;
}

if ($user['Password'] !== $userPassword) {
    $loginStatement->close();
    $connection->close();
    header('Location: login-signup.php?message=' . urlencode('Fel losenord.'));
    exit;
}

$_SESSION['user_id'] = $user['ID'];
$_SESSION['username'] = $user['Username'];
$_SESSION['email'] = $user['Email'];

$loginStatement->close();
$connection->close();

header('Location: login-signup.php?success=1&message=' . urlencode('Du ar nu inloggad som ' . $user['Username'] . '.'));
exit;
