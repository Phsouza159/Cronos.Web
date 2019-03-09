<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel : @yield('title') </title>
</head>

<body>
    <div class="Layout-card"></div>

    <div class="">
        <div id="load-html">

        </div>
    </div>

    <!-- js -->
    <script src="{{asset('../resources/Lib/jquery/dist/jquery.js')}}"></script>
    <script src="{{asset('../resources/Lib/jquery/dist/jquery.cookie.js')}}"></script>
    <!--  <script src="{{asset('../resources/Lib/Nautilos/js/Nautilos.js')}}"></script> -->
    <script src="{{asset('../resources/Lib/Nautilos/src/nautilos.js')}}"></script>
    <script src="{{asset('../resources/Lib/anime-master/lib/anime.js')}}"></script>
    <script>

        nautilos.ctor({

            id : '#load-html' ,

            index: 'Home',

            securyte : false,

            root : 'http://127.0.0.1:8080/SGFP_PHP/public/',

            rout : {
                Home : ['http://127.0.0.1:8080/SGFP_PHP/public/getHtml' , 'anonymous'] ,
                Login : ['http://127.0.0.1:8080/SGFP_PHP/public/getHtml/login'] ,
                Portifolho : ['http://127.0.0.1:8080/SGFP_PHP/public/getHtml/portifolho'] ,
                Parametro : ['http://127.0.0.1:8080/SGFP_PHP/public/getHtml/parametro' ],
                Templete : ['http://127.0.0.1:8080/SGFP_PHP/public/getHtml/templete'],
            },

            required: {
                scripts: [
                    '../resources/Lib/less.js/dist/less.js',
                    '../resources/Lib/anime-master/lib/anime.min.js',
                    '../resources/Lib/bootstrap/js/bootstrap.js',
                ],
                links: [
                    '../resources/less/nautilos.less',
                    '../resources/Lib/bootstrap/css/bootstrap.css',
                    '../resources/less/layout.less',
                    '../resources/Lib/ChatBot/less/ChatStyle.less',
                ],
                partialViews : [
                   { view : 'http://127.0.0.1:8080/SGFP_PHP/public/getHtml/partiaViews'
                         , ids : ['teste' , 'teste2'] 
                   },
                ],
            }
        });
    </script>

</body>

</html>