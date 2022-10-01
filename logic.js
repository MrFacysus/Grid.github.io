// when window loads
window.onload = () => {

    // list of all colors
    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
    
    // current color
    let currentColor = "red";

    // define interval
    let interval;

    let dist = 0;
    // set rows value to screen height / 50 px, same for the height
    var rows = Math.floor(window.innerHeight / 50);
    var cols = Math.floor(window.innerWidth / 50);

    // define tiles
    const tiles = document.getElementById('tiles');

       // define distance between tiles
       const distance = (a, b) => {
        const x = a.offsetLeft - b.offsetLeft;
        const y = a.offsetTop - b.offsetTop;

        return Math.sqrt(x * x + y * y);
    }

    function shockwave(list, target) {
        // check the distance between the target tile and each tile in list
        for (let i = 0; i < list.length; i++)
        {
            // if the distance is less than 100, change the background color to blue
            if (distance(target, list[i]) < dist)
            {
                list[i].style.backgroundColor = target.style.backgroundColor;
            }
        }

        // if all tiles background color is blue, stop the animation
        if (list.every(tile => tile.style.backgroundColor === target.style.backgroundColor))
        {
            // stop interval
            clearInterval(interval);
        }

        dist+= 10;
    }

    // function called stagger which takes a list of elements and a target element
    function stagger(list, target) {
        dist = 0;

        interval = setInterval(shockwave, 1, list, target);
    }

    // create a tile function
    const maketile = index => {
        const tile = document.createElement('div');

        tile.classList.add('tile');

        return tile;
    }

    // create tile by count
    const createTiles = count => {
        Array.from(Array(count)).map((tile, index) => {
            tiles.appendChild(maketile(index));
        });
        tiles.style.setProperty("--cols", cols);
        tiles.style.setProperty("--rows", rows);
    }

    // create tiles
    createTiles(rows * cols);

    // add listener to clicks on the tile
    tiles.addEventListener('click', e => {
        if (e.target.classList.contains('tile')) {
            // if there is an interval running clear it
            if (interval) {clearInterval(interval);}
            // clicked tile changes background color to blue
            e.target.style.backgroundColor = currentColor;
            // call stagger with all of the tiles in a list and the clicked tile
            stagger(Array.from(tiles.children), e.target);
            // switch the current color with the next color in the list
            currentColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
        }
    });
}