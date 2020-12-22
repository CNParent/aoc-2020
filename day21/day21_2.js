scripts.day21_2 = async () => {
    let data = (await getFile('day21/input.txt')).split('\r\n');
    let recipes = data.map(x => x.split(' (contains '))
        .filter(x => x.length > 0)
        .map(x => {
            return {
                ingredients: x[0].split(' '),
                allergens: x[1].replace(')', '').split(', ')
            };
        });

    let allergens = [...new Set(recipes.reduce((a,b) => a.concat(b.allergens), []))].map(x => { return { value: x, is: '', couldBe: [] } });
    allergens.forEach(allergen => {
        let foundIn = recipes.filter(recipe => recipe.allergens.includes(allergen.value));
        let ingredients = new Set(foundIn.reduce((a,b) => a.concat(b.ingredients), []));
        allergen.couldBe = [...ingredients].filter(ingredient => foundIn.every(recipe => recipe.ingredients.includes(ingredient)))
    });

    let ingredients = recipes.reduce((a,b) => a.concat(b.ingredients), []);
    let potentialAllergens = [...new Set(allergens.reduce((a,b) => a.concat(b.couldBe), []))];
    let notAllergens = ingredients.filter(x => !potentialAllergens.includes(x));
    
    while (true) {
        let next = allergens.find(x => x.couldBe.length == 1 && !x.is);
        if (!next) break;

        next.is = next.couldBe[0];
        allergens.forEach(x => x.couldBe = x.couldBe.filter(i => i != next.is));
    };

    allergens.sort((a,b) => a.value.localeCompare(b.value));
    terminal.textContent = `Canonical dangerous ingredient list: ${allergens.map(x => x.is)}`;
}