<?php 
include("includes/header.php"); 
require_once('../config/function.php'); // Menyertakan file function.php yang mengandung koneksi database

if (isset($_POST['enquireBtn'])) {
    // Ambil data dari formulir dengan pemeriksaan isset untuk menghindari undefined index
    $namatamu = isset($_POST['nama']) ? $_POST['nama'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $layanan = isset($_POST['layanan']) ? $_POST['layanan'] : '';
    $pesan = isset($_POST['pesan']) ? $_POST['pesan'] : '';

    // Pastikan koneksi database ada
    global $conn; // Menggunakan koneksi dari function.php

    // Mempersiapkan pernyataan SQL untuk menghindari SQL Injection
    $stmt = $conn->prepare("INSERT INTO layanan_tamu (nama, email, phone, layanan, pesan) VALUES (?, ?, ?, ?, ?)");
    if($stmt) {
        $stmt->bind_param("sssss", $namatamu, $email, $phone, $layanan, $pesan);

        // Mengeksekusi query dan mengecek keberhasilan
        if ($stmt->execute()) {
            echo "<div class='alert alert-success'>Pesan Telah Diterima, Mohon untuk menunggu!</div>";
        } else {
            echo "<div class='alert alert-danger'>Error: " . $stmt->error . "</div>";
        }

        // Menutup statement
        $stmt->close();
    } else {
        echo "<div class='alert alert-danger'>Error: Could not prepare statement.</div>";
    }
}
?>

<div class="row">
    <div class="col-md-6">
        <div class="card mb-5">
            <div class="card-header">
                <h4>
                    Layanan Tamu
                </h4>
            </div>
            <div class="card-body">
                <form action="" method="POST">

                    <div class="mb-3">
                        <label>Nama</label>
                        <input type="text" name="nama" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Email</label>
                        <input type="text" name="email" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Nomor Telephone</label>
                        <input type="text" name="phone" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Pilih Layanan</label>
                        <select name="layanan" class="form-select">
                            <div class="mb-3">
                                <option value="">Pilih Layanan</option>
                                <option value="Keluhan">keluhan</option>
                                <option value="Layanan">layanan</option>
                                <option value="Saran">saran</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Pesan</label>
                        <textarea name="pesan" type="text" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <button type="submit" name="enquireBtn" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card mb-5">
            <div class="card-header">
                <h4>
                    Form Pengajuan Mitra
                </h4>
            </div>
            <div class="card-body">
                <form action="" method="POST">

                    <div class="mb-3">
                        <label>Keperluan</label>
                        <input type="text" name="nama" class="form-control">
                    </div>
                    <div class="mb-3">
                        <button type="submit" name="enquireBtn" class="btn btn-primary">Ajukan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php 
include("includes/footer.php"); 
?>
