

const container = document.getElementById('grid_container');

for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.id = `${row}${col}`;
        // Using dataset to store custom data

        gridItem.style.background = (row + col) % 2 === 0 ? '#333333' : '#BEBEBE';  // Charcoal and Light stone

        container.appendChild(gridItem);
    }
}





        
       


        const myDivs = document.querySelectorAll('.dropdown');
const hiddenBox1 = document.querySelector('.hiddenbox');

const hiddenBox2 = document.querySelector('.hiddenboxright');

function handleDivClick1(event) {
    hiddenBox1.style.display = 'block';
}

function handleDivClick2(event) {
    hiddenBox2.style.display = 'block';
}




function handleClickOutside1(event) {
    let isClickInside = myDivs[0].contains(event.target);
    if (!isClickInside) {
        hiddenBox1.style.display = 'none'; // Hide the hiddenbox
    }
}



function handleClickOutside2(event) {
    let isClickInside = myDivs[1].contains(event.target);
    if (!isClickInside) {
        hiddenBox2.style.display = 'none'; // Hide the hiddenbox
    }
}











const myDivs3 = document.querySelectorAll('.hiddenbox .element1');

myDivs3.forEach(div => div.addEventListener('click', handleDivClick3));

function handleDivClick3(event) {
    const colorName = event.target.textContent;
    document.querySelector('.dropdown p').textContent = colorName;
}



const myDivs4 = document.querySelectorAll('.hiddenboxright .element1');

myDivs4.forEach(div => div.addEventListener('click', handleDivClick4));

function handleDivClick4(event) {
    const colorName = event.target.textContent;
    document.querySelectorAll('.dropdown p')[1].textContent = colorName;
}
















































const createbutton = document.querySelector('.create-button');
const joinbutton = document.querySelector('.join-button');



const theme = document.querySelector('.theme'); 
const sun = document.querySelector('.fa-sun'); 
const moon = document.querySelector('.fa-moon'); 

let sun_on = 0;

theme.addEventListener('click', function() {

    
    
    

    if (sun_on === 0) { 
        document.documentElement.classList.remove('root_1');
        document.documentElement.classList.toggle('root_2');
        
        sun.style.opacity = '0.8';
        moon.style.opacity = '0.3';

        sun_on = 1;
    }
        
    else {
        document.documentElement.classList.remove('root_2');
        document.documentElement.classList.toggle('root_1');

        sun.style.opacity = '0.2';
        moon.style.opacity = '1';

        sun_on = 0;

    }

})

/* const socket = new WebSocket('wss://chessbysesilu.duckdns.org:8080/') */

const socket = new WebSocket('wss://chessbysesilu.duckdns.org:8080/')
 
   

const element = document.querySelector('.simple-input_timer.hour');
const element_min = document.querySelector('.simple-input_timer.minute');

let mouseY;
let baseY;

function moveTimer(event) {
    mouseY = event.clientY;

    if ((baseY - mouseY) > 10) {
        if (element.value < 9) {
            element.value = "0" + (parseInt(element.value) + 1);
        } else {
            element.value = (parseInt(element.value) + 1).toString();
        }
        baseY = event.clientY;
    } else if ((baseY - mouseY) < -10 && element.value > 0) {
        if (element.value < 11) {
            element.value = "0" + (parseInt(element.value) - 1);
        } else {
            element.value = (parseInt(element.value) - 1).toString();
        }
        baseY = event.clientY;
    }
}

function moveTimer_min(event) {
    mouseY = event.clientY;

    if ((baseY - mouseY) > 10 && element_min.value < 59) {
        if (element_min.value < 9) {
            element_min.value = "0" + (parseInt(element_min.value) + 1);
        } else {
            element_min.value = (parseInt(element_min.value) + 1).toString();
        }
        baseY = event.clientY;
    } else if ((baseY - mouseY) < -10 && element_min.value > 0) {
        if (element_min.value < 11) {
            element_min.value = "0" + (parseInt(element_min.value) - 1);
        } else {
            element_min.value = (parseInt(element_min.value) - 1).toString();
        }
        baseY = event.clientY;
    }
}

element.addEventListener('mousedown', (event) => {
    baseY = event.clientY;
    document.addEventListener('mousemove', moveTimer);

    // Stop tracking on mouseup
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveTimer);
    });
});

element_min.addEventListener('mousedown', (event) => {
    baseY = event.clientY;
    document.addEventListener('mousemove', moveTimer_min);

    // Stop tracking on mouseup
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveTimer_min);
    });
});
















  

document.querySelector('.x_close').addEventListener('click', function() {

    console.log("eiii13");
    document.querySelector('.time_form').style.display = 'none';
    document.querySelector('.end_form').style.display = 'none';
});






socket.onopen = function() {
    console.log('WebSocket connection established');
    
    setTimeout(() => {
        createbutton.addEventListener('click', handleClickCreate);
        joinbutton.addEventListener('click', handleClickJoin);


        createbutton.addEventListener('mouseover', () => {
            createbutton.style.backgroundColor = '#FFC300'; // Darker yellow on hover
        });
        
        createbutton.addEventListener('mouseout', () => {
            createbutton.style.backgroundColor = '#F6B93B'; // Reset to original color on mouse out
        });



    }, 500); // Delay of 200ms before event listeners are added
    
    

    createbutton.style.backgroundColor = '#F6B93B';
    joinbutton.style.backgroundColor = '#F6B93B';
    

};

let p1 = undefined;
let p2 = undefined;

// Handle messages from the server
socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    const payload = message.payload;

    // Handle specific message types
    if (message.type === 'start_game') {

        document.querySelector('.form').style.display = "none";

        p1 = payload.player1;
        p2 = payload.player2;

        document.querySelector('.user1 h5').textContent = payload.player2;
        document.querySelector('.user2 h5').textContent = payload.player1;


        console.log(payload);

        chess_game(payload.id, payload.player, payload.color1, payload.color2, payload.round, payload.countdown_time) 

    }

};





// Optional: Handle WebSocket errors
socket.onerror = function(error) {
    console.error('WebSocket Error:', error);
};




// Optional: Handle WebSocket close event
socket.onclose = function(event) {
    console.log('WebSocket connection closed:', event);
};




let id = undefined;



// Example usage:


    // Function to handle button click
    function handleClickCreate(event) {
        // replace with your actual endpoint
        let colorTexts = document.querySelectorAll('.simple-input2');
        const inputs = document.querySelectorAll('.simple-input');
        


        function getRandomInt() {
            return Math.floor(Math.random() * 10);
        }
        
        function getRandomLetter() {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            return letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        id = getRandomLetter() + getRandomInt() + "-" +
                 getRandomLetter() + getRandomLetter() + getRandomInt() + getRandomLetter() + "-" +
                 getRandomLetter() + getRandomLetter() + getRandomInt() + getRandomInt();
       
        


        
        
        
        
        
        
        
        // Function to generate game ID
        const player1 = inputs[0].value;
        const player2 = inputs[1].value;
     // Replace with actual player 1 info
        const color1 = colorTexts[0].value;
        const color2 = colorTexts[1].value;


        const countdown = document.querySelectorAll('.simple-input_timer');
        const countdown_time = (parseInt(countdown[0].value) * 60 + parseInt(countdown[1].value)) * 1000;

       

        

        const gameData = {
            type: 'create_game',
            payload : {
                id,
                player1,
                color1,
                player2,
                color2,
                countdown_time
            
            
            
            } 
            
        };

        

        socket.send(JSON.stringify(gameData));

        console.log("id",id);

        document.querySelector('.ID_letters h5').textContent = `${id}`;

        document.querySelector('.form').style.display = "block";




        



const copySymbol = document.querySelector('.copy_symbol');
const warningBox = document.querySelector('.copied_alert');

copySymbol.addEventListener('mousedown', function() {
    // Get the text to be copied
    const copyText = document.querySelector('.ID_letters h5').innerText; 

    // Show the warning box
    warningBox.classList.add('show');
    warningBox.classList.add('show_1');

    // Change background color of the copy symbol
    copySymbol.style.backgroundColor = '#d3d3d3'; 
    navigator.clipboard.writeText(copyText)
        .then(() => {
            console.log('Text copied to clipboard successfully!');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });

    // Start fading out the warning box after 1 second
    setTimeout(() => {
        warningBox.classList.add('fade-out');
    }, 1000); 

    // Reset the warning box after the fade-out animation completes
    setTimeout(() => {
        warningBox.classList.remove('show', 'fade-out');
        copySymbol.style.backgroundColor = ''; // Reset background color
    }, 1500); 

    // Copy text to clipboard
    
});











copySymbol.addEventListener('mouseup', function() {
    // Revert background color when the mouse leaves
    copySymbol.style.backgroundColor = ''; // Reset to original color
});
copySymbol.addEventListener('mouseleave', function() {
    // Revert background color when the mouse leaves
    copySymbol.style.backgroundColor = ''; // Reset to original color
});
     

 
        

        
    
        

        
        



    
    

        



        
    }


    function handleClickJoin(event) {
      



        const join = document.querySelectorAll('.simple-input-join');
        const id1 = join[0].value;
      


        joinGame = {
            type: 'join_game',

            payload :

            {id: id1}


        } ;


        socket.send(JSON.stringify(joinGame));
        
    }
    


    const dropgen1 = document.querySelector('.dropdown_1');

    const dropdowns1 = document.querySelectorAll('.simple-input2')[0]; 
    
    

    const drop1 = document.querySelector('.dropdown_1 > .drop_1');
    
    const drop2 = document.querySelector('.dropdown_1 > .drop_2');
    const drop3 = document.querySelector('.dropdown_1 > .drop_3');
    
    const drop11 = document.querySelector('.dropdown_1 > .drop_1 > .drop_11');
    const drop21 = document.querySelector('.dropdown_1 > .drop_2 > .drop_21');
    const drop31 = document.querySelector('.dropdown_1 > .drop_3 > .drop_31');
    
    const check1 = document.querySelector('.dropdown_1 > .drop_1 > .fa-check.d11');
    const check2 = document.querySelector('.dropdown_1 > .drop_2 > .fa-check.d12');
    const check3 = document.querySelector('.dropdown_1 > .drop_3 > .fa-check.d13');
    


    

    const drops = [drop1, drop2, drop3];

    const checks = [check1, check2, check3];

    
    // Event listener for 'click' on dropdowns1
   

    
    let dropgen1_1 = true;

 
    let opendrop = false;


    dropdowns1.addEventListener('click', function() {

        if (dropgen1_1 === false) {return;}

        else {dropgen1.style.display = 'flex';
       

        // Define the function `selectColour` to handle the color change
        function selectColour(drop) {
            // Clear background color for all options
            drops.forEach(d => d.style.backgroundColor = '');
            checks.forEach(d => d.style.display = 'none');
    
            // Set background color for the selected dropdown
            drop.style.backgroundColor = '#b9b9b9';
            
            
            if (drop == drop1) {check1.style.display = 'block';dropdowns1.value = drop11.innerText;}
            else if (drop == drop2) {check2.style.display = 'block';dropdowns1.value = drop21.innerText;}
            else if (drop == drop3) {check3.style.display = 'block';dropdowns1.value = drop31.innerText;}
    
            // Remove event listeners after selection (if desired)
            
        }
    
        // Define a handler function to wrap `selectColour` with the element as an argument
        function handler(event) {
            selectColour(event.currentTarget);
            
        }
    
        // Add event listeners for each dropdown option, passing `handler` as the callback
        drops.forEach(drop => {
            drop.addEventListener('click', handler);
        });
        
    }

    opendrop = true;

    });
    
   


    document.addEventListener('click', function(event) {

        if (dropgen1_1 === true && opendrop === true) {dropgen1_1 = false; }

        else  {

        const isClickInside = dropgen1.contains(event.target) ;
    
        if (!isClickInside) {
            // Hide dropdown if clicked outside
            dropgen1.style.display = 'none';
            dropgen1_1 = true;
            opendrop = false;
           
        }
        
        }
    });




        





















    const dropgen2 = document.querySelector('.dropdown_2');
    
    const dropdowns2 = document.querySelectorAll('.simple-input2')[1];
    

    const drop1_2 = document.querySelector('.dropdown_2 > .drop_1');
    
    const drop2_2 = document.querySelector('.dropdown_2 > .drop_2');
    const drop3_2 = document.querySelector('.dropdown_2 > .drop_3');
    
    const drop11_2 = document.querySelector('.dropdown_2 > .drop_1 > .drop_11');
    const drop21_2 = document.querySelector('.dropdown_2 > .drop_2 > .drop_21');
    const drop31_2 = document.querySelector('.dropdown_2 > .drop_3 > .drop_31');
    
    const check1_2 = document.querySelector('.dropdown_2 > .drop_1 > .fa-check.d21');
    const check2_2 = document.querySelector('.dropdown_2 > .drop_2 > .fa-check.d22');
    const check3_2 = document.querySelector('.dropdown_2 > .drop_3 > .fa-check.d23');



    

    const drops_2 = [drop1_2, drop2_2, drop3_2];

    const checks_2 = [check1_2, check2_2, check3_2];

    
    // Event listener for 'click' on dropdowns1
   

    
    let dropgen1_2 = true;

 
    let opendrop_2 = false;


    dropdowns2.addEventListener('click', function() {

        if (dropgen1_2 === false) {return;}

        else {dropgen2.style.display = 'flex';
       

        
        function selectColour(drop) {
            // Clear background color for all options
            drops_2.forEach(d => d.style.backgroundColor = '');
            checks_2.forEach(d => d.style.display = 'none');
    
            drop.style.backgroundColor = '#b9b9b9';
            
            
            if (drop == drop1_2) {check1_2.style.display = 'block';dropdowns2.value = drop11_2.innerText;}
            else if (drop == drop2_2) {check2_2.style.display = 'block';dropdowns2.value = drop21_2.innerText;}
            else if (drop == drop3_2) {check3_2.style.display = 'block';dropdowns2.value = drop31_2.innerText;}
    
            // Remove event listeners after selection (if desired)
            
        }
    
        // Define a handler function to wrap `selectColour` with the element as an argument
        function handler(event) {
           
            selectColour(event.currentTarget);
            
        }
    
        // Add event listeners for each dropdown option, passing `handler` as the callback
        drops_2.forEach(drop => {
            drop.addEventListener('click', handler);
        });
        
    }

    opendrop_2 = true;

    });
    
   


    document.addEventListener('click', function(event) {

        if (dropgen1_2 === true && opendrop_2 === true) {dropgen1_2 = false; }

        else  {

        const isClickInside = dropgen2.contains(event.target) ;
    
        if (!isClickInside) {
            // Hide dropdown if clicked outside
            dropgen2.style.display = 'none';
            dropgen1_2 = true;
            opendrop_2 = false;
           
        }
        
        }
    });











    function chess_game(id, player,color1, color2, ronda, countime) {

        document.querySelector('.left_column').style.display = 'none';
        document.querySelector('.right_column').style.display = 'none';


        document.querySelector('.screen_1').style.justifyContent = 'center';
        document.querySelector('.screen_1').style.alignItems = 'center';

        
        
        document.querySelector('.grid_container').style.display = 'grid';




        
        
        

        let turn = ronda;
    let turno; // Declare turno here

    if (ronda === 1) {
        turno = true; // Assign value inside the block
        document.querySelector('.user2').classList.add('active-turn');

    } else {
        turno = false; // Assign value inside the block
        document.querySelector('.user1').classList.add('active-turn');
    }

 
    timer_update(countime, turno);

   





















            





    
     

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        const payload = message.payload;
    
       if (message.type === 'move') {
    
        

            if (payload.moveA === 101) {
                
                
                document.querySelector('.user1 h6').style.display = 'block'; return;
            
            }
            if (payload.moveA === 201) {
                
                container.removeEventListener('mousedown', EventHear);
                document.querySelector('.end_form .ID_letters h5').innerText = p1;
                document.querySelector('.end_form').style.display = 'block'; return;
            
            }
            if (payload.moveA === 301) {
                
                container.removeEventListener('mousedown', EventHear);
                document.querySelector('.time_form .ID_letters h5').innerText = p1;
                document.querySelector('.time_form').style.display = 'block'; return;
            
            
            }




            
            clearInterval(timerId);
    
            if (payload.castling === "Yes") {
    
                if (payload.moveA < payload.moveB) {if (ronda === 2){moveBlack(88,86)} else {moveBlack(88,85)}}
                else {if (ronda === 2){{moveBlack(81,84)}} else {moveBlack(81,83)}}
    
    
            }
    
    
    
    
    
    
            moveBlack(payload.moveA, payload.moveB)
    
    
    
            if (payload.pawn_promotion !== null)  {
    
                let promo = undefined ;
    
                blackPieces = blackPieces.filter(piece => piece.position != 99 - payload.moveB);
    
                if (payload.pawn_promotion == "Queen") {promo = new Queen(color2,99 - payload.moveB);}
                else if (payload.pawn_promotion == "Knight") {promo = new Knight(color2,99 - payload.moveB);}
    
                blackPieces.push(promo);
                
                // Update the UI
                let element = document.getElementById(`${99 - payload.moveB}`);
                let image = element.querySelector('img');
                element.removeChild(image);
        
                // Paint the upgraded piece
                paintPieces([promo]);
    
                }
    
            
                turno = true;
    
                timer_update(countime,turno); 


                document.querySelector('.user2').classList.add('active-turn');

                // Remove glow after the turn
                document.querySelector('.user1').classList.remove('active-turn');


                if (ChessPiece.check(whitePieces.filter(piece => piece instanceof King)[0].position)) {  

                    console.log(ChessPiece.mate());

                    if (ChessPiece.mate()) {

                        socket.send(JSON.stringify({type: 'move', payload : {id, player, moveA: 201, moveB: 201, turn, pawn_promotion, castle}}));

                        container.removeEventListener('mousedown', EventHear);
                        document.querySelector('.end_form .ID_letters h5').innerText = p2;
                        document.querySelector('.end_form').style.display = 'block';

                    }
                    
                    else {
                    document.querySelector('.user2 h6').style.display = 'block'; 
                    socket.send(JSON.stringify({type: 'move', payload : {id, player, moveA: 101, moveB: 101, turn, pawn_promotion, castle}}));

                    }
                 }


        }
    };
                    
        
        
    
        
    
        
        function moveBlack(A,B) {
    
            perspectiveA = 99 - A;
            perspectiveB = 99 - B;
    
            const element = document.getElementById(`${perspectiveA}`);
            const element1 = document.getElementById(`${perspectiveB}`);

            console.log(perspectiveA,perspectiveA);
            
    
            if (whitePieces.map(i => i.position).includes(perspectiveB)) {
                    
                let image = element.querySelector('img');
                let image1 = element1.querySelector('img');
                element.removeChild(image);
                element1.removeChild(image1);
                element1.appendChild(image);
                
                whitePieces = whitePieces.filter(piece => piece.position !== perspectiveB);
                
            }
    
            else    {
            let image = element.querySelector('img');
            element.removeChild(image);
            element1.appendChild(image);}
        
        
        
            blackPieces.filter(piece => piece.position == perspectiveA).forEach(piece => piece.position = perspectiveB);
 
        //get balck piece and change position
        
        
        
        
        }





       






        function timer_update(countdownDuration, turno) {
            const startTime = Date.now();
            const minutes_timer = document.querySelector('.minutes'); 
            const seconds_timer = document.querySelector('.seconds'); 
        
            window.timerId = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const timeLeft = Math.floor((countdownDuration - elapsed) / 1000);
        
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60; 
                
                let st_minutes = '';
                let st_seconds = '';
        
                if (minutes < 10) {
                    st_minutes = '0' + String(minutes);
                } else {
                    st_minutes = String(minutes);
                }
        
                if (seconds < 10) {
                    st_seconds = '0' + String(seconds);
                } else {
                    st_seconds = String(seconds);
                }
        
                minutes_timer.innerHTML = st_minutes;
                seconds_timer.innerHTML = st_seconds;
        
        
                if (timeLeft <= 0) {
        
                    
        
                    clearInterval(timerId);
                    console.log("Countdown finished!");
                
                    if (turno === true) {console.log("Se te ha acabado el tiempo");
        
                        container.removeEventListener('mousedown', EventHear);
        
                        socket.send(JSON.stringify({type: 'move', payload : {id, player: p1, moveA: 301, moveB: 301, turn: null, pawn_promotion: null, castle: null}}));
                        document.querySelector('.time_form .ID_letters h5').innerText = p2;
                    document.querySelector('.time_form').style.display = 'block'; return;
                    }
        
                    
        
                        
            
        
                    
        
                }
        
            }, 1000);
        }
        







































        
    
    // ChessPiece class
    class ChessPiece {
        constructor(color, position) {
            this.color = color; // 'white' or 'black'
            this.position = position; // e.g., 'e4'
        }
    
        getLinearMov_Y() {
            const horizontalMovementsY = [10, 20, 30, 40, 50, 60, 70];
            let linearMov_Y = [];
    
            for (let s of [1, -1]) {
                for (let j of horizontalMovementsY) {
                    let newPosition = this.position + s * j;
    
                    if (!ChessPiece.isValidBoundary(newPosition)) {
                        break;
                    }
    
                    if (ChessPiece.isOccupied(newPosition)) {
                        if (!whitePieces.map(i => i.position).includes(newPosition)) {
                            linearMov_Y.push(newPosition);
                        }
                        break;
                    }
    
                    linearMov_Y.push(newPosition);
                }
            }
    
            return linearMov_Y;
        }
    
        getLinearMov_X() {
            const horizontalMovementsX = [1, 2, 3, 4, 5, 6, 7];
    
            let linearMov_X = [];
    
            for (let s of [1, -1]) {
                for (let j of horizontalMovementsX) {
                    let newPosition = this.position + s * j;
    
                    if (!ChessPiece.isValidBoundary(newPosition)) {
                        break;
                    }
    
                    if (ChessPiece.isOccupied(newPosition)) {
                        if (!whitePieces.map(i => i.position).includes(newPosition)) {
                            linearMov_X.push(newPosition);
                        }
                        break;
                    }
    
                    linearMov_X.push(newPosition);
                }
            }
    
            return linearMov_X;
        }
        
        getDiagMov_xy() {
            const diagMovements_xy = [1, 2, 3, 4, 5, 6, 7].map(i => 11 * i);
    
            let diagMov_XY = [];
    
            for (let s of [1, -1]) {
                for (let j of diagMovements_xy) {
                    let newPosition = this.position + s * j;
    
                    if (!ChessPiece.isValidBoundary(newPosition)) {
                        break;
                    }
    
                    if (ChessPiece.isOccupied(newPosition)) {
                        if (!whitePieces.map(i => i.position).includes(newPosition)) {
                            diagMov_XY.push(newPosition);
                        }
                        break;
                    }
    
                    diagMov_XY.push(newPosition);
                }
            }
    
            return diagMov_XY;
        }
    
        getDiagMov_mxy() {
            const diagMovements_mxy = [1, 2, 3, 4, 5, 6, 7].map(i => 9 * i);
    
            let diagMov_mXY = [];
    
            for (let s of [1, -1]) {
                for (let j of diagMovements_mxy) {
                    let newPosition = this.position + s * j;
    
                    if (!ChessPiece.isValidBoundary(newPosition)) {
                        break;
                    }
    
                    if (ChessPiece.isOccupied(newPosition)) {
                        if (!whitePieces.map(i => i.position).includes(newPosition)) {
                            diagMov_mXY.push(newPosition);
                        }
                        break;
                    }
    
                    diagMov_mXY.push(newPosition);
                }
            }
    
            return diagMov_mXY;
        }
    
        static isValidBoundary(position) {
            const row = Math.floor(position / 10);
            const col = position % 10;
            return row >= 1 && row <= 8 && col >= 1 && col <= 8;
        }
    
        static isOccupied(position) {
            const element = document.getElementById(position);
            return whitePieces.map(i => i.position).includes(position) || blackPieces.map(i => i.position).includes(position);  // Fixed typo 'isOcuppied' to 'isOccupied'
        }


        static check(place) {
        
            const getLinearMov_Y = () => {
                const horizontalMovementsY = [10, 20, 30, 40, 50, 60, 70];
                
        
                for (let s of [1, -1]) {
                    for (let j of horizontalMovementsY) {
                        let newPosition = place + s * j;
        
                        if (!ChessPiece.isValidBoundary(newPosition)) {
                            break;
                        }
        
                        if (ChessPiece.isOccupied(newPosition)) { 
                            
                            if (whitePieces.filter(i => i.position === newPosition).length > 0) {
                                return false;
                            }
                            
                            
                            const piece = blackPieces.filter(i => i.position == newPosition)[0];


                             

                            if (piece instanceof Queen || piece instanceof Rook || (j == 1 && piece instanceof King) ) {
                                return true;
                            }


                            
                                    
                            break;
                        }
        
                        
                    }
                }
                
                return false

                }
                
            
        
            const getLinearMov_X = () => {
                const horizontalMovementsX = [1, 2, 3, 4, 5, 6, 7];
        
                
        
                for (let s of [1, -1]) {
                    for (let j of horizontalMovementsX) {
                        let newPosition = place + s * j;
        
                        if (!ChessPiece.isValidBoundary(newPosition)) {
                            break;
                        }
        
                        if (ChessPiece.isOccupied(newPosition)) { 
                            
                            if (whitePieces.filter(i => i.position === newPosition).length > 0) {
                                return false;
                            }
                            const piece = blackPieces.filter(i => i.position == newPosition)[0];


                             

                            if (piece instanceof Queen || piece instanceof Rook || (j == 1 && piece instanceof King) ) {
                                return true;
                            }
                            
                                    
                            break;
                        }
        
                        
                    }
                }
        
                return false;
            };
            
            
            const getDiagMov_mxy = () => {
                const diagMovements_xy = [1, 2, 3, 4, 5, 6, 7].map(i => 11 * i);
        
                
        
                for (let s of [1, -1]) {
                    for (let j of diagMovements_xy) {
                        let newPosition = place + s * j;
        
                        if (!ChessPiece.isValidBoundary(newPosition)) {
                            break;
                        }
        
                        if (ChessPiece.isOccupied(newPosition)) { 
                            
                            
                            if (whitePieces.filter(i => i.position === newPosition).length > 0) {
                                return false;
                            }
                            
                            const piece = blackPieces.filter(i => i.position == newPosition)[0];

                           
                             



                            if (piece instanceof Queen || piece instanceof Bishop || (j == 11 && piece instanceof King) || (j == 11 && s == -1 && piece instanceof  Pawn) ) {
                                return true;
                            }
                            
                                    
                            break;
                        }
        
                        
                    }
                   
                }
        
                return false;
            };
        
    
            const getDiagMov_xy = () => {
                const diagMovements_mxy = [1, 2, 3, 4, 5, 6, 7].map(i => 9 * i);
        
               
        
                for (let s of [1, -1]) {
                    for (let j of diagMovements_mxy) {
                        let newPosition = place + s * j;
        
                        if (!ChessPiece.isValidBoundary(newPosition)) {
                            break;
                        }
        
                        if (ChessPiece.isOccupied(newPosition)) { 
                            if (whitePieces.filter(i => i.position === newPosition).length > 0) {
                                return false;
                            }
                            
                            const piece = blackPieces.filter(i => i.position == newPosition)[0];


                             

                            if (piece instanceof Queen || piece instanceof Bishop || (j == 9 && piece instanceof King) || (j == 9 && s == -1 && piece instanceof Pawn) ) {
                                return true;
                            }
                        }
        
                        
                    }
                }

                    return false;
                };


                const horsey_Mov = () => {

                    const knightMoves = [21, 19, 12, 8, -8, -12, -19, -21];
                    
                    
            
                    for (let move of knightMoves) {
                        let newPosition = place + move;
                        if (ChessPiece.isValidBoundary(newPosition) && blackPieces.map(i => i.position).includes(newPosition)) {
                            const piece = blackPieces.filter(i => i.position == newPosition)[0];

                            if (piece instanceof Knight ) {
                                return true;
                            }

                        }
                    }
                    return false;

                };
                
            
                return (getLinearMov_X() || getLinearMov_Y() || getDiagMov_xy() || getDiagMov_mxy() || horsey_Mov())
            
            

        }
        

        static mate(place) {



            

            for (let piece of whitePieces) {
                
                for (let j of piece.canMoveTo()) {
                    
                    const originalPosition = piece.position;
                    
                    piece.position = j;
                    const king_position = whitePieces.filter(piece => piece instanceof King)[0].position
                    
                    let capturedPiece = blackPieces.find(b => b.position === j);
                    if (capturedPiece) {
                        blackPieces = blackPieces.filter(b => b.position !== j);
                    }
                    
                    if (!ChessPiece.check(king_position)) {
                        
                        piece.position = originalPosition;
                        if (capturedPiece) {
                            blackPieces.push(capturedPiece);
                        }
                        
                        return false;
                    }
                    
                    piece.position = originalPosition;
                    if (capturedPiece) {
                        blackPieces.push(capturedPiece);
                    }
                }
            }
            
            return true;
        }
        



    }

    window.ChessPiece = ChessPiece;
    // Pawn class
    class Pawn extends ChessPiece {
        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/pawn_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/pawn_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/pawn_3.png"}
        }
    
        canMoveTo() {
            let valid_moves = [];
    
            for (let j of [10]) {
                if (ChessPiece.isValidBoundary(this.position - j) && !ChessPiece.isOccupied(this.position - j)) {
                    valid_moves.push(this.position - j);
                }
            }
            
            if (turn === 1 || turn === 2) {
            for (let j of [20]) {
                if (ChessPiece.isValidBoundary(this.position - j) && !ChessPiece.isOccupied(this.position - j)) {
                    valid_moves.push(this.position - j);
                }
            }}


    
            for (let j of [11, 9]) {
                if (ChessPiece.isValidBoundary(this.position - j) && blackPieces.map(i => i.position).includes(this.position - j)) {
                    valid_moves.push(this.position - j);
                }
            }
    
            return valid_moves.filter(ChessPiece.isValidBoundary.bind(this));
        }
    }
    
    // Rook class
    class Rook extends ChessPiece {

        

        constructor(color, position) {
            super(color, position);      // Call parent class constructor
            this.castling = true;        // Specific attribute for Rook
        }

        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/tower_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/tower_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/tower_3.png"}
        }
    
        canMoveTo() {
            return this.getLinearMov_X().concat(this.getLinearMov_Y());
        }
    }
    
    // Bishop class
    class Bishop extends ChessPiece {
        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/alfil_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/alfil_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/alfil_3.png"}
        }
    
        canMoveTo() {
            return this.getDiagMov_xy().concat(this.getDiagMov_mxy());
        }
    }
    
    // Knight class
    class Knight extends ChessPiece {
        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/horse_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/horse_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/horse_3.png"}
        }
        
    
        canMoveTo() {
            const knightMoves = [21, 19, 12, 8, -8, -12, -19, -21];
            let validMoves = [];
    
            for (let move of knightMoves) {
                let newPosition = this.position + move;
                if (ChessPiece.isValidBoundary(newPosition) && !whitePieces.map(i => i.position).includes(newPosition)) {
                    validMoves.push(newPosition);
                }
            }
    
            return validMoves;
        }
    }
    
    // Queen class
    class Queen extends ChessPiece {
        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/queen_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/queen_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/queen_3.png"}
        }
    
        canMoveTo() {
            return this.getLinearMov_X().concat(this.getLinearMov_Y())
                .concat(this.getDiagMov_xy()).concat(this.getDiagMov_mxy());
        }
    }
    
    // King class
    class King extends ChessPiece {


        constructor(color, position) {
            super(color, position);      // Call parent class constructor
            this.castling = true;        // Specific attribute for Rook
        }


        getImage() {
            if (this.color === 'white')
                {return "pieces_drawings/king_1.png";}
            else if (this.color === 'black')
                {return "pieces_drawings/king_2.png"}
            else if (this.color === 'green')
                {return "pieces_drawings/king_3.png"}
        }
    
        canMoveTo() {
            const kingMoves = [1, -1, 10, -10, 9, -9, 11, -11];
            let validMoves = [];
    
            for (let move of kingMoves) {
                let newPosition = this.position + move;
                if (ChessPiece.isValidBoundary(newPosition) && !whitePieces.map(i => i.position).includes(newPosition)) {
                    validMoves.push(newPosition);
                }
            }

            

            if (this.castling === true) 
                 
                whitePieces.filter(i => i instanceof Rook).forEach( i => {
                    
                    

                    if (i.castling === true) { 


                        let k = 1;
                        let j = 0;
                        let posible = true;

                        

                        if (this.position < i.position) {

                            

                            while (this.position + k < 88) { if (whitePieces.concat(blackPieces).map(i => i.position).includes(this.position + k)) { posible = false ;break;} k += 1} 

                            

                            if (posible === true) {
                           
                                
                                while (this.position + j <= 88) {if(ChessPiece.check(this.position + j)) { posible = false ;break;} j += 1}
                            
                                
                            
                            }

                            
                            
                            
                            if (posible === true) {validMoves.push(this.position+2); }

                        }

                        else {


                            while (this.position - k > 81) { if (whitePieces.concat(blackPieces).map(i => i.position).includes(this.position - k)) { posible = false ;break;} k += 1} 

                            if (posible === true) {
                           
                           
                                while (this.position - j >= 81) {if(ChessPiece.check(this.position - j)) { posible = false ;break;} j += 1}
                            
                            
                            
                            }

                            if (posible === true) {validMoves.push(this.position-2); }
                        }

                       


                    }



                  });
                        
            
                            
                
    
            return validMoves;
        }



    }
    
    // Generate pieces
    function generateWhitePieces() {
        let whitePieces = [];
    
        let i = 7;
        for (let j = 1; j <= 8; j++) {
            const pawn = new Pawn(color1, i * 10 + j);
            whitePieces.push(pawn);
        }
    
        i = 8;
        for (let j of [1, 8]) {
            const rook = new Rook(color1, i * 10 + j);
            whitePieces.push(rook);
        }
    
        for (let j of [2, 7]) {
            const knight = new Knight(color1, i * 10 + j);
            whitePieces.push(knight);
        }
    
        for (let j of [3, 6]) {
            const bishop = new Bishop(color1, i * 10 + j);
            whitePieces.push(bishop);
        }
        if (ronda === 1) {q1 = 5 ;q2 = 4 }
        else {q1 = 4 ;q2 = 5 }
        const queen = new Queen(color1, i * 10 + q2);
        whitePieces.push(queen);
    
        const king = new King(color1, i * 10 + q1);
        whitePieces.push(king);
    
        return whitePieces;
    
    }
    
        function generateBlackPieces() {
    
        let blackPieces = [];
    
        i = 2;
        for (let j = 1; j <= 8; j++) {
            const pawn = new Pawn(color2, i * 10 + j);
            blackPieces.push(pawn);
        }
    
        i = 1;
        for (let j of [1, 8]) {
            const rook = new Rook(color2, i * 10 + j);
            blackPieces.push(rook);
        }
    
        for (let j of [2, 7]) {
            const knight = new Knight(color2, i * 10 + j);
            blackPieces.push(knight);
        }
    
        for (let j of [3, 6]) {
            const bishop = new Bishop(color2, i * 10 + j);
            blackPieces.push(bishop);
        }
    
        if (ronda === 1) {q1 = 5 ;q2 = 4 }
        else {q1 = 4 ;q2 = 5 }
        blackPieces.push(new Queen(color2, i * 10 + q2));
    
        blackPieces.push(new King(color2, i * 10 + q1));
    
    
    
    
    
    
    
    
        return blackPieces;
    }
    
    // Paint pieces
    function paintPieces(pieces) {
        
        for (let piece of pieces) {
            
            const gridItem = document.getElementById(piece.position); // Use the appropriate id
            const image = document.createElement('img');
    
            
            image.src = piece.getImage(); // Set the path to your imag
            image.dataset.row = piece.position[0];
            image.dataset.column = piece.position[1]; // Set the column
    
            image.style.width = '60%';
            image.style.height = '100%';
            
            gridItem.appendChild(image);
        }
    }
    
    // Generate and paint pieces
    let whitePieces = generateWhitePieces();
    let blackPieces = generateBlackPieces();
    
    paintPieces(whitePieces.concat(blackPieces));
    
    
    
    
    
    
    
    
    
    
    
    
    let selected = 0;
    let availableCells = undefined;
    let currentPiece = undefined;
    let posSelected = undefined;
    let castle = null;
    let pawn_promotion = null;
    
    
    
    container.addEventListener('mousedown', EventHear);
    
    
    
    function EventHear(event) {
    
    
        
    
        if (turno === true) {
    
    
    
        const gridItem = event.target.closest('.grid-item');
        let pos = parseInt(gridItem.id[0]) * 10 + parseInt(gridItem.id[1]);
    
        SelectorChoice(gridItem, pos);
    
        
         }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   async function SelectorChoice(gridItem, pos) {
        
        
        
        if (selected === 0) {
            availableCells = new Object();
            posSelected = pos;
    
            if (whitePieces.map(i => i.position).includes(pos)) {
                whitePieces.forEach(piece => {
                    if (piece.position === pos) {
                        console.log(piece);
                        piece.canMoveTo().forEach(i => {
                            const element = document.getElementById(`${Math.floor(i / 10)}${i % 10}`);
                            const currentColor = window.getComputedStyle(element).backgroundColor;
                            availableCells[i] = currentColor;
                            currentPiece = piece;
                            element.style.background = '#FFCCCC';
                            
                        });
                    }
                });selected = 1;
            }
            
        }
    
    
    
        else {
            
            let element = document.getElementById(`${posSelected}`);
            let element1 = document.getElementById(`${pos}`);
            console.log(element);
            console.log(element1);
    
            if (currentPiece.canMoveTo().includes(pos)) {





                for (let i in availableCells) {
                    
                    const ele = document.getElementById(i);
                    ele.style.background = availableCells[i];
                }





                currentPiece.position = pos;
    
                if (blackPieces.map(i => i.position).includes(pos)) {


                    let recover_if_check = blackPieces.filter(piece => piece.position == pos);

                    blackPieces = blackPieces.filter(piece => piece.position !== pos);


                    if (ChessPiece.check(whitePieces.filter(piece => piece instanceof King)[0].position)) {
                        
                        blackPieces = blackPieces.concat(recover_if_check);
                        currentPiece.position=posSelected;
                        console.log("Your King is in danger!");
                        return;}

                    
                    let image = element.querySelector('img');
                    let image1 = element1.querySelector('img');

                    console.log(image);
                    console.log(image1);
                    element.removeChild(image);
                    element1.removeChild(image1);
                    element1.appendChild(image);
                    
                    
                    
                }
    
                else    {

                    if (ChessPiece.check(whitePieces.filter(piece => piece instanceof King)[0].position)) {
                        
                        currentPiece.position=posSelected;
                        console.log("Your King is in danger!");
                        return;}


                let image = element.querySelector('img');
                element.removeChild(image);
                gridItem.appendChild(image);}
    
    
    
                
    
                
                
                
    
                let moveA = posSelected;
                let moveB = pos;
                
                if (currentPiece instanceof Rook || currentPiece instanceof King) { currentPiece.castling = false;} 

                if (currentPiece instanceof King && (pos === posSelected + 2 || pos === posSelected - 2)) {
                    
                    
                    
                    castle = "Yes";

                if (pos > posSelected) {
                    castle_tower = whitePieces.filter(piece => piece instanceof Rook && piece.position > posSelected)[0];

                    const gridItem_tower = document.getElementById(String(castle_tower.position));   
                    const gridItem_now_tower = document.getElementById(String(posSelected + 1));   

                    let image = gridItem_tower.querySelector('img');
                    gridItem_tower.removeChild(image);
                    gridItem_now_tower.appendChild(image);
                }

                if (pos < posSelected) {
                    castle_tower = whitePieces.filter(piece => piece instanceof Rook && piece.position < posSelected)[0];

                    const gridItem_tower = document.getElementById(String(castle_tower.position));   
                    const gridItem_now_tower = document.getElementById(String(posSelected - 1));   

                    let image = gridItem_tower.querySelector('img');
                    gridItem_tower.removeChild(image);
                    gridItem_now_tower.appendChild(image);
                }

                
                }
            


                async function upgradePawn() {
                    
                
                    if (currentPiece instanceof Pawn && Math.floor(pos / 10) == 1) {

                        let upgradePiece = undefined;
                        let myPromise_Upgrade = new Promise((resolve, reject) => {
                            // Simulate an async operation (e.g., fetching data)
                            const PawnPromotion = document.querySelector('.PawnPromotion');
                            PawnPromotion.style.display = "flex"; // Assuming 'flex' is a string here
                
                            // Select the elements
                            const queenDiv = document.querySelector('.Queen');
                            const knightDiv = document.querySelector('.Knight');
                
                            // Add click event listeners
                            queenDiv.addEventListener('click', () => {
                                console.log('Queen clicked!');
                                PawnPromotion.style.display = "none";
                                pawn_promotion = "Queen";
                                upgradePiece = new Queen(color1, pos);
                                resolve();
                            });
                
                            knightDiv.addEventListener('click', () => {
                                console.log('Knight clicked!');
                                PawnPromotion.style.display = "none";
                                pawn_promotion = "Knight";
                                upgradePiece = new Knight(color1, pos);
                                resolve();
                            });
                        });
                
                        await myPromise_Upgrade;
                
                        // Update the whitePieces array
                        whitePieces = whitePieces.filter(element => element != currentPiece);
                        whitePieces.push(upgradePiece);
                
                        // Update the UI
                        let element = document.getElementById(`${pos}`);
                        let image = element.querySelector('img');
                        element.removeChild(image);
                
                        // Paint the upgraded piece
                        paintPieces([upgradePiece]);
                    }
                }
                
                
                await upgradePawn();
                

                socket.send(JSON.stringify({type: 'move', payload : {id, player, moveA, moveB, turn, pawn_promotion, castle}}));
                clearInterval(timerId);
                

                pawn_promotion = null;
                
                castle = null;

                turno = false;
                timer_update(countime,turno); 

                document.querySelector('.user1').classList.add('active-turn');

                // Remove glow after the turn
                document.querySelector('.user2').classList.remove('active-turn');
                turn += 2;
                hay_que_mover = true;
                selected = 0;
                
    
                
                
            }
        
    
    
            else if (whitePieces.map(i => i.position).includes(pos)) {
                for (let i in availableCells) {
                    const element = document.getElementById(i);
                    element.style.background = availableCells[i];
                }
        
                availableCells = new Object();
                posSelected = pos;
        
                whitePieces.forEach(piece => {
                    if (piece.position === posSelected) {
                        console.log(piece);
                        piece.canMoveTo().forEach(i => {
                            const element = document.getElementById(`${Math.floor(i / 10)}${i % 10}`);
                            const currentColor = window.getComputedStyle(element).backgroundColor;
                            availableCells[i] = currentColor;
                            currentPiece = piece;
        
                            element.style.background = '#FFCCCC';
                        });
                    }
                });
        
                selected = 1;
            }
    
    
    
    
            else {
                for (let i in availableCells) {
                    
                    document.getElementById(i).style.background = availableCells[i];
                }
                selected = 0;
                
            }
    }
    }
    }
    

    
    