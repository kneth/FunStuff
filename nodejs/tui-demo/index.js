var term = require('terminal-kit').terminal ;

term.grabInput() ;


var menuItems = [
    'Create',
    'Mark done',
    'Delete',
    'Quit'
];

term.singleColumnMenu(menuItems, (error, response) => {
    switch (response.selectedIndex) {
        case 0:
            console.log('c');
            break;
        case 1:
            console.log('m');
            break;
        case 2:
            console.log('d');
            break;
        case 3:
            console.log('q');
            process.exit();
    }
});
