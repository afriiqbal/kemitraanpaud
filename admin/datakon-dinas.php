<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Data Kontak dinas
                    <?php if ($userRole == 'admin') : ?>
                        <a href="datakon-create-dinas.php" class="btn btn-primary float-end">Tambah Kontak dinas</a>
                    <?php endif; ?>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Provinsi</th>
                            <th>Kab/Kota</th>
                            <th>Nama</th>
                            <th>Kontak</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        $Datadinas = getAll('datakontakdinas');
                        if ($Datadinas) {
                            if (mysqli_num_rows($Datadinas) > 0) {
                                foreach ($Datadinas as $Item) {
                                    ?>       
                                    <tr>
                                        <td><?= $Item['id']; ?></td>
                                        <td><?= $Item['prov']; ?></td>
                                        <td><?= $Item['kabkot']; ?></td>
                                        <td><?= $Item['name']; ?></td>
                                        <td><?= $Item['kontak']; ?></td>
                                        <td>
                                            <!-- Tombol untuk membuka modal -->
                                            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#viewModal<?= $Item['id']; ?>">View</button>

                                            <?php if ($userRole == 'admin') : ?>
                                                <a href="datakon-edit-dinas.php?id=<?= $Item['id']; ?>" class="btn btn-success btn-sm mx-2">Edit</a>
                                                <a href="datakon-delete-dinas.php?id=<?= $Item['id']; ?>"
                                                    class="btn btn-danger btn-sm"
                                                    onclick="return confirm('Anda yakin ingin menghapus data ini?')">
                                                    Delete
                                                </a>
                                            <?php endif; ?>
                                        </td>
                                    </tr>

<!-- Modal untuk menampilkan rincian data -->
 <div class="modal fade" id="viewModal<?= $Item['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title text-white" id="exampleModalLabel"><i class="fas fa-address-book text-white "></i> Rincian Kontak</h5>
                <button type="button" class="close bg-white text-primary" data-dismiss="modal" aria-label="Tutup">
                    <span aria-hidden="true"><i class="fas fa-times-circle"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>Provinsi:</strong> <?= $Item['prov']; ?></p>
                <p><strong>Kab/Kota:</strong> <?= $Item['kabkot']; ?></p>
                <p><strong>Nama:</strong> <?= $Item['name']; ?></p>
                <p><strong>Kontak:</strong> <?= $Item['kontak']; ?></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fas fa-times"></i> Tutup</button>
            </div>
        </div>
    </div>
</div>

                                    <?php
                                }
                            } else {
                                ?>
                                <tr>
                                    <td colspan="6">Tidak ada data yang ditemukan</td>
                                </tr>
                                <?php
                            }
                        } else {
                            ?>
                            <tr>
                                <td colspan="6">Terjadi kesalahan</td>
                            </tr>
                            <?php
                        }
                    ?>   
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
