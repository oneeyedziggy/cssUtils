(()=>{
  const cssDefinedClasses = Array.from(new Set(Array.from(
    document.querySelectorAll("link, style")
  ).reduce( (acc,link) => {
    if (link?.sheet) {
      try {
        for (let rule of link.sheet.rules) {
          acc = acc.concat( rule.cssText
                .split(/(, |\ )/gi)
                .filter( (item) => item.startsWith('.') )
                .map( myClass => myClass.replace(/^\./, ''))
          );                        
        };
      } catch (err) {
        console.warn( err )
      }
    } 
    return acc;
  }, [])));
  
  const allElements = document.querySelectorAll('*'); // Get all elements
  const htmlUsedClasses = Array.from(new Set(Array
      .from(allElements)
      .reduce((acc, element) => {
        const classes = element?.getAttribute?.('class');
        return acc.concat((classes?.split?.(' ')||[]));
      },[])
      .filter((class1)=>!!class1)));        
  
  const diffs = {
    unusedDefinedClasses: cssDefinedClasses.filter(myClass=>!htmlUsedClasses.includes(myClass)),
    undefinedUsedClasses: htmlUsedClasses.filter(myClass=>!cssDefinedClasses.includes(myClass)),
  }
  console.log({cssDefinedClasses, htmlUsedClasses});
  console.log(diffs);
})();
