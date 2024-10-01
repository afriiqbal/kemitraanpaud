<?php
session_start();

require 'dbcon.php';

// Fungsi untuk memvalidasi input menggunakan mysqli_real_escape_string
function validate($inputData) {
    global $conn;
    return mysqli_real_escape_string($conn, $inputData);
}

function logoutSession(){

    unset($_SESSION['auth']);
    unset($_SESSION['loggedInUserRole']);
    unset($_SESSION['loggedInUser']);
}

// Fungsi untuk mengalihkan halaman dengan status
function redirect($page, $status) {
    $_SESSION['status'] = $status;
    header('Location: ' . $page);
    exit(0);
}

function alertMessage()
{
    if(isset($_SESSION['status']))
    {
        echo '<div class="alert alert-success">
            <h4>'.$_SESSION['status'].'</h4>
        </div>';
        unset ($_SESSION['status']);
    }
}

function checkParamID($paramType) {
    if(isset ($_GET[$paramType])){
        if($_GET[$paramType] != null){
            return $_GET[$paramType];
        }else{
            return 'No id found';
        }
    }else{
        return 'No id given';
    }
}

function getAll($tableName)
{
    global $conn;

    $table = validate($tableName);

    $query="SELECT * FROM $table";
    $result = mysqli_query($conn, $query);
    return $result;
}

function getById($tableName, $id)
{
    global $conn;

    $table = validate($tableName);
    $id = validate($id);

    $query = "SELECT * FROM $table WHERE id='$id' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if($result)
    {
        if(mysqli_num_rows($result) == 1)
        {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            $response = [
                'status' => 200,
                'message' => 'Fected data',
                'data' => $row
            ];
            return $response;
        
        }
        else
        {
            $response = [
                'status' => 404,
                'message' => 'No Data Record'
            ];
            return $response;
        }
    }
    else
    {
        $response = [
            'status' => 500,
            'message' => 'something went wrong'
        ];
        return $response;
    }
}

function deleteQuery($tableName, $id){

    global $conn;

    $table = validate($tableName);
    $id = validate($id);

    $query = "DELETE FROM $table WHERE id='$id' LIMIT 1";
    $result = mysqli_query($conn, $query);
    return $result;
}

?>

