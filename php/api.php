<?php
/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

$data=[];
try {
    $GLOBALS['input'] = json_decode(file_get_contents('php://input') ?? '', true, 512, JSON_THROW_ON_ERROR);
    if(isset($GLOBALS['input']['cmd'])){
        require "cmd.php";
    }
} catch (JsonException $e) {
    header('Content-Type: application/json');
    http_response_code(404);
    echo json_encode([
        'code'=>'404',
        'error'=>$e->getMessage()
    ], JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    return;
}