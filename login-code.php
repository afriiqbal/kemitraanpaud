<?php

require 'config/function.php';

if(isset($_POST['loginBtn']))
{
        $emailInput = validate($_POST['email']);
        $passwordInput = validate($_POST['password']);

        $email = filter_var($emailInput, FILTER_SANITIZE_EMAIL);
        $password = filter_var($passwordInput, FILTER_SANITIZE_STRING);

        // Perbaiki logika pengecekan email dan password
        if($email != '' && $password != '')
        {
            $query = "SELECT * FROM users WHERE email='$email' AND password='$password' LIMIT 1";
            $result = mysqli_query($conn, $query);

            if($result)
            {
                if(mysqli_num_rows($result) == 1)
                {
                    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                    if ($row['role'] == 'admin')
                    {
                        if($row['is_ban'] == 1){
                            redirect('login.php', 'your account banned');
                        }

                        $_SESSION['auth'] = true;
                        $_SESSION['loggedInUserRole'] = $row['role'];
                        $_SESSION['loggedInUser'] = [
                            'name' => $row['name'],
                            'email' => $row['email']
                        ];

                        redirect('admin/index.php','Logged In Succesfully');
                    }
                    else
                    {
                        if($row['is_ban'] == 1){
                            redirect('admin/login.php', 'your account banned');
                        }

                        $_SESSION['auth'] = true;
                        $_SESSION['loggedInUserRole'] = $row['role'];
                        $_SESSION['loggedInUser'] = [
                            'name' => $row['name'],
                            'email' => $row['email']
                        ];
                        redirect('admin/index.php','User Logged In Succesfully');
                    }
                }
                else
                {
                    redirect('login.php','Invalid Email Id or Password');
                }

            }
            else
            {
                redirect('login.php','Something Went Wrong');

            }

        }
        else
        {
            redirect('login.php','All Fields are Mandatory');


        }
}

?>
