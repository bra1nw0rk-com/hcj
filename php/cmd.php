<?php
/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */


if ($GLOBALS['input']['cmd'] === 'getMenu') {
    require "cmd/getMenu.php";
}
elseif ($GLOBALS['input']['cmd'] === 'proxy') {
    require "cmd/proxy.php";
}



