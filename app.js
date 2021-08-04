// grab all the DOM eleemnts

// all screens
const gameOver = document.querySelector('.game-over')
const home = document.querySelector('#home')
const stage = document.querySelector('#stage')
const resume = document.querySelector('#paused')
const credits = document.querySelector('#credits')
const scores = document.querySelector('#scores')

// all buttons
const playButton = document.querySelector('#playButton')
const pauseButton = document.querySelector('#pauseButton')
const resumeButton = document.querySelector('#resumeButton')
const playGame = document.querySelector('#playGame')
const creditsButton = document.querySelector('#creditsButton')
const homeButtonFromCredits = document.querySelector('#homeButtonFromCredits')
const homeButtonFromScores = document.querySelector('#homeButtonFromScores')
const quitButtonFromResume = document.querySelector('#quitButtonFromResume')
const quitButtonFromGameOver = document.querySelector('#quitButtonFromGameOver')

const gameMusic = document.querySelector('#game-sound')
const gameOverMusic = document.querySelector('#game-over-sound')

// define all the game states

// start the game music
// gameMusic.play()

// game over function
const gameOverScreen = (s) => {
    const finalScore =  document.querySelector('#final-score')

    gameMusic.pause()
    gameOverMusic.play()
    stage.style.display = 'none'
    gameOver.style.display = 'block'
    finalScore.innerHTML = s
}

// play game buton from home screen
playGame.addEventListener('click', () => {
    home.style.display = 'none'
    play()
})

// play game button from game over screen
playButton.addEventListener('click', () => {
    gameOver.style.display = 'none'
    obstacle.style.animation = ''
    play()
})

// credits button
creditsButton.addEventListener('click', () => {
    home.style.display = 'none'
    credits.style.display = 'block'
})

//home button from credits screen
homeButtonFromCredits.addEventListener('click', () => {
    credits.style.display = 'none'
    home.style.display = 'block'
    
})

// pause game button
pauseButton.addEventListener('click', () => {
    console.log('pause button clicked')
    // scores.style.display = 'none'
    stage.style.filter = 'blur(8px)'
    gameOver.style.display = 'none'
    resume.style.display = 'block'
    pause()
})

// resume game button
resumeButton.addEventListener('click', () => {
    stage.style.filter = 'none'
    resume.style.display = 'none'  
    resumeGame()
})

// quit button action from game over screen
quitButtonFromGameOver.addEventListener('click',() => {
    stage.style.display = 'none'  
    resume.style.display = 'none'  
    home.style.display = 'block'
    // if(isAlive !== undefined){
    //     clearInterval(isAlive)
    // }
    pause()
})

// Quit buton action from resume screen
quitButtonFromResume.addEventListener('click',() => {
    stage.style.display = 'none'  
    resume.style.display = 'none'  
    home.style.display = 'block'
    if(isAlive){
        clearInterval(isAlive)
    }
    pause()
})

// play game function
const play = () => {
    const player = document.querySelector('#player')
    const scoreBoard = document.querySelector('#score-board')

    // start the game music
    gameMusic.play()

    // clear the existing animation
    obstacle.style.animation = ''

    let socre = 0;
    let level = 1;

    // levels
    let levels  = [
    {
        level : 1,
        scoreMulitlier: 1,
        speed: 1,
        threshhold: 1500
    },{
        level : 2,
        scoreMulitlier: 1.5,
        speed: 0.95,
        threshhold: 5000

    },{
        level : 3,
        scoreMulitlier: 1.75,
        speed: 0.90,
        threshhold: 15000

    },{
        level : 4,
        scoreMulitlier: 2.05,
        speed: 0.85,
        threshhold: 45000
    },{
        level : 5,
        scoreMulitlier: 2.55,
        speed: 0.80,
    }]

    // Obstacles
    const Obstacles = [{
        name: 'small',
        height: 40,
        width: 20,
        bottom: 0
    },{
        name: 'large',
        height: 40,
        width: 30,
        bottom: 0
    },{
        name: 'floating',
        height: 45,
        width: 30,
        bottom: 35
    }]

    // make stage visble
    stage.style.display = 'block'

    const moveObstacle = (speed) => {
        obstacle.style.animationDuration = `${speed}s`
    }

    // player movements
    const states = (key) => {
        switch (key) {
            case "ArrowUp":
                jump()
                break;
            case "ArrowDown":
                duck()
                break;
        }
    }

    // jump player movement
    const jump = () => {
        if(player.classList != 'jump'){
            player.classList.add('jump');
            setTimeout(() => {
                player.classList.remove('jump');
            }, 300)
        }
    }

    // duck player movement
    const duck = () => {
        player.style.height = 30 + 'px'
        player.style.width = 80 + 'px'
        setTimeout(() => {
            player.style.height = 50 + 'px'
            player.style.width = 50 + 'px'
        }, 300)
    }

    // generate obstacles dynamically
    const generateObstacles = () => {

        // pick an obstacle acc. to its probability randomly from Obstacles array
        const obstacleSelectionChances = [0,0,0,0,0,1,1,1,1,2,2]

        const idx = Math.floor(Math.random() * obstacleSelectionChances.length)
        const obstacleToGenerate = Obstacles[obstacleSelectionChances[idx]]

        let range = Math.floor(Math.random() * (700 - 600) + 700);
        const obs = document.createElement('div')
        obs.style.left = range + 200 + 'px' 
        obs.style.animationDuration = `${levels[level].speed}s`
        obs.style.setProperty('--obstacle-left-distance',obs.style.left)
        obs.classList.add('obstacle')
        obs.classList.add(obstacleToGenerate.name)

        stage.appendChild(obs)
    }

    moveObstacle(1)

    const isAlive = setInterval(() => {
        const obstacle = document.querySelector('#obstacle')
        let currObstacle = obstacle.classList
        currObstacle = currObstacle[1]

        let x = -1

        if(currObstacle == 'small'){
            x = 0
        }else if(currObstacle == 'large'){
            x = 1
        }else if(currObstacle == 'floating'){
            x = 2
        }

        const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'))
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'))
        const obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'))
        const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('height'))

        // check if obstacleLeft is less than -25px
        if(obstacleLeft < 0){
            const obstacles = document.getElementsByClassName('obstacle');

            if(obstacles.length < 10){
                generateObstacles()
            }
            stage.removeChild(obstacles[0])
            obstacles[0].id = 'obstacle'
        }

        // collision detection
        if(obstacleLeft >= 20 && obstacleLeft <= 70 && playerBottom <= (Obstacles[x].height - 10 ) && playerTop > obstacleBottom ){
            obstacle.style.animation = 'none'
            isGameOver = true
            gameOverScreen(socre)
            clearInterval(isAlive)
        }else{
            // did not collided

            // check for threashold
            if(parseInt(socre) >= levels[level - 1].threshhold && levels[level].threshhold !== undefined){
                level+= 1
                moveObstacle(levels[level - 1].speed)
            }

            // update score
            socre = socre + Math.floor(1 * levels[level - 1].scoreMulitlier)
            scoreBoard.innerHTML = socre
        }
    },10)

    // listen for the keypress
    document.addEventListener('keydown', (e) => {
        states(e.code)
    })
}

// pause function
const pause = () => {
    const player = document.querySelector('#player')
    const obstacle = document.querySelector('#obstacle')

    // pause game music
    // gameMusic.pause

    

    player.style.animationPlayState = 'paused'
    obstacle.style.animationPlayState = 'paused'
}

// resume function
const resumeGame = () => {
    const player = document.querySelector('#player')
    const obstacle = document.querySelector('#obstacle')

    // play the game music
    // gameMusic.play()

    player.style.animationPlayState = 'running'
    obstacle.style.animationPlayState = 'running'
}
