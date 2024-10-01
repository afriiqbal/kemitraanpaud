<?php 

require '../config/function.php';

$paraResult = checkParamID('id');
if (is_numeric($paraResult)) {
    $userId = validate($paraResult);

    // Pastikan untuk mendapatkan detail user terlebih dahulu
    $user = getById('datakontakupt', $userId);

    if ($user['datakontakupt'] == 200) {
        $userDeleteRes = deleteQuery('users', $userId);
        if ($userDeleteRes) {
            redirect('datakon-upt.php', 'User Deleted Successfully');
        } else {
            redirect('datakon-upt.php', 'Something Went Wrong');
        }
    } else {
        redirect('datakon-upt.php', $user['message']);
    }
} else {
    redirect('datakon-upt.php', $paraResult);
}