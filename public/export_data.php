<?php

$envPath = __DIR__ . '/../.env';
$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$env = [];
foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0) continue; // Ignore comments
    list($key, $value) = explode('=', $line, 2);
    $env[trim($key)] = trim($value);
}

$host = $env['DB_HOST'] ?? 'localhost';
$dbname = $env['DB_DATABASE'] ?? 'your_database_name';
$user = $env['DB_USERNAME'] ?? 'root';
$password = $env['DB_PASSWORD'] ?? '';


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: Could not connect to the database. " . $e->getMessage());
}


$query = "SELECT * FROM tasks";
$stmt = $pdo->prepare($query);
$stmt->execute();


$filename = 'tasks_report_' . date('Y-m-d') . '.csv';
$file = fopen($filename, 'w');

$columns = ['ID', 'Task Name', 'Description', 'Status', 'Due Date', 'Priority', 'Created At', 'Updated At'];
fputcsv($file, $columns);

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $formattedRow = [
        'ID' => $row['id'],  
        'Task Name' => $row['title'],  
        'Description' => $row['description'],  
        'Status' => $row['status'],  
        'Due Date' => date('Y-m-d', strtotime($row['due_date'])),  
        'Priority' => $row['priority'], 
        'Created At' => date('Y-m-d H:i:s', strtotime($row['created_at'])), 
        'Updated At' => date('Y-m-d H:i:s', strtotime($row['updated_at'])),  
    ];
    
    fputcsv($file, $formattedRow); 
}
fclose($file);


header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($filename));


readfile($filename);


unlink($filename);
