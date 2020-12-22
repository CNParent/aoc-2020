scripts.day21_1 = async () => {
    let data = (await getFile('day21/input.txt')).split('\r\n');
    let recipes = data.map(x => x.split(' (contains '))
        .filter(x => x.length > 0)
        .map(x => {
            return {
                ingredients: x[0].split(' '),
                allergens: x[1].replace(')', '').split(', ')
            };
        });

    let allergens = [...new Set(recipes.reduce((a,b) => a.concat(b.allergens), []))].map(x => { return { value: x, couldBe: [] } });
    allergens.forEach(allergen => {
        let foundIn = recipes.filter(recipe => recipe.allergens.includes(allergen.value));
        let ingredients = new Set(foundIn.reduce((a,b) => a.concat(b.ingredients), []));
        allergen.couldBe = [...ingredients].filter(ingredient => foundIn.every(recipe => recipe.ingredients.includes(ingredient)))
    });

    let ingredients = recipes.reduce((a,b) => a.concat(b.ingredients), []);
    let potentialAllergens = [...new Set(allergens.reduce((a,b) => a.concat(b.couldBe), []))];
    let notAllergens = ingredients.filter(x => !potentialAllergens.includes(x));
    terminal.textContent = `Number of ingredients that are not allergens: ${notAllergens.length}`;
}