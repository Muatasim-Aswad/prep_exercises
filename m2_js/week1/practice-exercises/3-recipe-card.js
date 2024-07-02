/**
 * Ever wondered how to make a certain meal? Let's create a recipe list with JavaScript!
 *
 *   Declare a variable that holds an empty object literal (your meal recipe).
 *   Give the object 3 properties: a title (string), a servings (number) and an ingredients (array of strings) property.
 *   Log each property out separately, using a loop (for, while or do/while)
 *
 * Expected result:
 *
 *   Meal name: Omelette
 *   Serves: 2
 *   Ingredients: 4 eggs, 2 strips of bacon, 1 tsp salt/pepper
 */
const mealRecipe = {
  mealName: 'Omelette',
  serves: 2,
  ingredients: ['4 eggs', ' 2 strips of bacon', ' 1 tsp salt/pepper'],
};

for (let property in mealRecipe) {
  const value = mealRecipe[property];

  const propertyName =
    property === 'mealName'
      ? 'Meal Name: '
      : property === 'serves'
      ? 'Serves: '
      : 'Ingredients: ';

  console.log(propertyName + value);
}
