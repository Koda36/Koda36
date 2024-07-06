<?php
session_start();

// Path to the JSON file
$json_file_path = 'C:\Users\BMAX\Documents\TDB\Base login.json';

// Function to get users from JSON file
function get_users_from_json($file_path) {
    if (!file_exists($file_path)) {
        return [];
    }
    $json_data = file_get_contents($file_path);
    return json_decode($json_data, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Retrieve users from JSON file
    $users = get_users_from_json($json_file_path);

    // Search for the user in the JSON data
    foreach ($users as $user) {
        if ($user['CUID'] === $username) {
            // Verify the password
            if (password_verify($password, $user['Mot de passe'])) {
                $_SESSION['username'] = $username;
                header('Location: dashboard.php'); // Redirect to the dashboard or another page
                exit;
            } else {
                $error_message = "Nom d'utilisateur ou mot de passe incorrect";
            }
        }
    }

    // If no user is found or password is incorrect
    if (empty($error_message)) {
        $error_message = "Nom d'utilisateur ou mot de passe incorrect";
    }
}
