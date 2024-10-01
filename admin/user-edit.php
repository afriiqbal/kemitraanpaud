<?php include("includes/header.php"); 
require_once ("includes/function.php")
?>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4>
                    Edit User
                    <a href="users.php" class="btn btn-danger float-end">Back</a>
                </h4>
            </div>
            <div class="card-body">


                <form action="code.php" method="POST">

                <?php
                   // Ensure the parameter 'id' is captured from the URL
                   if (isset($_GET['id']) && is_numeric($_GET['id'])) {
                        $userId = $_GET['id'];
                        $user = getById('users', $userId);
                        if ($user['status'] == 200)
                        {
                ?>
                    <input type="hidden" name="userId" value="<?= $user['data']['id'] ;?>" required>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Nama</label>
                                        <input type="text" name="name" value="<?= $user['data']['name']; ?>" required class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>No Telephone</label>
                                        <input type="text" name="phone" value="<?= $user['data']['phone']; ?>" required class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" value="<?= $user['data']['email']; ?>" required class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Password</label>
                                        <input type="text" name="password" required class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Ketik Ulang Password</label>
                                        <input type="text" name="confirm_password" required class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label>Pilih Role</label>
                                        <select name="role" class="form-select">
                                            <option value="">Pilih Role</option>
                                            <option value="admin" <?= $user['data']['role'] == 'admin' ? 'selected' : '' ; ?>>Admin</option>
                                            <option value="user" <?= $user['data']['role'] == 'user' ? 'selected' : '' ; ?>>User</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3 text-end">
                                        <br/>
                                        <button type="submit" name="saveuser" class="btn btn-primary">Update User</button>
                                    </div>
                                </div>
                            </div>
                        <?php
                        } else {
                            echo '<h5>'.$user['message'].'</h5>';
                        }
                    } else {
                        echo '<h5>User ID not provided or invalid</h5>';
                    }
                ?>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php"); ?>
