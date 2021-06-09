const a = [10, 12, 2, 6, 2, 4, 3, 10, 13, 15, 12, 6, 4];
 
function repalceDuplicate(a){
  newArray = [];
  for(i=0; i<a.length;i++){
    if(newArray.includes(a[i])){
      a[i]=0;
    }else{
      newArray.push(a[i]);
    }
  }
  return a;
}
const b = repalceDuplicate(a);
console.log(b);