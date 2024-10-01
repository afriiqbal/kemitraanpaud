<?php 

require '../config/function.php';

$paraResult = checkParamID('id');
if (is_numeric($paraResult)) {
    $userId = validate($paraResult);

    // Pastikan untuk mendapatkan detail user terlebih dahulu
    $user = getById('datakontak', $userId);

    if ($user['datakontak'] == 200) {
        $userDeleteRes = deleteQuery('users', $userId);
        if ($userDeleteRes) {
            redirect('datakon.php', 'User Deleted Successfully');
        } else {
            redirect('datakon.php', 'Something Went Wrong');
        }
    } else {
        redirect('datakon.php', $user['message']);
    }
} else {
    redirect('datakon.php', $paraResult);
}