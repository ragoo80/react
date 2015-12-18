var leftMenuSet = (function() {
    var _initSet = function(){
        $('.left-navi li').bind({
            'click': leftClick
        });
    }  

    function leftClick(e){
    	var _select = $(e.currentTarget).hasClass('select');
        if ( !_select ){
            if ( $(e.currentTarget).find('.sub-list').length > 0){
                e.preventDefault();
                $(e.currentTarget).find('.glyphicon').toggleClass('glyphicon-menu-down glyphicon-menu-up')
                $(e.currentTarget).find('.sub-list').toggle();
            } else {
                var linkStr = $(e.currentTarget).find('a').attr('href');
                window.open(linkStr, '_self');
            }
        } else {
            e.preventDefault();
        }
    }

    return {
        'initSet' : _initSet
    }

})();

var layerPopUp = {
    THIS: "",
    pop : "",
    init : function($pop){
        THIS = this;
        THIS.pop = $pop;
        THIS.bindEvent();
    },
    open : function(){
        $('.pop-bg').show();
        THIS.pop.show();
        $('body').addClass('pop');
    },
    close : function() {
        THIS.pop.hide();
        $('.pop-bg').hide();
        $('body').toggleClass('pop');
    },
    bindEvent : function() {
        THIS.pop.find('.close').click( function(e) {
            e.preventDefault();
            THIS.close();
        } );
    }
};

(function() {
	leftMenuSet.initSet();
    if ( $('.layer-pop').length > 0 ){
        layerPopUp.init($('.layer-pop'));
    };
})();







