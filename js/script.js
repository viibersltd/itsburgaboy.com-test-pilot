        // Icons
        lucide.createIcons({
            attrs: { strokeWidth: 1.5 }
        });

        // Clock Function
        function updateTime() {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/London',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(now);
            document.getElementById('clock').textContent = timeString + " GMT";
        }
        setInterval(updateTime, 1000);
        updateTime();


        // Mouse Follower Effect
        const mouseFollower = document.createElement('div');
        mouseFollower.className = 'fixed w-6 h-6 bg-pink-400 rounded-full pointer-events-none z-10 opacity-30 blur-sm transition-all duration-300';
        mouseFollower.style.mixBlendMode = 'screen';
        document.body.appendChild(mouseFollower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateMouseFollower() {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;

            followerX += dx * 0.1; // Smooth following
            followerY += dy * 0.1;

            mouseFollower.style.left = `${followerX - 12}px`; // Center the 24px element
            mouseFollower.style.top = `${followerY - 12}px`;

            requestAnimationFrame(updateMouseFollower);
        }
        updateMouseFollower();

        // Interactive Social Icons
        const socialIcons = document.querySelectorAll('footer a[href*="instagram"], footer a[href*="tiktok"], footer a[href*="youtube"], footer a[href*="twitter"]');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 10px rgba(142, 142, 142, 0.8))';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            });
        });

        // Dynamic Background Effect
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            const hue = (x * 60) + 280; // Pink to purple range
            const saturation = 5 + (y * 10); // Subtle saturation change
            const lightness = 8 + (y * 4); // Subtle lightness change

            document.body.style.background = `linear-gradient(135deg,
                hsl(${hue}, ${saturation}%, ${lightness}%),
                hsl(${hue + 30}, ${saturation + 5}%, ${lightness + 2}%))`;
        });

        // Scroll-based Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Move background elements
            const glowPoints = document.querySelectorAll('.glow-point');
            glowPoints.forEach(point => {
                point.style.transform = `translateY(${rate * 0.3}px)`;
            });

            // Fade in/out navigation based on scroll
            const nav = document.querySelector('nav');
            if (nav) {
                const opacity = Math.max(0.3, 1 - (scrolled * 0.002));
                nav.style.opacity = opacity;
            }
        });

        // Click Shrink Effect
        document.addEventListener('click', (e) => {
            // Find the clicked element
            const clickedElement = e.target;

            // Add shrink effect class
            clickedElement.classList.add('click-shrink');

            // Remove the class after animation completes
            setTimeout(() => {
                clickedElement.classList.remove('click-shrink');
            }, 300);
        });

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.toggle('hidden');
                nav.classList.toggle('flex');
            }
        }


        // Media Player Functionality
        // Media Player Functionality
        let mediaPlayer = null;
        let isPlaying = false;

        function initializeMediaPlayer() {
            mediaPlayer = document.getElementById('mediaPlayer');
            if (!mediaPlayer) return;

            // Update progress bar and time displays
            mediaPlayer.addEventListener('timeupdate', updateProgress);
            mediaPlayer.addEventListener('loadedmetadata', updateDuration);
            mediaPlayer.addEventListener('play', () => {
                isPlaying = true;
                updatePlayPauseIcon();
            });
            mediaPlayer.addEventListener('pause', () => {
                isPlaying = false;
                updatePlayPauseIcon();
            });

            // Progress bar click functionality
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.addEventListener('click', (e) => {
                    const rect = progressBar.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = clickX / rect.width;
                    const newTime = percentage * mediaPlayer.duration;
                    mediaPlayer.currentTime = newTime;
                });
            }

            // Initialize icons
            lucide.createIcons();
        }


        function togglePlayPause() {
            if (!mediaPlayer) return;

            if (isPlaying) {
                mediaPlayer.pause();
            } else {
                mediaPlayer.play();
            }
        }

        function updatePlayPauseIcon() {
            const playPauseBtn = document.getElementById('playPauseMainBtn');
            if (!playPauseBtn) return;

            const icon = playPauseBtn.querySelector('i');
            if (isPlaying) {
                icon.setAttribute('data-lucide', 'pause');
            } else {
                icon.setAttribute('data-lucide', 'play');
            }
            lucide.createIcons();
        }

        function toggleFullscreen() {
            if (!mediaPlayer) return;

            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                mediaPlayer.requestFullscreen();
            }
        }

        function updateProgress() {
            if (!mediaPlayer) return;

            const progressFill = document.querySelector('.progress-fill');
            const currentTimeDisplay = document.getElementById('currentTime');

            if (progressFill && mediaPlayer.duration) {
                const progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
                progressFill.style.width = progress + '%';
            }

            if (currentTimeDisplay) {
                const currentMinutes = Math.floor(mediaPlayer.currentTime / 60);
                const currentSeconds = Math.floor(mediaPlayer.currentTime % 60);
                currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
            }
        }

        function updateDuration() {
            if (!mediaPlayer) return;

            const durationDisplay = document.getElementById('duration');

            if (durationDisplay) {
                const durationMinutes = Math.floor(mediaPlayer.duration / 60);
                const durationSeconds = Math.floor(mediaPlayer.duration % 60);
                durationDisplay.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        }

        function setVolume(value) {
            if (!mediaPlayer) return;

            mediaPlayer.volume = value;
            const volumeDisplay = document.getElementById('volumeDisplay');
            volumeDisplay.textContent = Math.round(value * 100) + '%';
        }

        function changeTrack(src, title) {
            if (!mediaPlayer) return;

            mediaPlayer.src = src;
            mediaPlayer.load();
            mediaPlayer.play();
        }

        function updateTrackInfo() {
            if (!currentTrack) return;

            const trackTitle = document.querySelector('.track-title');
            const trackArtist = document.querySelector('.track-artist');
            const trackMeta = document.querySelector('.track-meta');

            if (trackTitle) trackTitle.textContent = currentTrack.title || 'Unknown Track';
            if (trackArtist) trackArtist.textContent = currentTrack.artist || 'Unknown Artist';
            if (trackMeta) trackMeta.textContent = currentTrack.meta || '';
        }

        function handleTrackEnd() {
            // Could implement auto-play next track here
            isPlaying = false;
            updatePlayPauseIcon();
        }

        function showLoadingState() {
            const playPauseBtn = document.getElementById('playPauseMainBtn');
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                icon.style.display = 'none';

                // Add loading spinner
                const spinner = document.createElement('div');
                spinner.className = 'loading-spinner';
                playPauseBtn.appendChild(spinner);
            }
        }

        function updateBuffer() {
            if (!mediaPlayer || !mediaPlayer.buffered || mediaPlayer.buffered.length === 0) return;

            const bufferBar = document.getElementById('bufferBar');
            const bufferedEnd = mediaPlayer.buffered.end(mediaPlayer.buffered.length - 1);
            const duration = mediaPlayer.duration;

            if (duration > 0) {
                const bufferPercent = (bufferedEnd / duration) * 100;
                bufferBar.style.width = bufferPercent + '%';
            }
        }

        function hideLoadingState() {
            const playPauseBtn = document.getElementById('playPauseMainBtn');
            if (playPauseBtn) {
                const spinner = playPauseBtn.querySelector('.loading-spinner');
                if (spinner) spinner.remove();

                const icon = playPauseBtn.querySelector('i');
                if (icon) icon.style.display = 'block';

                lucide.createIcons();
            }
        }

        function showBufferingState() {
            // Add buffering indicator to progress bar
            const progressBarBg = document.querySelector('.progress-bar-bg');
            if (progressBarBg && !progressBarBg.querySelector('.buffering-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'buffering-indicator';
                indicator.innerHTML = '<div class="loading-spinner" style="width: 12px; height: 12px; border-width: 1px;"></div>';
                progressBarBg.appendChild(indicator);
            }
        }

        function hideBufferingState() {
            const indicator = document.querySelector('.buffering-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // Initialize media player when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeMediaPlayer);

        // Initialize media player when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeMediaPlayer);

