

function RecuperarTokien(){
    return nautilos.cache.values.user.tokien;
}

function NovoTokien(tokien){
    if(tokien == null)
        return nautilos.cache.values.user.tokien = "";
    
    return nautilos.cache.values.user.tokien = tokien;
}


function efetuarLogin() {
    var obj, url;

    obj = nautilos.core.formData('fLogin' , true);
    url = nautilos.core.urlApiRoot + "Autentificacao/Login"

    console.log(obj);
    nautilos.ajax(url, obj)
        .done(function(data){
            console.log(data);

            if(data != null){

                nautilos.cache.values.user = data;
                
                nautilos.cache.values.user.acesso = true ;

                nautilos.rout('Home');

                return;
            }
        })
        .fail(function(data){
            console.log(data);
            alert("Não foi possível efetuar login!");
    });
}


function novoUsuario() {
    var obj, url;

    obj = nautilos.core.formData('fNovoUsuario' , true);
    url = nautilos.core.urlApiRoot + "User/Novo"

    console.log(obj);

    nautilos.ajax(url, obj ) 
        .done(function(data){
            console.log(data);

            if(data.salve){

                alert("Usuario cadastrado com sucesso!");


                nautilos.cache.values.user.acesso = true ;
                nautilos.cache.values.user.tokien = data.tokien;

                nautilos.rout('Home');

                return;
            }

        })
        .fail(function(data){
        console.log(data);

        alert("Não foi possível salvar o usuário");
    });
    
}

function novoLivro() {
    var obj, url;
    url = nautilos.core.urlApiRoot + "Livro/Adicionar"

    obj = nautilos.core.formData('fNewLivro' , true);
    obj.tokien = RecuperarTokien();

    console.log(obj);

    nautilos.ajax(url, obj)
    .done(function(data){
        console.log(data);

        NovoTokien(data.tokien);
    })
    .fail(function(data){
        console.log(data);
    });
}