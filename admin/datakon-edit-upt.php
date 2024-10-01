<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Edit Data Kontak UPT
                </h4>
            </div>
            <div class="card-body">
                <?= alertMessage(); ?>

                <form action="codeupt.php" method="POST">
                    
                    <?php
                    $paramResult = checkParamID('id');
                    if (!is_numeric($paramResult)) {
                        echo "<h5>ID tidak valid</h5>";
                        return false;
                    }

                    $dataKontakupt = getById('datakontakupt', $paramResult);
                    if ($dataKontauptk) {
                        if ($dataKontakupt['status'] == 200) {
                            ?>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Provinsi</label>
                                        <input type="text" name="prov" class="form-control" value="<?= $dataKontakupt['data']['prov'] ?>" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Kab/Kota</label>
                                        <input type="text" name="kabkot" class="form-control" value="<?= $dataKontakupt['data']['kabkot'] ?>" /> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Nama</label>
                                        <input type="text" name="name" class="form-control" value="<?= $dataKontakupt['data']['name'] ?>" /> 
                                    </div>
                                </div>    
                            </div>
                            <div class="mb-3">
                                <button type="submit" name="updateKontakupt" class="btn btn-primary">Update</button>
                            </div>

                            <?php
                        } else {
                            echo "<h5>" . $dataKontakupt['message'] . "</h5>";
                        }
                    } else {
                        echo "<h5>Terjadi kesalahan</h5>";
                    }
                    ?>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
