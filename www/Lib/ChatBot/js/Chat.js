class ChatBot{

    constructor(ob = ""){
        if(ob == "" || (typeof ob) != "object" )
            return;

        var ChatBot = new Object();

        ChatBot.index               = ""; // numero de mensagens
        ChatBot.pagMain             = "";
        ChatBot.id                  = ob.hasOwnProperty('id') ? ob.id : "";  // ID do cha bot
        ChatBot.nameBot             = ob.hasOwnProperty('nameBot') ? ob.nameBot : "Bot" ;            // Nome do chat Boot
        ChatBot.Cadastro            = Array();// array para cadastro
        ChatBot.msg                 = "";
        ChatBot.esperarResposta     = "";
        ChatBot.primeira            = true;
        ChatBot.ultimaPergunta      = "";
        ChatBot.IsRespota           = "";
        ChatBot.chace               = "";
        ChatBot.desenvolvimento     = "";
        ChatBot.historicoConversa   = new Array("{isIndexPerguntas}");

        /**
         * @param ChatBot
         */
        ChatBot.main = function(ChatBot = null){
            if(ChatBot === null) return;
            this.setHtmlBot( this.id );
            this.efeitoChar( this );
        };
        /**
         * @param idHtml
         */
        ChatBot.setHtmlBot = function(idHtml) {
            var html = "<div class='body-chat'>";
            html +=  "   <div id='chat-circle' class='btn btn-raised'>";
            html +=  "           <div id='chat-overlay'></div><i class='material-icons'>speaker_phone</i></div>";
            html +=  "             <div class='chat-box'>";
            html +=  "                  <div class='chat-box-header'> ChatBot ";
            html +=  "                             <span class='chat-box-toggle'><i class='material-icons'>close</i></span>";
            html +=  "                             <span id='MaxMin' class='chat-box-toggle-maximize'><i class='material-icons'>[maximize]</i></span>";
            html +=  "                       </div>";
            html +=  "                       <div class='chat-box-body'>";
            html +=  "                          <div class='chat-box-overlay'></div>";
            html +=  "                             <div class='chat-logs'></div>";
            html +=  "                          </div>";
            html +=  "                       <div class='chat-input'>";
            html +=  "             <form>";
            html +=  "              <input type='text' id='chat-input' placeholder='Send a message...' />";
            html +=  "             <button type='submit' class='chat-submit' id='chat-submit'><i class='material-icons'>send</i></button>";
            html +=  "            </form>";
            html +=  "       </div>";
            html +=  "       </div>";

            $(idHtml).html(html);
        };
        /**
         * @param ChatBot
         */
        ChatBot.efeitoChar = function(ChatBot) {

                $(function () {
                    var collapase = true;

                    $(document).delegate(".chat-btn", "click", function () {
                        var value = $(this).attr("chat-value");
                        var name = $(this).html();
                        $("#chat-input").attr("disabled", false);
                        generate_message(name, 'self');

                    })

                    $("#chat-circle").click(function () {

                        $("#chat-circle").toggle('scale');
                        $(".chat-box").toggle('scale');

                        if(ChatBot.primeira)
                        {
                            ChatBot.timeMensagem('olá, o meu nome é ' + ChatBot.nameBot , 800 );
                            ChatBot.timeMensagem('Qual o seu nome?' , 1600 );

                            ChatBot.primeira = false;
                        }

                    })

                    $(".chat-box-toggle").click(function () {

                        $('.chat-box').removeClass('chat-box-maximize , chat-box-minimize ');
                        $('#MaxMin').html('[maxmize]');
                        $("#chat-circle").toggle('scale');
                        $(".chat-box").toggle('scale');
                    })


                    $(".chat-box-toggle-maximize").click( function (){

                        if(collapase)
                        {
                            collapase = false;
                            $('.chat-box').addClass('chat-box-maximize');
                            $('.chat-box').removeClass('chat-box-minimize');
                            $('#MaxMin').html('[minimize]');
                        }
                        else
                        {
                            collapase = true;
                            $('.chat-box').removeClass('chat-box-maximize');
                            $('.chat-box').addClass('chat-box-minimize');
                            $('#MaxMin').html('[maxmize]');

                        }
                    });

                });
        };
        /**
         * @param msg
         * @param index
         * @param type
         */
        ChatBot.gerarHtmlMensagem = function(msg , index , type){

            this.historicoConversa.push( "{"+index+"}" + msg);

            console.dir(this.historicoConversa);

            var str = "";
            str += "<div id='cm-msg-" + index + "' class=\"chat-msg " + type + "\">";
            str += "          <span class=\"msg-avatar\">";
            str += "          <\/span>";
            str += "          <div class=\"cm-msg-text\">";
            str += msg;
            str += "          <\/div>";
            str += "        <\/div>";

            $(".chat-logs").append(str);

            $("#cm-msg-" + index).hide().fadeIn(300);

            if (type == 'self') {
                $("#chat-input").val('');
            }

            $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
            //console.dir(this.ultimaPergunta);
        };
        /**
         * @param mensagem
         * @param time
         * @param type
         * @param resposta
         */
        ChatBot.timeMensagem = function(mensagem , time , type = 'self' , resposta = false) {
            var aux = this;
            setTimeout( function(){ aux.gerarHtmlMensagem(mensagem, type , resposta); } , time);
            //this.ultimaPergunta = mensagem;
        };

        ChatBot.main(ChatBot);

        console.log(ChatBot);

        return this;
    };


    // --------------------------------

    main(idHTml)
    {
        this.setHtmlBot(idHTml);
        this.efeitoChar();
        this.primeira = true;
        this.ultimaPergunta;
        this.historicoConversa = new Array("{isIndexPerguntas}");
        this.IsRespota = 1;
        this.index = 1;
        // this.pagMain = "../Chat.Servico/main.php";
        this.esperarRespota = false;

        var aux = this;
        var mes = null;

        $("#chat-submit").click(function (e) {

            e.preventDefault();
            var mes = aux.receberMensagem();

            console.dir(mes);

            if(aux.validarMensagem(mes)){
                aux.gerarMensagem(mes, 'self');
                aux.gerarMensagem(mes, 'user');
            }

        });


        return this;
    }

    setHtmlBot(idHtml)
    {
        var html = "<div class='body-chat'>";
            html +=  "   <div id='chat-circle' class='btn btn-raised'>";
            html +=  "           <div id='chat-overlay'></div><i class='material-icons'>speaker_phone</i></div>";
            html +=  "             <div class='chat-box'>";
            html +=  "                  <div class='chat-box-header'> ChatBot ";
            html +=  "                             <span class='chat-box-toggle'><i class='material-icons'>close</i></span>";
            html +=  "                             <span id='MaxMin' class='chat-box-toggle-maximize'><i class='material-icons'>[maximize]</i></span>";
            html +=  "                       </div>";
            html +=  "                       <div class='chat-box-body'>";
            html +=  "                          <div class='chat-box-overlay'></div>";
            html +=  "                             <div class='chat-logs'></div>";
            html +=  "                          </div>";
            html +=  "                       <div class='chat-input'>";
            html +=  "             <form>";
            html +=  "              <input type='text' id='chat-input' placeholder='Send a message...' />";
            html +=  "             <button type='submit' class='chat-submit' id='chat-submit'><i class='material-icons'>send</i></button>";
            html +=  "            </form>";
            html +=  "       </div>";
            html +=  "       </div>";

        $(idHtml).html(html);
    }

    /**
     *
     * @param {*} con
     */
    Config(con)
    {
        switch(true)
        {
            case (con.name != "undefined" && con.name != null):

                this.setName(con.name);

                con.name = null;
                this.Config(con);
                break;

            case (con.connect != "undefined" && con.connect != null):
                this.setMain(con.connect);
                con.connect = null;
                this.Config(con);
                break;

            case (con.desenvolvimento != "undefined" && con.desenvolvimento != null):

                this.desenvolvimento = con.desenvolvimento;
                con.desenvolvimento = null;
                this.Config(con);
                break;

            default:
                return;
        }
        console.dir(con);
        return this;
    }

    getCacheJson()
    {
        if(this.cache == null || this.cache == "undefined")
            return "Null";

        return JSON.stringify(this.cache)
    }

    getHistorico(){
        return JSON.stringify(this.historicoConversa)
    }

    /**
     * buscar mensagem no servidor
     */
    getMensgem(mensagem, id) {

        var xmlhttp = new XMLHttpRequest();
        var aux = this;


        var obj = {
            "mensagem": mensagem,
            "desenvolvimento" : this.desenvolvimento,
            "isResposta" : this.IsRespota,
            "ultimaPergunta" : this.ultimaPergunta,
            "cache" : this.getCacheJson(),
            "historico" : this.getHistorico()

        };

        var json = JSON.stringify(obj);


        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var resposta = '';
                var json = this.responseText.replace("\\" , ' ');

                console.log(json);

                var MyObjct = JSON.parse(json);
                if(typeof MyObjct.resposta == 'string')
                {
                    resposta = MyObjct.resposta;
                }
                else
                {
                    aux.IsRespota = MyObjct.IsResposta;
                    resposta      = MyObjct.Resposta.resposta;
                }


                console.log(MyObjct);
                $('#respostaServidor'+id).html(resposta);



            }
        };
        xmlhttp.open("POST", this.pagMain, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("mensagem=" + json );
        console.dir(json);
        console.dir(xmlhttp);
        return this;
    }
    /**
     *
     * @param {*} main
     */
    setMain(main){
        this.pagMain = main;
        return this;
    }
    /**
     *
     * @param {*} name
     */
    setName(name) {

        this.nameBot = name;
        this.cache = {chatBotName: name };
        return this;

    };
    /**
     *
     * @param {*} Cadastro
     */
    setCadastro(Cadastro){

        if(typeof Cadastro === "function")
            this.Cadastro = Cadastro();

        else
            this.Cadastro = Cadastro;

        return this;
    }
    /**
     *
     * @param {*} value
     */
    verficarTipoVariavel(value)
    {
        switch(true)
        {

            case value.startsWith("{string}") == 1:
                console.dir(value.substr(8));
                break;
        }
        return this;
    }
    /**
     * Pegar mensagem do submit
     */
    receberMensagem()
    {
        return  $("#chat-input").val();
    }
    /**
     *
     * @param {*} msg
     */
    validarMensagem(msg)
    {
        if (msg.trim() == '') {
            return false;
        }
        return true;
    }
    /**
     *
     * @param {*} msg
     * @param {*} type
     * @param {*} buscarResposta
     */
    gerarMensagem(msg, type , buscarResposta = true)
    {
        var index = this.index++;
        var aux = this;

        if(type == "user" && buscarResposta)
        {
            this.getMensgem(msg , index)
            msg = "<span id='respostaServidor"+index+"'></span>";

        }

        this.gerarHtmlMensagem(msg , index ,type );

        return this;
    }
    /**
     * @param {mensgem que vai sair na tela } msg
     * @param {contador para o ID } index
     * @param {tipo para a classe } msg
     * @param {str} return HTML;
     */
    gerarHtmlMensagem(msg , index , type)
    {


        this.historicoConversa.push( "{"+index+"}" + msg);
        console.dir(this.historicoConversa);
        var str = "";
        str += "<div id='cm-msg-" + index + "' class=\"chat-msg " + type + "\">";
        str += "          <span class=\"msg-avatar\">";
        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "        <\/div>";

        $(".chat-logs").append(str);

        $("#cm-msg-" + index).hide().fadeIn(300);

        if (type == 'self') {

            $("#chat-input").val('');

        }

        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);


        //console.dir(this.ultimaPergunta);
    }
    /**
     * Esperar resposta
     */
    esperarRespota()
    {

    }

    efeitoChar()
    {
        var aux = this;

        $(function () {
            var collapase = true;

            $(document).delegate(".chat-btn", "click", function () {
                var value = $(this).attr("chat-value");
                var name = $(this).html();
                $("#chat-input").attr("disabled", false);
                generate_message(name, 'self');

            })

            $("#chat-circle").click(function () {

                $("#chat-circle").toggle('scale');
                $(".chat-box").toggle('scale');

                if(BotChat.primeira)
                {
                    aux.timeMensagem('olá, o meu nome é ' + BotChat.nameBot , 800 );
                    aux.timeMensagem('Qual o seu nome?' , 1600 );

                    BotChat.primeira = false;
                }

            })

            $(".chat-box-toggle").click(function () {

                $('.chat-box').removeClass('chat-box-maximize , chat-box-minimize ');
                $('#MaxMin').html('[maxmize]');
                $("#chat-circle").toggle('scale');
                $(".chat-box").toggle('scale');
            })


            $(".chat-box-toggle-maximize").click( function (){

                if(collapase)
                {
                    collapase = false;
                    $('.chat-box').addClass('chat-box-maximize');
                    $('.chat-box').removeClass('chat-box-minimize');
                    $('#MaxMin').html('[minimize]');
                }
                else
                {
                    collapase = true;
                    $('.chat-box').removeClass('chat-box-maximize');
                    $('.chat-box').addClass('chat-box-minimize');
                    $('#MaxMin').html('[maxmize]');

                }
            });

        });
    }

    timeMensagem(mensagem , time , type = 'self' , resposta = false)
    {
        var aux = this;
        setTimeout( function(){

            aux.gerarHtmlMensagem(mensagem, type , resposta);

        } , time);

        this.ultimaPergunta = mensagem;
    }


}



