var arr = [
    {'id':1 ,'parentid' : null},
    {'id':2 ,'parentid' : 1},
    {'id':3 ,'parentid' : 1},
    {'id':4 ,'parentid' : 2},
    {'id':5 ,'parentid' : 2},
    {'id':6 ,'parentid' : 2},
    {'id':7 ,'parentid' : 5},
    {'id':8 ,'parentid' : 5},
    {'id':9 ,'parentid' : 5},
    {'id':10 ,'parentid' : 5},
];

unflatten = function( array, parent, tree ){
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };
        
    var children = _Filter( array, function(child){ return child.parentid == parent.id; });
    
    if( !_.isEmpty( children )  ){
        if( parent.id == 0 ){
           tree = children;   
        }else{
           parent['children'] = children
        }
        _.each( children, function( child ){ unflatten( array, child ) } );                    
    }
    
    return tree;
}

tree = unflatten( arr );
document.body.innerHTML = "<pre>" + (JSON.stringify(tree, null, " "))