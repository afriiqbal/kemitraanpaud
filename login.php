<?php
include('includes/header.php');


if(isset($_SESSION['auth'])){
    redirect('index.php','You are already logged in');
}
?>

<div class="py-4 bg-secondary text-center">

<div class="py-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-header">
                        <h4>Halaman Login</h4>
                    </div>
                    <div class="card-body">

                    <?= alertMessage(); ?>
                        <form action="login-code.php" method="POST">

                            <div class="mb-3">
                                <label>Email Address</label>
                                <input type="email" name="email" class="form-control">
                            </div>

                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control">
                            </div>

                            <div class="mb-3">
                                <button type="submit" name="loginBtn" class="btn btn-primary w-100">Login </button>
                            </div>

                            

                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


</div>
