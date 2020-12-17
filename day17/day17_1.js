scripts.day17_1 = async () => {
    let space = {
        x: { min:0, max: 0 },
        y: { min:0, max: 0 },
        z: { min:0, max: 0 }
    };

    (await getFile('day17/input.txt')).split('\r\n').map((x,i) => x.split('').map((y,j) => space[`${i},${j},0`] = y));

    for(let key in space) {
        if (space[key] == '.') continue;
        if (space[key] == '#') {
            let point = key.split(',').map(Number);
            if (point[0] < space.x.min) space.x.min = point[0];
            if (point[0] > space.x.max) space.x.max = point[0];
            if (point[1] < space.y.min) space.y.min = point[1];
            if (point[1] > space.y.max) space.y.max = point[1];
            if (point[2] < space.z.min) space.z.min = point[2];
            if (point[2] > space.z.max) space.z.max = point[2];
        }
    }

    let expand = () => {
        for(let key in space) {
            if (space[key] == '.') continue;
            if (space[key] == '#') {
                let point = key.split(',').map(Number);
                if (point[0] == space.x.min) space.x.min = point[0] - 1;
                if (point[0] == space.x.max) space.x.max = point[0] + 1;
                if (point[1] == space.y.min) space.y.min = point[1] - 1;
                if (point[1] == space.y.max) space.y.max = point[1] + 1;
                if (point[2] == space.z.min) space.z.min = point[2] - 1;
                if (point[2] == space.z.max) space.z.max = point[2] + 1;
            }
        }

        for(let i = space.x.min; i <= space.x.max; i++) {
            for(let j = space.y.min; j <= space.y.max; j++) {
                for(let k = space.z.min; k <= space.y.max; k++) {
                    if(space[`${i},${j},${k}`] == undefined) 
                        space[`${i},${j},${k}`] = '.';
                }
            }
        }
    }

    let adjacent = (point = [0,0,0]) => {
        let sum = 0;
        for(let i = point[0] - 1; i <= point[0] + 1; i++) {
            for(let j = point[1] - 1; j <= point[1] + 1; j++) {
                for(let k = point[2] - 1; k <= point[2] + 1; k++) {
                    if(i == point[0] && j == point[1] && k == point[2]) continue;
                    if(space[`${i},${j},${k}`] == '#') sum++;
                }
            }
        }

        return sum;
    }

    let step = () => {
        expand();
        let nextSpace = { x: space.x, y: space.y, z: space.z };
        for(let key in space) {
            if(['x','y','z'].includes(key)) continue;

            let val = adjacent(key.split(',').map(Number))
            if (space[key] == '#' && (val == 2 || val == 3)) nextSpace[key] = '#';
            else if (val == 3) nextSpace[key] = '#';
            else nextSpace[key] = '.';
        }

        space = nextSpace;
    };

    let activeCount = () => {
        let sum = 0;
        for(let key in space) {
            if(space[key] == '#') sum++;
        }

        return sum;
    }

    for(let i = 0; i < 6; i++) step();

    terminal.textContent = `Active cubes after six cycles = ${activeCount()}`;
}