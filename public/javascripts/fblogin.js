//javascript for facebook login and ajax call

function addStatusLink(message)
{
    $('#status').empty().append(
        $('<a>').attr('href','#')
            .click(function(){FB.login(callbackLoginStatus);})
            .text(message)
        );
}

function callbackLoginStatus(response)
{
    if (response.status === 'connected') {
        console.log('Logged in.');
        //now do the ajax call to server with token
        $('#status').text('Loading...').load('/fbpic/'+response.authResponse.accessToken,null,function(data,status,jqXHR){});
    }
    else if (response.status === 'not_authorized')
    {
        console.log('Not authorized.');
        addStatusLink("You must authorize this app to use your Facebook information.");
    }
    else
    {
        console.log('Not logged in.');
        addStatusLink("Facebook login required.");
    }
}

function onClickLogout(e)
{
    FB.logout(callbackLoginStatus);
    e.stopPropagation();
    e.preventDefault();
}

window.fbAsyncInit = function() {
        FB.init({
          appId      : '1476170459301891',
          xfbml      : true,
          version    : 'v2.0'
        });
        
        FB.getLoginStatus(callbackLoginStatus);
        $('p#status').on('click','a#logout',onClickLogout);
    };

(function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));