<?php
/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */
$method = $GLOBALS['input']['method'];
$target_url = $GLOBALS['input']['url'];

$ch = curl_init($target_url);
if ($method === 'GET') {
    curl_setopt($ch, CURLOPT_HTTPGET, true);
}
if ($method === 'POST') {
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $GLOBALS['input']['data']);
}

$headers = [];
foreach ($GLOBALS['input']['headers'] as $name => $value) {
    $headers[] = "$name: $value";
}
//curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
header("Content-Type: $content_type");
http_response_code($http_code);
if(curl_error($ch)) {
    echo curl_error($ch);
}
curl_close($ch);
echo $response;
