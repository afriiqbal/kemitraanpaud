<?php
// Include necessary files and check session
include("includes/header.php"); 

// Cek apakah session sudah dimulai
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Cek apakah pengguna sudah login
if (!isset($_SESSION['auth'])) {
    header("Location: login.php");
    exit();
}

// Ambil data pengguna dari sesi
$user_name = $_SESSION['user_name'];
$user_email = $_SESSION['loggedInUser']['email']; // Ganti sesuai dengan data sesi yang Anda simpan
$user_role = $_SESSION['loggedInUserRole']; // Ganti sesuai dengan sesi

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - <?php echo $user_name; ?></title>
    <!-- Include Soft UI Dashboard CSS -->
    <link id="pagestyle" href="assets/css/soft-ui-dashboard.css?v=1.0.7" rel="stylesheet" />
    <!-- Additional CSS for layout adjustments -->
</head>
<body class="g-sidenav-show bg-gray-100">

<!-- Sidebar
<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
    <!-- Add your sidebar content here 
</aside> -->

<!-- Main Content -->
<div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
    <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
        <div class="container-fluid py-1">
            <nav aria-label="breadcrumb">
                <h6 class="text-white font-weight-bolder ms-2">Profile</h6>
            </nav>
            <ul class="navbar-nav justify-content-end">
                <li class="nav-item d-flex align-items-center">
                    <a href="javascript:;" class="nav-link text-white font-weight-bold px-0">
                        <i class="fa fa-user me-sm-1"></i>
                        <span class="d-sm-inline d-none"><?php echo $user_name; ?></span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- End Navbar -->

    <!-- Profile Header -->
    <div class="container-fluid py-4">
        <div class="page-header min-height-300 border-radius-xl mt-4" style="background-image: url('assets/img/curved-images/curved0.jpg'); background-position-y: 50%;">
            <span class="mask bg-gradient-primary opacity-6"></span>
        </div>
        <div class="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div class="row gx-4">
                <div class="col-auto">
                    <div class="avatar avatar-xl position-relative">
                        <img src="assets/img/profile.jpg" alt="profile_image" class="w-100 border-radius-lg shadow-sm">
                    </div>
                </div>
                <div class="col-auto my-auto">
                    <div class="h-100">
                        <h5 class="mb-1">
                            <?php echo $user_name; ?>
                        </h5>
                        <p class="mb-0 font-weight-bold text-sm">
                            <?php echo ucfirst($user_role); ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Information -->
        <div class="row">
            <div class="col-12 col-xl-4">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <h6 class="mb-0">Profile Information</h6>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; <?php echo $user_name; ?></li>
                            <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; <?php echo $user_email; ?></li>
                            <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Role:</strong> &nbsp; <?php echo ucfirst($user_role); ?></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Include JavaScript Files -->
<script src="assets/js/soft-ui-dashboard.min.js"></script>
</body>
</html>
