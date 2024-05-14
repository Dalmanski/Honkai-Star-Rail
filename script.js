let guaranteedPull = 0;
        
        // Function to animate the reward image
        function animateReward(rewardImage) {
            // Add the animate-reward class to trigger the animation
            rewardImage.classList.add('animate-reward');
    
            // Remove the animate-reward class after the animation completes
            rewardImage.addEventListener('animationend', function() {
                rewardImage.classList.remove('animate-reward');
            });
        }
    
        function pull(rewardImage, nextButton) {

            let chance = 0;

            guaranteedPull++;
            animateReward(rewardImage);
    
            if (Math.random() < 0.005 || guaranteedPull >= 90) {
                // Add video name "5 star vid.mp4" (Wait until the video end)
                var video = document.createElement('video');
                video.src = '5 star vid.mp4';
                video.autoplay = true;
                video.onended = function() {
                    rewardImage.style.width = '50%'; // Set the width to 50% of its original size
                    rewardImage.style.height = 'auto'; // Maintain aspect ratio by setting height to auto
                    // After the video ends, display the appropriate reward image
                    if (Math.random() < 0.5) {
                        rewardImage.src = 'Firefly guaranteed.png';
                    } else {
                        // From 1 - 7
                        chance = Math.floor(Math.random() * 8) + 1;
                        if (chance === 1){
                            rewardImage.src = 'Splash art\\Character_Bailu_Splash_Art.webp';
                        } else if (chance === 2){
                            rewardImage.src = 'Splash art\\Character_Bronya_Splash_Art.webp';
                        } else if (chance === 3){
                            rewardImage.src = 'Splash art\\Character_Clara_Splash_Art.webp';
                        } else if (chance === 4){
                            rewardImage.src = 'Splash art\\Character_Gepard_Splash_Art.webp';
                        } else if (chance === 5){
                            rewardImage.src = 'Splash art\\Character_Himeko_Splash_Art.webp';
                        } else if (chance === 6){
                            rewardImage.src = 'Splash art\\Character_Welt_Splash_Art.webp';
                        } else if (chance === 7){
                            rewardImage.src = 'Splash art\\Character_Yanqing_Splash_Art.webp';
                        }                
                    }
                    // Add sounds name "5 star end sound effect.MP3"
                    var audio = new Audio('5 star end sound effect.MP3');
                    audio.play();
                    animateReward(rewardImage);
                    document.body.removeChild(video);
                    // Show the "Next" button again
                    nextButton.style.display = 'block';
                };
                document.body.appendChild(video);
                guaranteedPull = 0;
    
                // Hide the "Next" button until the video ends
                nextButton.style.display = 'none';
            } else {
                // Add sounds name "claim pull Sound effect.MP3"
                var audio = new Audio('claim pull Sound effect.MP3');
                audio.play();
                // From 1 - 3
                chance = Math.floor(Math.random() * 4) + 1;
                if (chance === 1){
                    rewardImage.src = 'Splash art\\Light_Cone_Cornucopia.webp';
                } else if (chance === 2){
                    rewardImage.src = 'Splash art\\Light_Cone_Adversarial.webp';
                } else if (chance === 3){
                    rewardImage.src = 'Splash art\\Light_Cone_Amber.webp';
                } else if (chance === 4){
                    rewardImage.src = 'Splash art\\Light_Cone_Collapsing_Sky.webp';
                }
            }
        }
    
        // Function to create and show the fade-in overlay with the "Next" button
        function showFadeOverlay(clicksNeeded) {
            // Create the overlay element
            var overlay = document.createElement('div');
            overlay.className = 'fade-overlay';
    
            // Create the reward image
            var rewardImage = document.createElement('img');
            rewardImage.className = 'reward-image';
            pull(rewardImage, nextButton);
    
            // Create the "Next" button
            var nextButton = document.createElement('button');
            nextButton.className = 'next-button';
            nextButton.textContent = 'Next';
    
            // Add click event listener to the "Next" button
            nextButton.addEventListener('click', function() {
                rewardImage.style.width = '23%'; // Set the width to 50% of its original size
                rewardImage.style.height = 'auto'; // Maintain aspect ratio by setting height to auto
                clickCount++;

                // Check if the required number of clicks has been reached
                if (clickCount > clicksNeeded - 1) {
                    // Fade out the overlay
                    overlay.style.animation = 'fadeOut 0.5s forwards';

                    // Hide the image and button
                    rewardImage.style.display = 'none';
                    nextButton.style.display = 'none';

                    // Remove the overlay after the fade-out animation
                    overlay.addEventListener('animationend', function() {
                        document.body.removeChild(overlay);
                        clickCount = 0; // Reset click count when overlay is removed
                    });

                } else {
                    pull(rewardImage, nextButton); // Update reward image for the next click
                }
            });
    
            // Add the image and button to the overlay
            overlay.appendChild(rewardImage);
            overlay.appendChild(nextButton);
    
            // Add the overlay to the body
            document.body.appendChild(overlay);
    
            // Show the image and button after the fade-in animation
            setTimeout(function() {
                rewardImage.style.display = 'block';
                nextButton.style.display = 'block';
            }, 500); // Delay should match the fade-in duration
    
            // Variable to track the number of clicks
            var clickCount = 0;
        }
    
        // Get the special pass element
        var specialPass = document.querySelector('.special-pass');
    
        // Get the warp buttons
        var warp1Button = document.getElementById('warp1');
        var warp10Button = document.getElementById('warp10');
    
        // Add click event listeners to the warp buttons
        warp1Button.addEventListener('click', function() {
            // Decrease the special pass value by 1
            var currentValue = parseInt(specialPass.textContent);
            if (currentValue > 0){
                specialPass.textContent = currentValue - 1;
                showFadeOverlay(1); // Show the fade overlay with "Next" button for 1 click
            }
        });
    
        warp10Button.addEventListener('click', function() {
            // Decrease the special pass value by 10
            var currentValue = parseInt(specialPass.textContent);
            if (currentValue >= 10){
                specialPass.textContent = currentValue - 10;
                showFadeOverlay(10); // Show the fade overlay with "Next" button for 10 clicks
            }
        });