<?php
$host = 'localhost';
$username = 'root';
$password = '1234';
$database = 'finans_sida';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: registrera.php');
    exit;
}

$email = trim($_POST['email'] ?? '');
$userNameInput = trim($_POST['username'] ?? '');
$userPassword = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

if ($email === '' || $userNameInput === '' || $userPassword === '' || $confirmPassword === '') {
    header('Location: registrera.php?message=' . urlencode('Alla falt maste fyllas i.'));
    exit;
}

if ($userPassword !== $confirmPassword) {
    header('Location: registrera.php?message=' . urlencode('Losenorden matchar inte.'));
    exit;
}

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    header('Location: registrera.php?message=' . urlencode('Kunde inte ansluta till databasen.'));
    exit;
}

$checkStatement = $connection->prepare('SELECT ID FROM users WHERE Email = ? OR Username = ?');
$checkStatement->bind_param('ss', $email, $userNameInput);
$checkStatement->execute();
$existingUser = $checkStatement->get_result();

if ($existingUser->num_rows > 0) {
    $checkStatement->close();
    $connection->close();
    header('Location: registrera.php?message=' . urlencode('Email eller username finns redan.'));
    exit;
}

$checkStatement->close();

$insertStatement = $connection->prepare('INSERT INTO users (Email, Username, Password) VALUES (?, ?, ?)');
$insertStatement->bind_param('sss', $email, $userNameInput, $userPassword);

if ($insertStatement->execute()) {
    $insertStatement->close();
    $connection->close();
    header('Location: registrera.php?success=1&message=' . urlencode('Kontot skapades.'));
    exit;
}

$insertStatement->close();
$connection->close();
header('Location: registrera.php?message=' . urlencode('Nagot gick fel nar kontot skulle skapas.'));
exit;
