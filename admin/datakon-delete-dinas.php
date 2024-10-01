<?php 

require '../config/function.php';

$dataKontakdinasResult = checkParamID('id');
if (is_numeric($dataKontakdinasResult)) {
    $userdataKontakdinasId = validate($dataKontakdinasResult);

    // Pastikan untuk mendapatkan detail user terlebih dahulu
    $userdataKontakdinas = getById('datakontakdinas', $userId);

    if ($user['datakontakdinas'] == 200) {
        $userdataKontakdinasDeleteRes = deleteQuery('users', $userdataKontakdinasId);
        if ($userdataKontakdinasDeleteRes) {
            redirect('datakon-dinas.php', 'User Deleted Successfully');
        } else {
            redirect('datakon-dinas.php', 'Something Went Wrong');
        }
    } else {
        redirect('datakon-dinas.php', $userdataKontakdinas['message']);
    }
} else {
    redirect('datakon-dinas.php', $dataKontakdinasResult);
}