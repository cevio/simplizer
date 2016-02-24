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
