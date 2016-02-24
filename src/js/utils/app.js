exports.getTemplate = getTemplate;
function getTemplate(value){
    var html = '';
    if ( typeof value != 'string' ){
        html = value.innerHTML || '';
    }else{
        try{
            var node = this.$query(document, value);
            html = node.innerHTML;
            this.removeChild(node);
        }catch(e){
            html = value;
        }
    }
    return html;
}

exports.sessionName = 'simplize-history-name';
exports.sessionValueName = null;

exports.setURI = function(uri, href){
    var index = uri.indexOf(href);
    if ( index == -1 ){
        uri.push(href);
        window.sessionStorage.setItem(this.sessionValueName, JSON.stringify(uri));
    }
}
