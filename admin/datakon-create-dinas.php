<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Tambah Data Kontak dinas
                    <a href="datakon-dinas.php" class="btn btn-primary float-end">Lihat Semua Kontak dinas</a>
                </h4>
            </div>
            <div class="card-body">
                <?= alertMessage(); ?>

                <form action="codedinas.php" method="POST">
                    <div class="mb-3">
                        <label>Provinsi</label>
                        <input type="text" name="prov" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label>Kab/Kota</label>
                        <input type="text" name="kabkot" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label>Nama</label>
                        <input type="text" name="name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label>Kontak</label>
                        <input type="text" name="kontak" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" name="saveDatadinas" class="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
