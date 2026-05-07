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
    header('Location: login-signup.php?message=' . urlencode('Email and password needs to be filled in.'));
    exit;
}

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    header('Location: login-signup.php?message=' . urlencode('Couldnt connect to the database!'));
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
    header('Location: login-signup.php?message=' . urlencode('No user was found with that email.'));
    exit;
}

if ($user['Password'] !== $userPassword) {
    $loginStatement->close();
    $connection->close();
    header('Location: login-signup.php?message=' . urlencode('Wrong Password.'));
    exit;
}

$_SESSION['user_id'] = $user['ID'];
$_SESSION['username'] = $user['Username'];
$_SESSION['email'] = $user['Email'];

$loginStatement->close();
$connection->close();

header('Location: index.php');
exit;
