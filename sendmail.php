<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "ton@email.com"; // remplace avec ton mail
    $subject = "Nouveau message de Karim Maintenance";
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $headers = "From: $email\r\nReply-To: $email\r\n";

    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi.";
    }
}
?>
