<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Edit Data Kontak satuan
                </h4>
            </div>
            <div class="card-body">
                <?= alertMessage(); ?>
                
                <?php
                // Pastikan variabel ini konsisten dan diproses sebelum form dimulai
                $datakonsatuanResult = checkParamID('id');
                
                if (!is_numeric($datakonsatuanResult)) {
                    echo "<h5>ID tidak valid</h5>";
                    exit;  // Hentikan eksekusi jika ID tidak valid
                }

                // Mengambil data berdasarkan ID
                $dataKontaksatuan = getById('datakontaksatuan', $datakonsatuanResult);

                // Periksa apakah data ditemukan dan status sukses
                if ($dataKontaksatuan && $dataKontaksatuan['status'] == 200) {
                    ?>

                    <form action="codesatuan.php" method="POST">
                        <input type="hidden" name="id" value="<?= $datakonsatuanResult ?>">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label>Provinsi</label>
                                    <input type="text" name="prov" class="form-control" value="<?= $dataKontaksatuan['data']['prov'] ?>" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label>Kab/Kota</label>
                                    <input type="text" name="kabkot" class="form-control" value="<?= $dataKontaksatuan['data']['kabkot'] ?>" /> 
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label>Nama</label>
                                    <input type="text" name="name" class="form-control" value="<?= $dataKontaksatuan['data']['name'] ?>" /> 
                                </div>
                            </div>    
                        </div>
                        <div class="mb-3">
                            <button type="submit" name="updateKontaksatuan" class="btn btn-primary">Update</button>
                        </div>
                    </form>

                    <?php
                } else {
                    // Tampilkan pesan kesalahan jika data tidak ditemukan atau status gagal
                    echo "<h5>Data tidak ditemukan atau terjadi kesalahan: " . $dataKontaksatuan['message'] . "</h5>";
                }
                ?>
                
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
