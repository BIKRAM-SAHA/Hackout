const helper = require('./helper') 
const axios = require('axios')
const app_key = '18ff3ca95a60a8bd7da2f1304b9ddaa4'
const app_id = 'b1109eec'
// const http = require('http');
const qs = require('qs')
const diet = async (req, res) => {
  try {
    // Make GET request to Edamam API
    let trim = helper.handler.trimester(req.body.weekNo)
    const bmi = helper.handler.bmi(req.body.weight,req.body.height)
    const nutrient = helper.details.nutri[trim]
    const normCal =helper.handler.usualCal(req.body.weight)
    const meal = helper.handler.meal(req.body.mealType[0],nutrient)
    calorieIntake = helper.handler.calorieIntake(bmi.bmi_val,bmi.category,normCal,req.body.weekNo,req.body.mealType)
  
    const url = 'https://api.edamam.com/api/recipes/v2'
    const endpoint = '/api/recipes/v2'
    const params = {
      type:"public",
      app_id: app_id,
      app_key: app_key,
      diet:req.body.diet || [],
      ingr:req.body.ingr || " ",
      health:req.body.health || [],
      cuisineType : req.body.cuisineType || null,
      mealType : req.body.mealType, //send only one attribute from the ui
      dishType: req.body.dishType || [],
      calories: calorieIntake + "+",
      imageSize : ['REGULAR'],
      glycemicIndex : req.body.glycemicIndex || " ",
      excluded : req.body.excluded || "",
      'nutrients[CA]': meal.calcium +"+",
      'nutrients[PROCNT]' : meal.protein +"+",
      'nutrients[FE]': meal.iron +"+",
      'nutrients[VITB6A]': meal.b6 +"+", 
      'nutrients[FOLFD]': meal.folate +"+",
      'nutrients[VITD]': meal.vitamind +"+",
      'nutrients[FAPU]': meal.polyunsaturated +"+",
      field: req.body.field || []
    }
    // axios(qs.stringify(params))
    const headers= {
          'Content-Type': ['application/json'],
          'Edamam-Account-User': 'GargeeBhowmick',
          'Accept-Language' : ['en']
          }

    const Base_url = url+'?'+qs.stringify(params)
    const response = axios
    .get(Base_url, {
      headers
    })
    // Process the response and send it back to the client
    console.log(response.data)
    await res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.log(error,"FROM API")
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports=diet