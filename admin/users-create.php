<?php include("includes/header.php"); ?>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add User
                    <a href="users.php" class="btn btn-danger float-end">Back</a>
                </h4>
            </div>
            <div class="card-body">

                <?= alertMessage(); ?>
                <form action="code.php" method="POST">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>Nama</label>
                                <input type="text" name="name" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>No Telephone</label>
                                <input type="text" name="phone" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>Email</label>
                                <input type="text" name="email" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>Password</label>
                                <input type="text" name="password" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>Ketik Ulang Password</label>
                                <input type="text" name="confirm_password" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="mb-3">
                                <label>Pilih Role</label>
                                <select name="role" class="form-select">
                                    <option value="">Pilih Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 text-end">
                                <br/>
                                <button type="submit" name="saveuser" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
