<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Daftar Pengguna Ruang Kemitraan
                    <a href="users-create.php" class="btn btn-primary float-end">Tambah Pengguna</a>
                </h4>
            </div>
            <div class="card-body">

                <table class="table table-borderd table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomor Telephone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $users = getAll('users');
                            if(mysqli_num_rows($users) > 0)
                            {
                                foreach($users as $userItem)
                                {
                                    ?>       
                                        <tr>
                            
                                                <td><?= $userItem['id']; ?></td>
                                                <td><?= $userItem['name']; ?></td>
                                                <td><?= $userItem['email']; ?></td>
                                                <td><?= $userItem['phone']; ?></td>
                                                <td><?= $userItem['role']; ?></td>
                                                <td>
                                                    <a href="user-edit.php?id=<?= $userItem['id'] ?>" class="btn btn-success btn-sm">Edit</a>
                                                    <a href="user-delete.php?id=<?= $userItem['id']; ?>"
                                                        class="btn btn-danger btn-sm mx-2"
                                                        onclick="return confirm('Are you sure want to delete this data?')"
                                                        >
                                                        Delete
                                                </td>
                                            
                                        </tr>
                                    <?php
                                }
                            }
                            else
                            {
                                ?>
                                <tr>
                                    <td colspan="7">Data Tidak Ditemukan</td>
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
