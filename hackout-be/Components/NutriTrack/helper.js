details = {
    rcw : {
    Category1 : {
      pll : 25, //lower bound in pounds
      pul : 40, //upper boud in pounds
      bmil : 0,
      bmiu : 18.5,
      trim : 360
    },

    Category2 : {
      pll : 28, //lower bound in pounds
      pul : 35, //upper boud in pounds
      bmil : 18.6,
      bmiu : 24.9,  
      trim : 360 - (48.75)               
    },
    
    Category3: {
      pll : 15, //lower bound in pounds
      pul : 25, //upper boud in pounds
      bmil : 25,
      bmiu : 29.9,
      trim : 360 - (48.75*2)
    },

    Category4 : {
      pll : 11, //lower bound in pounds
      pul : 20, //upper boud in pounds
      bmil : 30.0,
      trim1 : 165
    }
  },
nutri : {
trim1 : {
iron : 46,
calcium : 1350,
protein : 30,
vitamind: 600,
folate:800,
polyunsaturated: 650,
b6: 54
},
trim23 : {
iron : 71,
calcium : 1350,
protein : 30,
vitamind: 600,
folate:800,
polyunsaturated: 650,
b6: 54
} 
}
}

const handler = {
        //recommended weight gain during entire pregnancy rwg

    bmi: (weight,height)=>{
      // 703 * (weight in pounds / height^2 in inches)
      let a = 703 * (weight/(height*height))
      let b
      if(a<=18.5) b = 'Category1'
      if(a>18.5 && a<=24.9) b = 'Category2'
      if(a>24.9 && a<=29.9) b = 'Category3'
      else b = 'Category4'
      const bmi = {
          bmi_val : a,
          category : b
     }
      return a;
    },

    usualCal: (weightP)=>{ // requires weight in pounds
      return weightP*15; //returns the calorie intake to maintain the present weight
    },

    trimester : (weekNo)=>{
    let tri = weekNo/3
    if(tri<=3) return 'trim1'
    else return 'trim23'
    },

    calorieIntake : (bmi,bmiCategory,normCal,weekNo,meal)=>{
      let tri = weekNo/3
    //   let intake = gestation(bmiCategory,bmi)
    let intake
      if(tri<4)
      {
        intake = normCal+100;
      }
      else {
        let a = (weekNo - 4) * 15
        console.log(details.rcw[bmiCategory])
        intake =  normCal + a + details.rcw[bmiCategory].trim
      }
      if(meal === "breakfast"){
        intake = intake * (7/31)
      }
      else 
      intake =intake * (12/31)
      return intake
  },

  gestationIntake : (category,bmi) =>{
        let r = details.rcw[category]
        const ratio = (r.pul - r.pll) / (r.bmiu - r.bmil)
        const weight = ((bmi - r.bmil) * ratio) +  r.pll
        return weight
  },

  meal : (meal,trim)=>{
    let require = {}
    for (const key in trim) {
        if (trim.hasOwnProperty(key)) {
            require[key] = trim[key] /3;
        }
    }
    return require
  }
}

module.exports = {details,handler}