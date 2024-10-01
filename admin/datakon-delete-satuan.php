<?php 

require '../config/function.php';

// Pastikan untuk menggunakan variabel yang tepat dan konsisten
$paraResult = checkParamID('id');
var_dump($paraResult); // Debugging untuk memastikan $paraResult

if (is_numeric($paraResult)) {
    $dataKontaksatuanId = validate($paraResult);

    // Pastikan untuk mendapatkan detail user terlebih dahulu
    $usersatuan = getById('datakontaksatuan', $dataKontaksatuanId);

    // Periksa apakah status pengambilan data adalah 200 (berhasil)
    if ($usersatuan['status'] == 200) {
        // Lakukan penghapusan data berdasarkan ID
        $dataKontaksatuanDeleteRes = deleteQuery('datakontaksatuan', $dataKontaksatuanId);
        if ($dataKontaksatuanDeleteRes) {
            redirect('datakon-satuan.php', 'User Deleted Successfully');
        } else {
            // Jika gagal, tampilkan pesan kesalahan
            error_log('Delete operation failed: ' . mysqli_error($koneksi)); // Debugging query error
            redirect('datakon-satuan.php', 'Something Went Wrong');
        }
    } else {
        // Jika data tidak ditemukan atau status bukan 200
        redirect('datakon-satuan.php', $usersatuan['message']);
    }
} else {
    // Jika ID tidak valid
    redirect('datakon-satuan.php', 'Invalid ID');
}
