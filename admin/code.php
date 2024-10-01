<?php
session_start();
include('../config/dbcon.php');
require_once('../config/function.php');

if (isset($_POST['updateKontak'])) {
    if (isset($_POST['id']) && is_numeric($_POST['id'])) {
        $dataKontakId = validate($_POST['id']);
        $prov = validate($_POST['prov']);
        $kabkot = validate($_POST['kabkot']);
        $name = validate($_POST['name']);
        
        // Validasi bahwa semua field diisi
        if ($prov != '' && $kabkot != '' && $name != '') {
            // Update data berdasarkan ID
            $query = "UPDATE datakontak SET prov='$prov', kabkot='$kabkot', name='$name' WHERE id='$dataKontakId'";
            $query_run = mysqli_query($conn, $query);

            if ($query_run) {
                $_SESSION['status'] = "Data updated successfully";
                header("Location: datakon.php");
                exit(0);
            } else {
                $_SESSION['status'] = "Failed to update data";
                header("Location: datakon-edit.php?id=$dataKontakId");
                exit(0);
            }
        } else {
            $_SESSION['status'] = "All fields are mandatory";
            header("Location: datakon-edit.php?id=$dataKontakId");
            exit(0);
        }
    } else {
        $_SESSION['status'] = "Invalid Request";
        header("Location: datakon-edit-.php");
        exit(0);
    }
} else {
    $_SESSION['status'] = "Invalid Request";
    header("Location: datakon-edit.php");
    exit(0);
}
