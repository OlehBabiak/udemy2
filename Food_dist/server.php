<?php
//php syntacs
$_POST = json_decode(file_get_contents("php://input"), true);
// декодуєм json для роботи з ним
echo var_dump($_POST);
// бере дані від клієнта перетворює в строку та показує на клієнті як response з сервера
