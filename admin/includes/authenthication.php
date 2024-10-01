<?php
// Cek apakah session sudah dimulai
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['auth'])) {

    // Cek apakah role dan email sudah diset dalam sesi
    if (isset($_SESSION['loggedInUserRole']) && isset($_SESSION['loggedInUser']['email'])) {

        $role = validate($_SESSION['loggedInUserRole']); // Pastikan konsisten penamaan session
        $email = validate($_SESSION['loggedInUser']['email']);

        // Gunakan prepared statements untuk menghindari SQL injection
        $query = "SELECT * FROM users WHERE email=? AND role=? LIMIT 1";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $email, $role); // "ss" untuk dua parameter string
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result) {

            if (mysqli_num_rows($result) == 0) {
                logoutSession(); // Hapus sesi jika tidak ditemukan
                redirect('../login.php', 'Akses Ditolak');
            } else {

                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                
                // Cek apakah role pengguna adalah admin
                if ($row['role'] != 'admin') {
                    logoutSession(); // Hapus sesi jika role tidak sesuai
                    redirect('../login.php', 'Akses Ditolak');
                } else {
                    // Simpan nama pengguna di session
                    $_SESSION['user_name'] = $row['name']; // Pastikan 'name' adalah kolom nama di tabel users
                }
            }
        } else {
            // Jika query gagal dijalankan
            logoutSession();
            redirect('../login.php', 'Terjadi kesalahan');
        }
    }
} else {
    // Jika pengguna belum login
    redirect('../login.php', 'Login untuk melanjutkan...');
}   
?>
