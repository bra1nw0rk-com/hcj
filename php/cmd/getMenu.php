<?php
/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */


use connector\PostgreSQL;
require_once 'php/connector/PostgreSQL.php';
header('Content-Type: application/json');

if (isset($GLOBALS['input']['params'])) {
    try {
        $db = new PostgreSQL();
        $params = $GLOBALS['input']['params'];

        $menu_items = $db->query("SELECT menu.name, menu_items.*
            FROM menu
            JOIN menu_items ON menu.id = menu_items.menu
            WHERE menu.name = :name and :token=:token
            ORDER BY menu_items.parent, menu_items.order;", $params);
        http_response_code(200);
        echo json_encode(['result'=>$menu_items,'params'=>$params], JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);


    } catch (Exception $e) {
        // Handle any errors
        http_response_code(404);
        echo json_encode(['error' => $e->getMessage()]);
    }

}