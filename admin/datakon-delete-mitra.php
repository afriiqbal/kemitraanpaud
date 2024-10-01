<?php 

require '../config/function.php';

$paraResult = checkParamID('id');
if (is_numeric($paraResult)) {
    $userId = validate($paraResult);

    // Pastikan untuk mendapatkan detail user terlebih dahulu
    $user = getById('datakontakmitra', $userId);

    if ($user['datakontakmitra'] == 200) {
        $userDeleteRes = deleteQuery('users', $userId);
        if ($userDeleteRes) {
            redirect('datakon-mitra.php', 'User Deleted Successfully');
        } else {
            redirect('datakon-mitra.php', 'Something Went Wrong');
        }
    } else {
        redirect('datakon-mitra.php', $user['message']);
    }
} else {
    redirect('datakon-mitra.php', $paraResult);
}