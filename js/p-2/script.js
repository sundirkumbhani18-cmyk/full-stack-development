let a = 23, b = 20, c = 12, d = 21, e = 17;
if (a > b) {
    if (a > c) {
        if (a > d) {
            if (a > e) {
                console.log("a is big");
            } else {
                console.log("e is big");
            }
        } else {

        }
    } else {
          if(c>d){
             if(c>e){
                console.log("c is big");
             }else{
                console.log("e is big");
             }
          }else{
             if(d>e){
                 console.log("d is big");
             }else{
                 console.log("e is big");
                 
             }
          }
    }

} else {

}