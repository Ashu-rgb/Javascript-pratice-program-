const a = [
    {name: 'first_name', alais: 'First Name', type: 'string'},
    {name: 'age', alais: 'Age', type: 'number'}
  ];
  const b = [
    {first_name: 'John', age: 23},
    {first_name: 'Tom', age: 25}
  ];
  {
    for(i=0;i<b.length;i++)
    const c = a.map({First_Name: b[i]['first_name'], Age: b[i]['age']});
    console.log(c)
  }
