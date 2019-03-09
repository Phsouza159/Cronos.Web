/**
 *  Author: Paulo Henrique
 *  Email: pauloh159@live.com
 * 
 *  Lib: Nautilos 
 */
(function (global) {

    var Nautilos = {};

    var doc = document;

    var newElement = (tag) => {

        var element = `<${tag}>`;

        return $(element);
    }

    Nautilos.newElement = newElement;

    Nautilos.about = {
        name: 'Nautilos 1.0.1',
        dateCompilation: '03/02/2019',
    };

    Nautilos.proxy = function (args = null) {
        return this;
    };

    /**
     * Cache para armazenar dados 
     */
    Nautilos.cache = {
        // limpar cache
        clear: function () {
            this.values = { user : {}};
            this.parametros = {};
        },

        values: {
            user : {}
        },

        parametros: {

        }
    }

    /**
     * gerar html do load 
     */
    Nautilos.loadHtml = () => {
        var i = 0, length = 5, eHead, ebody, elaod, eSubbody, text, eBar;

        eHead = newElement('div').attr('class', 'load-nautilos');
        ebody = newElement('div').attr('class', 'load-nautilos-body');
        elaod = newElement('div').attr('class', 'loader');

        for (; i < length; i++)
            elaod[0].appendChild(newElement('div').attr('class', 'circle')[0]);

        text = doc.createElement('h6');
        text.append(doc.createTextNode('Nautilos carregando arquivos...'));

        eBar = newElement('div').attr('class', 'load-nautilos-nautilos-bar');
        eSubbody = newElement('div').attr('class', 'load-nautilos-sub-body');

        eSubbody[0].appendChild(text);
        eSubbody[0].appendChild(eBar[0]);
        eSubbody[0].appendChild(newElement('div').attr('id', 'load-efect')[0]);

        ebody[0].appendChild(elaod[0]);
        ebody[0].appendChild(doc.createElement('br'));
        ebody[0].appendChild(eSubbody[0]);

        eHead[0].appendChild(ebody[0]);

        $('body').prepend(eHead[0]);

        return Nautilos.proxy();
    };

    function __getValid() {
        var __aux__ = {};

        __aux__._isValid = true;
        __aux__._notificacoes = []

        return __aux__
    }

    Nautilos.ctor = function (ob) {

        this.loadHtml();
        this.core.urlRoot = window.location.href;
        this.core.__main__(ob, this.system);

    };

    Nautilos.sucesso = function () {
        return this.core.response.data;
    };
    /**
     * Pegar view pela rota
     */
    Nautilos.rout = function (element) {
        var key, attr, html, id = '', parametros = window.location.search;

        attr = $(element).attr('router');
        id = $(element).attr('router-id') != null ? '/' + $(element).attr('router-id') : '';


        key = this.core.getRoute(attr);
        if (key < 0) {
            console.log('Não foi possível achar a rota :: ' + attr);
            return;
        }
        //gerar parametro da view
        if (id != null) {

            var val = id.replace('/', '');

            this.cache.parametros[attr] = {};
            this.cache.parametros[attr].id = val;

            global[('nt_' + attr)] = val;
        }

        html = this.core.getData(key);
        nautilos.core.response.viewAtual = attr;
        $(this.core.id).html(html);

        var url = this.core.urlRoot.split('?')[0] + attr + id + parametros
        window.history.pushState("object or string", "Title", url);

        this.core.cmd.call();
    };

    Nautilos.parametros = function (rota) {
        throw 'Metodo não implementado';
    };

    Nautilos.getPage = function (urlRoot = null) {

        var x, pgs = [], i = 0, ob = {};

        do {
            x = this.core.getCookie('nautilos_pags_' + i)
            if (x != null) {
                pgs.push(x);
                i++;
            }
        } while (x != null);


        ob.urlName = this.core.getCookie('nautilos_urlNams').split(',');
        console.log(url);

    };


    global.nautilos = Nautilos;

})(this);
/*
    nautilos CORE (nucleo)
 */
(function (global) {
    // variaveis
    var core = {
        index: '',
        id: '',
        urls: [],
        self: {},
        securyte: true,
        proxy: global.nautilos.proxy(),
        keysLinks: [],
        urlRoot: '',
        urlName: [],
        length: 0,
        i: 0,

        porcemtagem: 0,
        porcentagemItem: 0,
        squardItem: 0,
        squardItemporcemtagem: 0,

        form: {
            name: '',
            data: {}
        },

        response: {
            viewAtual : '',
            data: [] ,
            cache: {
                scripts: [] ,
                links: [] ,
                coockie: [] ,
                partialView : {} ,
            },
        },
    }

    core.__main__ = function (ob, __system__) {

        if (!typeof ob === "object") {
            return "Não eh um objeto";
        }

        this.__config__(ob);
        this.gerarLoad.setCss();
        this.gerarLoad.setHtml();

        //carregar liks
        if (Array.isArray(this.response.cache.links)) {
            this.loadLink();
        }

        //carregar scripts
        if (Array.isArray(this.response.cache.scripts)) {
            this.loadScript();
        }

        return this.load(this.urls, __system__);
    };

    core.__config__ = function (ob) {

        this.__configURL__(ob);
        if(ob['required'].hasOwnProperty('partialViews'))
            this.__configPartialVies__(ob);

        // this.urls = ob.hasOwnProperty('url') ? (Array.isArray(ob.url) ? ob.url : [ob.url]) : ['default'];
        this.id = ob.hasOwnProperty('id') ? ob.id : '#load-html';
        this.securyte = ob.hasOwnProperty('securyte') ? ob.securyte : true;
        this.index = ob.hasOwnProperty('index') ? ob.index : 'index';
        // this.keysLinks = ob.required.hasOwnProperty('links') ? (Array.isArray(ob.links) ? ob.required.links : ['index']) : ['index'];
        // this.urlName = ob.hasOwnProperty('urlName') ? (Array.isArray(ob.urlName) ? ob.urlName : ['index']) : ['index'];
        this.self = ob.hasOwnProperty('exec') ? (typeof ob.exec === "function" ? ob.exec : function () { }) : function () { };
        this.response.cache.scripts = ob['required'].hasOwnProperty('scripts') ? (Array.isArray(ob['required'].scripts) ? ob['required'].scripts : [ob.scriptsob['required'].scripts]) : false;
        this.response.cache.links = ob['required'].hasOwnProperty('links') ? (Array.isArray(ob['required'].links) ? ob['required'].links : [ob['required'].links]) : false;

        this.porcentagemItem = (100 / (this.response.cache.scripts.length + this.response.cache.links.length + this.urls.length));
        this.squardItem = (280 / (this.response.cache.scripts.length + this.response.cache.links.length + this.urls.length));
    };

    core.__configURL__ = function (ob) {

        this.urlRoot = ob.root != null ? ob.root : window.location.href;

        if (typeof ob.rout == "object") {
            var keys = Object.keys(ob.rout);
            for (var key of keys) {
                this.urlName.push(key);
                this.urls.push(ob.rout[key]);
            }
        }
    };

    core.__configPartialVies__ = function(ob) {
        var self = ob.required.partialViews ,
            views , item , id , partial = [];

        if(self == null)
            return;
        
        for(item of self){
            $(ob.id).load(item.view , function() {
                for(id of item.ids)
                {
                    partial[id] = { html : $('#' + id).html() } ;
                }
    
                nautilos.core.response.cache.partialView = partial;
            });
        }
    };

    core.gerarLoad = {

        i: 0,
        length: 280,
        sorte: [],

        setCss: function () {
            //   $('head').append("<style>.demo,.square{pointer-events:none}.load-nautilos{z-index:999999;position:absolute;background-Fcolor:#fff;left:0;right:0;bottom:0;top:0}.load-nautilos-body{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;max-width:740px;margin-top:200px;margin-left:auto}.load-nautilos-sub-body{text-align:center;padding-top:30px}.load-nautilos-nautilos-bar{height:2px;background-color:#000;width:0%;transition:width 2s ease}.loader{position:relative;padding-top:100px;width:40px;margin:auto}.loader .circle{position:absolute;width:38px;height:38px;opacity:0;transform:rotate(225deg);animation-iteration-count:infinite;animation-name:orbit;animation-duration:5.5s}.loader .circle:after{content:'';position:absolute;width:5px;height:5px;border-radius:5px;background:#000}.loader .circle:nth-child(2){animation-delay:240ms}.loader .circle:nth-child(3){animation-delay:480ms}.loader .circle:nth-child(4){animation-delay:720ms}.loader .circle:nth-child(5){animation-delay:960ms}@keyframes orbit{0%{transform:rotate(225deg);opacity:1;animation-timing-function:ease-out}7%{transform:rotate(345deg);animation-timing-function:linear}30%{transform:rotate(455deg);animation-timing-function:ease-in-out}39%{transform:rotate(690deg);animation-timing-function:linear}70%{transform:rotate(815deg);opacity:1;animation-timing-function:ease-out}75%{transform:rotate(945deg);animation-timing-function:ease-out}100%,76%{transform:rotate(945deg);opacity:0}}.demo{position:relative;width:50px;height:50px;background-color:#6495ed;margin:4px;display:inline-block}.shadow{position:absolute;opacity:.2}.grid{display:flex;flex-wrap:wrap}.square{position:relative;width:28px;height:28px;margin:1px;background-color:currentColor;font-size:14px}.small{width:18px;height:18px;background-color:#c8f5fd}.demo-content{position:relative;display:flex;flex-direction:column;justify-content:center;text-align:center;width:700px;height:100%}.el{background-color:#aee5ef}.black{background-color:#000}</style>");
        },

        setHtml: function () {
            var html = ' ', i = 0;
            html = '<div class=\'demo-content staggering-grid-demo\'>';
            html += '<div id=\'efect-el\' class=\'grid\'>'
            html += '</div>';
            html += '<div id=\'efect-shadow\' class=\'grid shadow\'>';
            html += '</div>';
            html += '</div>';

            $('#load-efect').html(html);

            for (; i < this.length; i++) {

                $('#efect-el').append('<div class="small square el num-el-' + i + '"></div>');

            }
            i = 0

            for (; i < this.length; i++) {

                $('#efect-shadow').append('<div class="small square"></div>');

            }

            anime({
                targets: '.staggering-grid-demo .el', // document.querySelector('.staggering-grid-demo , .el'),//' .el',
                scale: [
                    { value: .1, easing: 'easeOutSine', duration: 500 },
                    { value: 1, easing: 'easeInOutQuad', duration: 1200 }
                ],
                delay: anime.stagger(200, { grid: [35, 8], from: 'center' }),
                loop: true
            });

        },
        // gerar pontos x no efeito load
        pointX: function r(max) {
            var num = 0, aux = 0, y = 0, x = [];

            for (q = 0; q < max; q++) {

                num = parseInt((Math.random() * this.length).toFixed(0));

                if (num == this.length - 1)
                    num = 0;

                while (this.sorte.indexOf(num) > 0) {

                    if (num > this.length - 1)
                        num = 0;
                    else
                        num++;
                }
                if (num > this.length)
                    console.log(num);

                x.push(num);
                this.sorte.push(num);
            }
            return x;
        },
        // inserir ponto gerado
        setPoint: function (nums) {
            for (var num of nums) {
                setTimeout(' $(\'.num-el-\' + ' + num + ').css(\'background-color\', \'#44a6b7\')', 400 + (100 + num));
            }
        },

    };

    core.urlParametros = {
        parametros: {},

        GetQueryString: function (a) {
            a = a || window.location.search.substr(1).split('&').concat(window.location.hash.substr(1).split("&"));

            if (typeof a === "string")
                a = a.split("#").join("&").split("&");

            if (!a) return {};

            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=');

                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            this.parametros = b;
            return b;
        },
    },
        /**
         * carregar arquivo / pagina para a memoria
         */
        core.load = function (urls, system) {
            var i = 0,
                length = urls.length,
                self = this;

            this.i = 0;
            this.length = length;

            this.getLoad(urls, 0, system);

            return this.response.data;
        };
    /**
     *
     */
    core.getLoad = function (url, i, system) {
        var self = this;

        if (url[i] == null)
            return;

        system.server.url = url[i][0];
        system.server.ajax(system)
            .done(function (text) {
                self.addResponse(text);

                self.i++;
                self.getProgressoLoad()

                //if (self.length == self.i) {
                //    return self.start();
                //}

                self.getLoad(url, (i + 1), system);

            }).fail(function () {
                console.log('Erro load!');
            });
    };

    core.loadScript = function () {
        var i = 0,
            length = this.response.cache.scripts.length;

        for (; i < length; i++) {
            $('head').append(`<script src='${this.response.cache.scripts[i]}'></script>`)
            this.getProgressoLoad()
        }
    };

    core.loadLink = function () {
        var i = 0,
            length = this.response.cache.links.length
        aux = '';

        for (; i < length; i++) {
            aux = this.response.cache.links[i];

            if (aux.includes('less')) {
                $('head').append(`<link href='${aux}' rel='stylesheet/less' type='text/css'  />`);
            }
            else if (aux.includes('css')) {
                $('head').append(`<link href='${aux}' rel='stylesheet' type='text/css'  />`);
            }

            this.getProgressoLoad()
        }
    };

    core.getProgressoLoad = function () {

        this.porcemtagem = parseInt(this.porcemtagem) + parseInt(this.porcentagemItem.toFixed(0));
        if (this.porcemtagem > 90) {
            setTimeout("nautilos.core.__show__()", 4000);
        }
        setTimeout("$('.load-nautilos-nautilos-bar').css('width' ,'" + parseInt(this.porcemtagem) + "%')", 300);
        this.gerarLoad.setPoint(this.gerarLoad.pointX(this.squardItem));

    };

    core.__show__ = function () {
        $('.load-nautilos').hide();
        this.start();
    };
    /**
     *  Funcao de inicio de exibicao apos carregamento
     * 
     */
    core.start = function () {
        var reload = '', aux = '';

        $.cookie('nautilos_urlNams', this.urlName.toString(), { expires: 1 });
        this.setCoockie(this.response.data);

        this.urlParametros.GetQueryString();
        reload = this.urlParametros.parametros['reload'];
        // eh um reload de pag?
        if (reload != null) {
            aux = reload;
            //gerar parametro da view 
            if (reload.includes('/')) {
                reload = reload.split('/')[0];

                nautilos.cache.parametros[reload] = {};
                nautilos.cache.parametros[reload].id = aux.split('/')[1];

                global[('nt_' + reload)] =  aux.split('/')[1];;

            }
            this.response.viewAtual = reload;
            html = this.getData(this.getRoute(reload));
            if (html != null) {
                $(this.id).html(html);
                //window.history.pushState("object or string", "Title", this.core.urlRoot + attr);
            }
            else {
                $(this.id).html('Not found : 404');
            }
        } else {

            var nm = this.urlName.indexOf(this.index);
            if (nm < 0) {
                console.log('Erro index');
                return;
            }
            this.response.viewAtual = this.index;
            $(this.id).html(this.response.data[nm]);
        }

        window.history.pushState("object or string", "Title", nautilos.core.urlRoot.split('?')[0] + aux);


        this.cmd.call();
        return this.self();

    };

    core.addResponse = function (text) {
        this.response.data.push(text);
    };

    core.getRoute = function (link) {
        var key, i = this.urlName.indexOf(link);

        key = i > 0 ? this.urlName[i] : 'notFound';

        return i;
    };

    core.getData = function (key) {
        return this.response.data[key];
    };

    core.formData = function (element) {
        var name = '';

        name = element;

        if (!element.includes('#'))
            element = '#' + element;

        this.form.name = name;
        this.form.data[this.form.name] = null;
        this.form.data[this.form.name] = {}
        this.form.data[this.form.name].valid = __getValid();

        this.childNodes($(element)[0]);
    };

    core.setFormData = function (dataName) {
        var nmForm = '', dataForm, name, key, keys;

        nmForm = dataName;

        if (!dataName.includes('#'))
            dataName = '#' + dataName;

        dataForm = this.form.data[nmForm];
        keys = Object.keys(dataForm);

        for (key of keys) {
            $(dataName + ' [name=' + key + ']').val(dataForm[key]);
        }
    };

    core.childNodes = function childNodes(element) {
        var x = 0, e, length = 0;

        if (typeof element !== "object")
            return;

        length = element.length;
        if (length > 0) {
            for (; x < length; x++)
                this.childNodes(element[x]);
        }

        if (element.childNodes != null && element.childNodes.length > 0) {
            for (e of element.childNodes)
                this.childNodes(e);
        }
        if (element.nodeName == "INPUT" || element.nodeName == "SELECT") {

            this.validInputs(element);

            this.form.data[this.form.name][element.name] = element.value;
        }
    };

    core.validInputs = function (element) {
        var required = element.attributes['required'], i = 0;

        if (required == null || element.value != null && element.value != '') {
            $(element).css('border-color', '#dbdbdb');
            return null;
        }

        $(element).css('border-color', 'red');
        this.form.data[this.form.name].valid._isValid = false;

        if (this.form.data[this.form.name].valid._notificacoes.indexOf(element.name) < 0) {
            this.form.data[this.form.name].valid._notificacoes.push(element.name);

        }
        else {
            var i = this.form.data[this.form.name].valid._notificacoes.indexOf(element.name);
            this.form.data[this.form.name].valid._notificacoes[i] = element.name;
        }
    };

    core.lastResponse = function () {
        var value = '', key = this.response.data.length - 1;
        value = this.response.data[key];

        return value;
    };

    core.setCoockie = function (cvalue, cname = 'nautilos_pags', exdays = 1) {
        var d = new Date(), cookie = '', i = 0;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        var expires = "expires=" + d.toGMTString();

        for (var c of cvalue) {
            $.cookie(cname + "_" + i, c, { expires: 1 });
            i++;
        }
    };

    core.getCookie = function (cname) {
        return $.cookie(cname);
    };

    core.checkCookie = function () {
        throw "método não implementado: checkCookie";
    };

    /**                                                             * /            
     * ============================================================ * / 
     *                            SYSTEM                            * /
     * ============================================================ */
    var __system__ = {};

    __system__.server = {

        Config: new Object(),
        url: "",
        token: "",
        data: new Object(),
        method: "GET",
        type: "html",
        self: this,

        ajax: function (server = this) {

            var self = server;

            return $.ajax({

                url: self.server.url,
                method: self.server.method,
                data: { data: self.server.data },
                dataType: "html"

            });

        },
    }

    __system__.authorization = function (args = null){
        var viewAtual = nautilos.core.response.viewAtual 
            , data , i;

            if(!nautilos.core.securyte)
                return;

            i = nautilos.core.urlName.indexOf(viewAtual);
            data = nautilos.core.urls[i];

            if(data.length <= 1)
            {
                $(nautilos.core.id).html('erro 403 :: sem permissão');
                throw 'erro 403 :: sem permissão';
            }

            if(data.length >= 1)
            {
                if(data[1] == "anonymous")
                {
                    return;
                }
            }
    };

    global.nautilos.core = core;
    global.nautilos.system = __system__;

})(this);
(function (global) {

    var htmlAddHead = "<div id='nautilos_add' class='card p-4'><section class='row'><section class='col-sm-1'><label>Nº</label></section><section class='col'><lable>Texto</lable></section><section class='col'><label>Editar</label></section></section><div id='add-body-elements' class=''></div></div>"

    function getAddElementFormat(id, value, name) {
        var aux = '';

        aux = "<section class='row' style='padding: 5px 0px 5px 0px'>";
        aux += "<section class='col-sm-1'>";
        aux += "<label>" + (id + 1) + "</label>"
        aux += "</section>";
        aux += "<section id='element_add_num_" + id + "' class='col'>";
        aux += "<p class='h6'>" + value + "</p>";
        aux += "</section>";
        aux += "<section class='col'>";
        //aux += "<label>";
        aux += "<button class='btn btn-primary' onclick='nautilos.core.cmd.add_edite(this)' data-id='" + id + "' data-name='" + name + "' >editar</button>";
        aux += "  |  ";
        aux += "";
        aux += "<button class='btn btn-primary' onclick='nautilos.core.cmd.add_delete(this)' data-id='" + id + "' data-name='" + name + "' >excluir</button>";
        aux += "  |  ";
        aux += "<button id='element_add_salve_num" + id + "' class='btn btn-primary' onclick='nautilos.core.cmd.add_edite_salve(this)' data-id='" + id + "' data-name='" + name + "' >salvar</button>";
        //aux += "</label>";
        aux += "</section>";
        aux += "</section>";

        return aux;
    }

    var cmd = {
        cmdDefaultName: 'data-',
        __init__: false,
        __CMDS__: [
            'if',
            'for',
            'add_cache',
            'print',
            'partial',
        ],
    }

    cmd.__INIT__ = {
        if: () => { },
        for: () => { },
        add_cache: () => { },
        print: () => { },
        partial : () => {} ,
    }

    cmd.__setInit__ = function () {
        if (this.__init__)
            return;

        this.__INIT__.if = (args = null, element = null) => {

            var bool = false;

            if (args == null || element == null)
                return;

            bool = eval(args);  

            if(typeof bool == 'string')
                bool = bool.toLowerCase() == 'true' ? true : false;

            if (bool === false)
                $(element).hide();

        };

        this.__INIT__.for = (args = null, element = null) => {

            var x, bool, parametros, add, html = '', auxHtml, keys, key;

            if (args == null || element == null)
                return;

            parametros = args.split(';');
            auxHtml = $(element).html();

            // ** padrao "x = 0 ; x < lenght ; x++"
            if (parametros.length >= 3) {
                x = 0 //eval(parametros[0])
                bool = parametros[1];
                add = parametros[2];
                html = '';

                while (eval(bool)) {
                    //html += auxHtml;
                    html += this.__getPropAUX(auxHtml, { x: eval('(' + add + ')') });
                }
                $(element).html(html);

                return;
            }

            html = '';
            auxHtml = '';

            // ** padrao "x of element"
            parametros = args.split('of');

            x = parametros[0];
            keys = eval(parametros[1]);

            if (x.includes('var '))
                x = x.replace('var ', '');

            x = x.trim()
            auxHtml = $(element)[0].outerText;

            for (key of keys) {

                html += "<li>" + this.__getPropAUX(auxHtml, key) + "</li>";;
            }

            $(element).html(html);
        };

        this.__INIT__.add_cache = (args = null, element = null) => {
            var values, attr, idBody, name, value;

            attr = element.attributes;
            idBody = attr['data-add-body'];
            name = attr['data-add-name'].nodeValue;

            if (!idBody.nodeValue.includes('#'))
                idBody = '#' + idBody.nodeValue;

            if (this.cache.addObjects[name] == null)
                return;

            values = this.cache.addObjects[name].val;

            $(idBody).html(htmlAddHead);

            for (value of values) {
                $('#add-body-elements').append(getAddElementFormat(value.id, value.value, name));
                $('#element_add_salve_num' + value.id).attr('disabled', 'true');
            }

        };

        this.__INIT__.print = (args = null, element = null) => {

            var value, attr, value, keys, aux;

            attr = element.attributes;
            value = attr['data-print'].nodeValue;
            try{
            if (value.includes('{{') && value.includes('}}')) {
                keys = this.templetText(value);
                aux = eval(keys);

                text = value.replace('{{' + keys + '}}', aux);
            }
            else
                text = eval(value);
            }
            catch {
                text = value;
            }

            $(element).html(text);
        };

        this.__INIT__.partial = (args = null, element = null) => {
            var id , attr , name , html , views;

            attr = element.attributes;
            name = attr['name'].nodeValue;
            html = document.createElement('div');


            view = nautilos.core.response.cache.partialView[name];

            if(view == null)
                return;


            $(element).html(view.html);    
        },

        this.__init__ = true;
    };
    /**
     * Todas as funcoes relacionadas ao autoload da pagina
     */
    cmd.call = function () {

        nautilos.system.authorization();

        var elements = $('.NL-LOAD'), e, atributos = [], aux = [], attr = [] , views;

        views = $('partial');
        this.__setInit__();

        if (elements == null && views == null)
            return;

        elements.push(views);

        for (e of elements) {

            attr = $(e)[0].attributes;
            for (aux of attr) {
                if (this.__CMDS__.indexOf(aux.name.toLowerCase().replace('data-', '')) > -1 )
                    atributos.push(aux);
            }

            for (attr of atributos) {
                this.getCMD(e, attr);
            }

            if (this.__CMDS__.indexOf( e[0].nodeName.toLowerCase() ) > -1 ) {
                exec = this.__INIT__[ e[0].nodeName.toLowerCase() ];
                exec( null , e[0]);
            }

            atributos = [];
        }

        nautilos.tag.__callTag__();
    };

    cmd.getCMD = function getCMD(element, attr) {
        var atr, val;

        atr = attr.name.toLowerCase().replace('data-', '')
        val = attr.value;

        exec = this.__INIT__[atr];
        exec(val, element);
    };

    cmd.cache = {
        addObjects: {},
        addObjectsLimite: 0,
    };

    cmd.add = function (id) {
        var element = '', attr, idBody, object = {}, value, name, length, add = {
            id: 0,
            value: '',
        };

        if (!id.includes('#'))
            id = '#' + id;

        element = $(id)[0];
        attr = element.attributes;
        idBody = attr['data-add-body'];

        if (!idBody.nodeValue.includes('#'))
            idBody = '#' + idBody.nodeValue;

        name = attr['data-add-name'].nodeValue;
        value = element.value;

        if (this.cache.addObjects[name] == undefined) {
            this.cache.addObjects[name] = { val: [], html: '', id: idBody };
            $(idBody).html(htmlAddHead);

            this.cache.addObjects[name].html = element.outerHTML;
        }

        $(idBody).show();

        this.cache.addObjectsLimite = attr['data-add-limite'] != undefined ? attr['data-add-limite'].nodeValue : 50;
        length = this.cache.addObjectsLimite;

        if (this.cache.addObjects[name].val.length >= length) {
            alert('Limite atigindo: ' + length);
            return;
        }

        add.id = this.cache.addObjects[name].val.length;
        add.value = value;

        $('#add-body-elements').append(getAddElementFormat(add.id, add.value, name));
        this.cache.addObjects[name].val.push(add);
        $('#element_add_salve_num' + add.id).attr('disabled', 'true');
    };

    cmd.add_edite = function (element) {
        var attr, idName = 'element_add_num_', idEdit = 'element_add_edit_num', id, html, name;

        attr = element.attributes;
        id = attr['data-id'].nodeValue;
        name = attr['data-name'].nodeValue;
        idName = '#' + idName + id;
        html = this.cache.addObjects[name].html;

        while (html.includes("\""))
            html = html.replace('"', '\'');

        var i = html.indexOf('id=')

        var left = html.substring(0, i);
        var right = html.substring(i + 4, html.length);
        right = right.substring(right.indexOf("'") + 1, right.length);

        idEdit = idEdit + id;
        html = left + 'id=\'' + idEdit + '\'' + right;

        $(idName).html(html);
        $('#' + idEdit).val(this.cache.addObjects[name].val[id].value);
        $('#element_add_salve_num' + id).removeAttr('disabled');
    };

    cmd.add_edite_salve = function (element) {
        var attr, idName = 'element_add_num_', idEdit = 'element_add_edit_num', id, html, name, value;

        attr = element.attributes;
        id = attr['data-id'].nodeValue;
        name = attr['data-name'].nodeValue;
        idName = '#' + idName + id;
        value = $('#' + idEdit + id).val();

        html = "<p>" + value + "</p>"

        $(idName).html(html);

        this.cache.addObjects[name].val[id].value = value;
        $('#element_add_salve_num' + id).attr('disabled', 'true');
    };

    cmd.add_delete = function (element) {
        var attr, idName = 'element_add_num_', idEdit = 'element_add_edit_num', id, values, name, value, i = 0, length;

        attr = element.attributes;
        id = attr['data-id'].nodeValue;
        name = attr['data-name'].nodeValue;
        idName = '#' + idName + id;
        length = this.cache.addObjects[name].val.length;

        i = id;

        if (id == (length - 1)) {
            this.cache.addObjects[name].val.pop();
        }
        else {
            for (; i < length; i++) {
                var aux = this.cache.addObjects[name].val[parseInt(i) + 1];
                if (aux != undefined) {
                    aux.id = (aux.id - 1);
                    this.cache.addObjects[name].val[i] = aux;
                }
            }
            this.cache.addObjects[name].val.pop();
        }
        values = this.cache.addObjects[name].val;

        $('#add-body-elements').html(' ');

        for (value of values) {
            $('#add-body-elements').append(getAddElementFormat(value.id, value.value, name));
            $('#element_add_salve_num' + value.id).attr('disabled', 'true');
        }

        if (this.cache.addObjects[name].val.length == 0) {
            $(this.cache.addObjects[name].id).hide();
            return;
        }
    };

    cmd.templetText = function templetText(text, args = [], flag = false) {

        if (!(text.includes('{{') && text.includes('}}')))
            return text;

        var prop = '';
        var x = text.indexOf('{{');
        var y = text.indexOf('}}');
        var f = text.substring(x + 2, y);
        var fuc = '';

        if (f.includes('.')) {
            var k = f.indexOf('.');
            prop = f.substring(k + 1, f.length);
        }
        else if (f.includes('(') && f.includes(')')) {
            prop = f.split('(')[0];
            fun = f.split('(')[1];
            fun = fun.split(')')[0];
        }
        else {
            prop = f;
        }

        var aux = text.split('}}');
        if (aux.length > 2) {
            var r = text.indexOf('{{' + prop + '}}');
            var t = text.substring((r + 4 + prop.length), text.length);

            args.push(prop);
            args = this.templetText(t, args, (aux.length == 3 ? true : false));
        }

        if (flag) {
            args.push(prop)
        }

        return args.length == 0 ? prop : args;
    };

    cmd.__getPropAUX = function __getPropAUX(text, object = null) {

        var prop = '', left = '', right = '', prop = '';

        if (text.includes('{{') && text.includes('}}')) {
            var x = text.indexOf('{{');
            var y = text.indexOf('}}');
            var f = text.substring(x + 2, y);
            var fuc = '';

            if (f.includes('.')) {
                var k = f.indexOf('.');
                prop = f.substring(k + 1, f.length);
            }
            else if (f.includes('(') && f.includes(')')) {
                prop = f.split('(')[0];
                fun = f.split('(')[1];
                fun = fun.split(')')[0];
            }
            else {
                prop = f;
            }

            left = text.substring(0, x);
            right = text.substring(y + 2, text.length);
        }
        else {
            return text;
        }

        if (eval('typeof ' + prop + ' == \'function\'')) {
            prop += '(' + object.x + ')';
            text = left + eval(prop) + right;
        }
        else if (typeof object == 'object' && prop != '') {
            text = left + object[prop] + right;
        }
        else
            text = left + object + right;

        if (text.includes('{{') && text.includes('}}'))
            text = this.__getPropAUX(text, object);

        return text;
    };

    global.nautilos.core.cmd = cmd;

})(this);
(function(global){


    var tag = {};

    const tags = [ "wizzard" ];

    var newElement = (tag) => {
        var element = `<${tag}>`;
        return $(element);
    }

    var wizzardHtml = ( config ) =>{
        var w , ebody , eheader , base , center , div;

        w       = newElement('div')[0];
        eheader = newElement('div')[0];
        ebody   = newElement('div').attr('id' ,'wizzard-elementes').addClass('p-2')[0];
        base    = newElement('div')[0];
        center  = newElement('div').attr('id' ,'wizzard-links-elementes').addClass('row')[0];

        for(var b of config){

            b.id = b.id.includes('#') ? b.id : '#' + b.id; 

            var section = newElement('section')
                .addClass('col p-2 btn-element wizzard-menu')
                .attr('id' , b.id.replace('#' ,'') + '-link')
                .attr('data-toggle' , 'collapse')
                .attr('data-target' , b.id)
                .attr('aria-expanded' , 'false')
                .attr('onclick' , '$(\'#wizzard-elementes div\').collapse(\'hide\') , $(\'' + b.id + '\').collapse(\'show\') , $(\'#wizzard-links-elementes section\').removeClass(\'wizzard-menu-link-ative\') ,  $(\'#'+ b.id.replace('#' ,'') + '-link' + '\').addClass(\'wizzard-menu-link-ative\')')
                .attr('aria-controls' , b.id.replace('#' , ''))[0];

            section.textContent = b.text;
            center.appendChild(section);

            base.appendChild(center);

            div = newElement('div')[0];

            $(div).addClass('collapse')
                    .attr('id' , b.id.replace('#' , '') );

            div.appendChild( 
                newElement('div')
                    .html( b.html )[0]
             );

            ebody.appendChild(div);
        };

        eheader.appendChild(base);

        $(w).addClass('card card-body p-4 m-2');

        w.appendChild(eheader);
        w.appendChild(ebody);
        return w;
    }


    tag.__elementeTags__ = {
        
        wizzard: (args = null) => {
            var html , elementes , array = [], e;

            elementes = args.childNodes;

            for(e of elementes){
                if(e.nodeName == "WIZZARD-ELEMENT"){
                    var item = {};

                    item.id = e.attributes['id'].nodeValue;
                    item.text = e.attributes['name'].nodeValue;
                    item.html = e.innerHTML;

                    array.push(item)
                }
            }

            html = wizzardHtml(array);
            $(args).html( html )
        },

    };

    tag.__callTag__ = function () {
        var item , keys , elements;
        
        for(item of tags)
        {
            elements = $(item);

            if(elements.length > 0)
            {
                this.__exec__(elements , item);
            }
        }
    }

    tag.__exec__ = function (elements , tag) {
        var e ;

        for(e of elements)
        {
            this.__elementeTags__[tag](e);
        }
    }


    global.nautilos.tag = tag;
})(this);

Object.freeze(nautilos.about);

var ov = {
    name: 'paulo',
    sobrenome: 'henrique'
}

var oc = {
    name: 'lucas',
    sobrenome: 'souza'
}

var teste = [ov, oc];


function multi(e) {
    return (e * e);
}