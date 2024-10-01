<?php
session_start();
include('../config/dbcon.php');
require_once('../config/function.php');

if(isset($_POST['saveDatadinas'])) 
{
    $prov = validate($_POST['prov']);
    $kabkot = validate($_POST['kabkot']);
    $name = validate($_POST['name']);
    $kontak = validate($_POST['kontak']);

    if($prov != '' && $kabkot != '' && $name != '' && $kontak != '')
    {
        $query = "INSERT INTO datakontakdinas (prov, kabkot, name, kontak) 
                    VALUES ('$prov', '$kabkot', '$name', '$kontak')";
        $query_run = mysqli_query($conn, $query);

        if($query_run)
        {
            $_SESSION['status'] = "Contact Added Successfully";
            header("Location: datakon-dinas.php");
            exit(0);
        }
        else
        {
            $_SESSION['status'] = "Failed to Add Contact";
            header("Location: datakon-create-dinas.php");
            exit(0);
        }
    }
    else
    {
        $_SESSION['status'] = "All fields are mandatory";
        header("Location: datakon-create-dinas.php");
        exit(0);
    }
}
else
{
    $_SESSION['status'] = "Invalid Request";
    header("Location: datakon-create-dinas.php");
    exit(0);
}

?>