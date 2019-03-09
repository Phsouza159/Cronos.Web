<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta Access-Control-Allow-Origin="*">
    <meta Access-Control-Allow-Headers="Content-Type">

    <title>Cronbs</title>
</head>

<body>
    <div class="Layout-card"></div>

    <div class="container">

        <p class="h6">Cronos</p>

        <ul class='d-line'>
            <li><button router="Home" onclick="nautilos.rout(this)">Home</button></li>
            <li><button router="Livro" onclick="nautilos.rout(this)">Livro</button></li>
            <li><button router="Login" onclick="nautilos.rout(this)">Login</button></li>
        </ul>
        <hr/>
        <div id="load-html">

        </div>
    
    </div>

    <script src="www/Lib/jquery/dist/jquery.js"></script>
    <script src="www/Lib/jquery/dist/jquery.cookie.js"></script>
    <script src="www/Lib/Nautilos/src/nautilos.js"></script>
    <script src="www/Lib/Atlas/js/SelectDOM.js"></script>
    <script src="www/Lib/anime-master/lib/anime.js"></script>
    <script>

        nautilos.ctor({

            id: '#load-html',

            index: 'Home',

            securyte: false,

            root: 'http://127.0.0.1:80/Cronos/',

            rootApi: 'http://localhost:5000/api/',

            rout: {
                Home: ['www/pags/home.html'],
                Login: ['www/pags/login.html', 'anonymous'],
                Livro: ['www/pags/livro.html'],
            },

            required: {
                scripts: [
                    'www/Lib/less.js/dist/less.js',
                    'www/Lib/anime-master/lib/anime.min.js',
                    'www/js/Oper/main.js',
                    'www/Lib/bootstrap/js/bootstrap.js',
                    'www/Lib/datatables/js/jquery.dataTables.min.js',
                    'www/Lib/datatables-responsive/dataTables.responsive.js',
                    'www/Lib/datatables/js/dataTables.bootstrap4.min.js',
                    'www/js/datatbles.js',
                ],
                links: [
                    'www/less/nautilos.less',
                    'www/Lib/bootstrap/css/bootstrap.css',
                    'www/less/layout.less',
                    'www/Lib/ChatBot/less/ChatStyle.less',
                    'www/Lib/datatables/css/dataTables.bootstrap4.css',
                    'www/Lib/datatables-plugins/dataTables.bootstrap.css',
                    'www/Lib/datatables-responsive/dataTables.responsive.css',
                ],
                partialViews: [
                    {
                        view: 'www/pags/Views.html' , ids: ['Login', 'NewUser' , 'NewLivro']
                    },
                ], 
            }
        });
    </script>
</body>

</html>