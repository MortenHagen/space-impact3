document.addEventListener('DOMContentLoaded', function () {
	let score = 0;
	let isGameRunning = false;
	const scoreDisplay = document.getElementById('score');
	const spacecraftSpeed = 20;
	const bulletSpeed = 25;

	const spacecraft = document.querySelector('.spacecraft');
	const bulletsContainer = document.querySelector('.bullets');
	let levelText = document.querySelector('.level-message')
	const monstersContainer = document.querySelector('.monsters');
	
	const levelOneMonsterSpeed = 5;
	const levelTwoMonsterSpeed = 5;
	const levelThreeMonsterSpeed = 5;
	const levelOneCherrySpeed = 7;
	const bossOneSpeed = 7;


	let doubleBulletinterval;


	document.querySelector('#startButton').addEventListener('click', startGame);
 
	document.addEventListener('keydown', function (e) {
		 if (e.key === " " && !isGameRunning) {
			  startGame();
			  isGameRunning = true; 
		 }
	});

	window.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") {
			moveSpacecraft(-spacecraftSpeed); // Move left
		} else if (e.key === "ArrowRight") {
			moveSpacecraft(spacecraftSpeed); // Move right
		} 
	});

	function startGame() {
		updateScore(0);
		levelOneGameInterval = setInterval(levelOne, 1000);
		levelText.textContent = "level 1"
		setTimeout(()=>{
			levelText.textContent = ""
		}, 3000);
	};

	function shootBullet() {
		const bullet = document.createElement('div');
		bullet.className = 'bullet';
		bulletsContainer.appendChild(bullet);
	
		bullet.style.left = spacecraft.offsetLeft + (spacecraft.offsetWidth / 2) + 'px';
		bullet.style.top = spacecraft.offsetTop + 'px';
	
			const bulletInterval = setInterval(function () {
				const bulletTop = bullet.offsetTop - bulletSpeed;
	
				if (bulletTop >= 0) {
				bullet.style.top = bulletTop + 'px';
				} else {
					bulletsContainer.removeChild(bullet);
					clearInterval(bulletInterval);
					}
			}, 50);
	};
	setInterval(shootBullet, 250)
		
	function doubleBullet() {
		const bullet = document.createElement('div');
		bullet.className = 'bullet';
		bulletsContainer.appendChild(bullet);
	
		bullet.style.left = spacecraft.offsetLeft; + (spacecraft.offsetWidth / 2) + 'px';
		bullet.style.top = spacecraft.offsetTop + 'px';
	
			const bulletInterval = setInterval(function () {
				const bulletTop = bullet.offsetTop - bulletSpeed;
	
				if (bulletTop >= 0) {
				bullet.style.top = bulletTop + 'px';
				} else {
					bulletsContainer.removeChild(bullet);
					clearInterval(bulletInterval);
					}
			}, 50);
	};

	function moveSpacecraft(speed) {
		const spacecraftPosition = spacecraft.offsetLeft;
		const newSpacecraftPosition = spacecraftPosition + speed;

		const gamedivWidth = document.querySelector('.gamediv').offsetWidth;
		const spacecraftWidth = spacecraft.offsetWidth;

		if (newSpacecraftPosition >= 0 && newSpacecraftPosition + spacecraftWidth <= gamedivWidth) {
			spacecraft.style.left = newSpacecraftPosition + 'px';
	  }
	};
		
	function Collisions(bullet, monster) {
		const bulletRect = bullet.getBoundingClientRect();
		const monsterRect = monster.getBoundingClientRect();
  
		if (
			bulletRect.left < monsterRect.right &&
			bulletRect.right > monsterRect.left &&
			bulletRect.top < monsterRect.bottom &&
			bulletRect.bottom > monsterRect.top
		) {
			return true
		}
	};
	
	function levelOne() {
			const levelOneMonster = document.createElement('div');
			levelOneMonster.className = 'level-one-monster';
			monstersContainer.appendChild(levelOneMonster);

			const spaceImglevelOne = document.createElement('img');
			spaceImglevelOne.setAttribute('src', 'assets/games/space-impact/space-monster.jpg');
			levelOneMonster.appendChild(spaceImglevelOne);

			const levelOneMonsterPosition = Math.random() * (document.querySelector('.gamediv').offsetWidth - 50);

			levelOneMonster.style.left = levelOneMonsterPosition + 'px';

			const levelOneMonsterInterval = setInterval(function () {
				const levelOneMonsterTop = levelOneMonster.offsetTop + levelOneMonsterSpeed;
	 
				if (levelOneMonsterTop <= document.querySelector('.gamediv').offsetHeight) {
					 levelOneMonster.style.top = levelOneMonsterTop + 'px';
					handleBulletCollisions(); // Check for collisions on each space monster movement
					handleSpacecraftCollisions(); // Check for collisions after updating spacecraft position
				} else {
					 clearInterval(levelOneMonsterInterval);
					 monstersContainer.removeChild(levelOneMonster);
				}
		  }, 50);
	};

	function levelTwo() {
		const levelTwoMonster = document.createElement('div');
		levelTwoMonster.className = 'level-two-monster';
		monstersContainer.appendChild(levelTwoMonster);

		levelTwoMonster.setAttribute('data-collision-counter', 0);
		const spaceImglevelTwo = document.createElement('img');
		spaceImglevelTwo.setAttribute('src', 'assets/games/space-impact/spacecraft.jpg');
		levelTwoMonster.appendChild(spaceImglevelTwo);

		const levelTwoMonsterPosition = Math.random() * (document.querySelector('.gamediv').offsetWidth - 50);

		levelTwoMonster.style.left = levelTwoMonsterPosition + 'px';

		const levelTwoMonsterInterval = setInterval(function () {
			const levelTwoMonsterTop = levelTwoMonster.offsetTop + levelTwoMonsterSpeed;

			if (levelTwoMonsterTop <= document.querySelector('.gamediv').offsetHeight) {
				 levelTwoMonster.style.top = levelTwoMonsterTop + 'px';
					handleSpacecraftCollisions(); // Check for collisions after updating spacecraft position
					handleBulletCollisions(); 
			} else {
				 clearInterval(levelTwoMonsterInterval);
				 monstersContainer.removeChild(levelTwoMonster);
			}
	  }, 70);
	};

	function levelThree() {
		const levelThreeMonster = document.createElement('div');
		levelThreeMonster.className = 'level-three-monster';
		monstersContainer.appendChild(levelThreeMonster);
	
		levelThreeMonster.setAttribute('data-collision-counter', 0);
		const spaceImglevelThree = document.createElement('img');
		spaceImglevelThree.setAttribute('src', 'assets/games/space-impact/level-three.jpg');
		levelThreeMonster.appendChild(spaceImglevelThree);
	
		const levelThreeMonsterPosition = Math.random() * (document.querySelector('.gamediv').offsetWidth - 50);
	
		levelThreeMonster.style.left = levelThreeMonsterPosition + 'px';
	
		const levelThreeMonsterInterval = setInterval(function () {
			const levelThreeMonsterTop = levelThreeMonster.offsetTop + levelThreeMonsterSpeed;
	
			if (levelThreeMonsterTop <= document.querySelector('.gamediv').offsetHeight) {
				 levelThreeMonster.style.top = levelThreeMonsterTop + 'px';
					handleSpacecraftCollisions(); // Check for collisions after updating spacecraft position
					handleBulletCollisions();
			} else {
				clearInterval(levelThreeMonsterInterval);
				monstersContainer.removeChild(levelThreeMonster);
			}	
	  }, 20);
	};

	function bossOne() {
		const bossOneMonster = document.createElement('div');
		bossOneMonster.className = 'boss-one';
		monstersContainer.appendChild(bossOneMonster);
	
		bossOneMonster.setAttribute('data-collision-counter', 0);
		const spaceImgbossOne = document.createElement('img');
		spaceImgbossOne.setAttribute('src', 'assets/games/space-impact/BossOne.webp');
		bossOneMonster.appendChild(spaceImgbossOne);
	
		const bossOneMonsterPosition = Math.random() * (document.querySelector('.gamediv').offsetWidth - 50);
	
		bossOneMonster.style.left = bossOneMonsterPosition + 'px';
	
		const bossOneMonsterInterval = setInterval(function () {
			const bossOneMonsterTop = bossOneMonster.offsetTop + bossOneSpeed;
	
			if (bossOneMonsterTop <= document.querySelector('.gamediv').offsetHeight) {
				 bossOneMonster.style.top = bossOneMonsterTop + 'px';
					handleSpacecraftCollisions(); // Check for collisions after updating spacecraft position
					handleBulletCollisions();
			} else {
				clearInterval(bossOneMonsterInterval);
				monstersContainer.removeChild(bossOneMonster);
			}	
	  }, 120);
	};

	function cherryOne() {
		const levelOneCherry = document.createElement('div');
		levelOneCherry.className = 'level-one-cherry';
		monstersContainer.appendChild(levelOneCherry);

		levelOneCherry.setAttribute('data-collision-counter', 0);
		const levelOneCherryImg = document.createElement('img');
		levelOneCherryImg.setAttribute('src', 'assets/games/space-impact/snake-logo.gif');
		levelOneCherry.appendChild(levelOneCherryImg);
	
		const levelOneCherryPosition = Math.random() * (document.querySelector('.gamediv').offsetWidth - 50);
	
		levelOneCherry.style.left = levelOneCherryPosition + 'px';
	
		const levelOneCherryTimeout = setInterval(function () {
			const levelOneCherryTop = levelOneCherry.offsetTop + levelOneCherrySpeed;
	
			if (levelOneCherryTop <= document.querySelector('.gamediv').offsetHeight) {
				levelOneCherry.style.top = levelOneCherryTop + 'px';
				handleCherryCollisions();
			} else {
				clearInterval(levelOneCherryTimeout);
				monstersContainer.removeChild(levelOneCherry);
			}	
	  }, 20);
	};

	function handleBulletCollisions() {
		const bullets = document.querySelectorAll('.bullet');
		const levelOneMonsters = document.querySelectorAll('.level-one-monster');
		const levelTwoMonsters = document.querySelectorAll('.level-two-monster');
		const levelThreeMonsters = document.querySelectorAll('.level-three-monster');
		const bossOneMonsters = document.querySelectorAll('.boss-one');

		bullets.forEach((bullet) => {

			levelOneMonsters.forEach((levelOneMonster) => {
				if (Collisions(bullet, levelOneMonster)) {
					monstersContainer.removeChild(levelOneMonster);
					bulletsContainer.removeChild(bullet);
					updateScore(1);
				}
			})

			levelTwoMonsters.forEach((levelTwoMonster) => {
				const collisionCounter = parseInt(levelTwoMonster.getAttribute('data-collision-counter'));
					// Remove the monster
				if (Collisions(bullet, levelTwoMonster) && collisionCounter === 7) {
					monstersContainer.removeChild(levelTwoMonster);
					bulletsContainer.removeChild(bullet);
					updateScore(6);

					// Add 1 hitpoint to monster
				} else if (Collisions(bullet, levelTwoMonster) && collisionCounter < 7) {
					levelTwoMonster.setAttribute('data-collision-counter', collisionCounter + 1);
					bulletsContainer.removeChild(bullet);
				}
		  });
		  
		  	levelThreeMonsters.forEach((levelThreeMonster) => {
				const collisionCounter = parseInt(levelThreeMonster.getAttribute('data-collision-counter'));
					// Remove the monster
				if (Collisions(bullet, levelThreeMonster) && collisionCounter === 2) {
					monstersContainer.removeChild(levelThreeMonster);
					bulletsContainer.removeChild(bullet);
					updateScore(9);

					// Add 1 hitpoint to monster
				} else if (Collisions(bullet, levelThreeMonster) && collisionCounter < 2) {
					levelThreeMonster.setAttribute('data-collision-counter', collisionCounter + 1);
					bulletsContainer.removeChild(bullet);
				}
			});

			bossOneMonsters.forEach((bossOneMonster) => {
				const collisionCounter = parseInt(bossOneMonster.getAttribute('data-collision-counter'));
					// Remove the monster
				if (Collisions(bullet, bossOneMonster) && collisionCounter === 15) {
					monstersContainer.removeChild(bossOneMonster);
					bulletsContainer.removeChild(bullet);
					updateScore(100);

					// Add 1 hitpoint to monster
				} else if (Collisions(bullet, bossOneMonster) && collisionCounter < 15) {
					bossOneMonster.setAttribute('data-collision-counter', collisionCounter + 1);
					bulletsContainer.removeChild(bullet);
				}
			});
		});
	};

	function handleSpacecraftCollisions() {
		const levelOneMonsters = document.querySelectorAll('.level-one-monster');
		const levelTwoMonsters = document.querySelectorAll('.level-two-monster');
		const levelThreeMonsters = document.querySelectorAll('.level-three-monster');
		const bossOneMonsters = document.querySelectorAll('.boss-one');
		const levelOneCherries = document.querySelectorAll('.level-one-cherry');
		
		levelOneCherries.forEach((levelOneCherry) => {
			if (Collisions(levelOneCherry, spacecraft)) {
				doubleBulletinterval = setInterval(doubleBullet, 200);
				monstersContainer.removeChild(levelOneCherry);
			}
		})
		levelOneMonsters.forEach((levelOneMonster) => {
			if (Collisions(levelOneMonster, spacecraft)) {
				gameOver();
			}
		})

		levelTwoMonsters.forEach((levelTwoMonster) => {
			if (Collisions(levelTwoMonster, spacecraft)) {
				 gameOver();
			}
		});
		
		levelThreeMonsters.forEach((levelThreeMonster) => {
			if (Collisions(levelThreeMonster, spacecraft)) {
				 gameOver();
			}
		});
				
		bossOneMonsters.forEach((bossOneMonster) => {
			if (Collisions(bossOneMonster, spacecraft)) {
				 gameOver();
			}
		});
	};

	function updateScore(points) {	
		score += points;
		scoreDisplay.textContent = `Score: ${score}`;

		// Level 1.2
		if (score === 10) {
			levelTwoGameInterval = setInterval(levelTwo, 4000);
			levelText.textContent = "level 2"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 3000);
		}

		// End level 1.2
		if (score >= 23 && score <= 30) {
			clearInterval(levelTwoGameInterval);
		}

  		// Level 1.3
		  if (score === 35) {
			levelOneCherryTimeout = setTimeout(cherryOne, 1600);
			levelThreeGameInterval = setInterval(levelThree, 4000);
			levelText.textContent = "level 3"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 3000);
		}
		
  		// End Level 1.3
		  if (score >= 80 && score <= 90) {
			clearInterval(levelThreeGameInterval)
			clearInterval(doubleBulletinterval)
		}

		// Level 1.4
		if (score === 95) {
			levelOneCherryTimeout = setTimeout(cherryOne, 100);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelThreeGameInterval = setInterval(levelThree, 4000);
			levelText.textContent = "level 4"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 3000);
		}

		// End Level 1.4
		if (score >= 200 && score <= 210) {
			clearInterval(levelThreeGameInterval)
			clearInterval(levelTwoGameInterval)
			clearInterval(doubleBulletinterval)
		}


		// First boss level
		if (score === 215) {
			clearInterval(levelOneGameInterval)
			bossOneMonsterInterval = setTimeout(bossOne, 3000)
			levelText.textContent = "Boss level 1"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 3000);
		}
		/*
		if (score === 101) {
			updateScore(-1);
		}
		// Level 2.1
		if (score === 200) {
			levelOneCherryTimeout = setTimeout(cherryOne, 100);
			levelOneGameInterval = setInterval(levelOne, 1000);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelThreeGameInterval = setInterval(levelThree, 4000);
			levelText.textContent = "level 5"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 2000);
		}
		// End level 2.2
		if (score >= 337 && score <= 348) {
			clearInterval(levelThreeGameInterval)
			clearInterval(levelTwoGameInterval)
		}
		// Level 2.3
		if (score === 350) {
			levelThreeGameInterval = setInterval(levelThree, 3000);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelThreeGameInterval = setInterval(levelThree, 5000);
			levelText.textContent = "level 6"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 2000);
		}
		// End level 2.3
		if (score >= 488 && score <= 499) {
			levelOneCherryTimeout = setTimeout(cherryOne, 100);
			clearInterval(levelThreeGameInterval)
			clearInterval(levelThreeGameInterval)
			clearInterval(levelTwoGameInterval)
		}
		// Level 2.4
		if (score === 500) {
			clearInterval(levelOneGameInterval)
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelTwoGameInterval = setInterval(levelTwo, 5000);
			levelText.textContent = "level 7"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 2000);
		}
		// End level 2.4
		if (score >= 588 && score <= 599) {
			clearInterval(levelTwoGameInterval)
			clearInterval(levelTwoGameInterval)
			clearInterval(levelTwoGameInterval)
			clearInterval(levelTwoGameInterval)
		}
		// Level 3.1
		if (score === 600) {
			clearInterval(levelOneGameInterval)
			levelThreeGameInterval = setInterval(levelThree, 1000);
			levelThreeGameInterval = setInterval(levelThree, 3000);

			levelText.textContent = "level 8"
			setTimeout(()=>{
				levelText.textContent = ""
			}, 2000);
		}*/
	}
	
	function gameOver() {
		clearInterval(levelOneGameInterval);
		clearInterval(levelTwoGameInterval);
		clearInterval(levelThreeGameInterval);
		const result = confirm("Game Over! Din super-score: " + score);

		if (result) {
			monstersContainer.remove()
			monstersContainer.remove()
			monstersContainer.remove()
		}

	};
});