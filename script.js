document.addEventListener("DOMContentLoaded", function () {
  // 1. Dynamic GitHub Projects Fetching Logic
  const githubUsername = "Dinujaya2001";
  const projectsContainer = document.getElementById("github-projects-container");

  if (projectsContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((repos) => {
        projectsContainer.innerHTML = ""; // Loading text එක ඉවත් කිරීම

        if (repos.length === 0) {
          projectsContainer.innerHTML =
            '<p class="text-center text-gray-400 col-span-full">No public repositories found.</p>';
          return;
        }

        repos.forEach((repo) => {
          const description =
            repo.description ||
            "Software engineering project focused on clean code, architecture, and modular system design.";
          const language = repo.language || "Java / Code";
          const repoUrl = repo.html_url;

          const cardHTML = `
            <div class="project-card rounded-lg overflow-hidden relative flex flex-col justify-between">
                <div>
                    <div class="h-40 bg-gradient-to-r from-blue-900/60 to-teal-900/60 flex items-center justify-center p-4">
                        <i class="fas fa-code-branch text-5xl text-blue-400/60"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2 gradient-text capitalize">${repo.name.replace(/-/g, " ").replace(/_/g, " ")}</h3>
                        <p class="text-gray-400 mb-4 text-sm leading-relaxed">${description}</p>
                    </div>
                </div>
                <div class="p-6 pt-0">
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-mono">${language}</span>
                        <span class="px-3 py-1 bg-teal-900/30 text-teal-300 rounded-full text-xs font-mono">★ ${repo.stargazers_count}</span>
                    </div>
                    <div class="flex justify-between items-center border-t border-gray-800/80 pt-4">
                        <a href="${repoUrl}" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                            <i class="fab fa-github mr-2"></i> View Code
                        </a>
                    </div>
                </div>
            </div>
          `;
          projectsContainer.insertAdjacentHTML("beforeend", cardHTML);
        });
      })
      .catch((error) => {
        console.error("Error fetching GitHub repositories:", error);
        projectsContainer.innerHTML =
          '<p class="text-center text-red-400 col-span-full">Failed to load live projects. Please visit GitHub directly.</p>';
      });
  }

  // 2. Interactive Cursor Logic
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      gsap.to(cursorFollower, { left: e.clientX, top: e.clientY, duration: 0.5 });
    });
  }

  // 3. Three.js Background Animation
  const container = document.getElementById("code-model");
  if (container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    camera.position.z = 30;

    const codeChars = "JAVA_SPRING_BOOT_SQL_ANDROID_FIREBASE_0123456789{}[]();:<>/=";
    const fontSize = 1;
    const characters = [];
    const charCount = 200;

    const loader = new THREE.FontLoader();
    loader.load(
      "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        for (let i = 0; i < charCount; i++) {
          const char = codeChars[Math.floor(Math.random() * codeChars.length)];
          const geometry = new THREE.TextGeometry(char, {
            font: font,
            size: fontSize,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false,
          });
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(`hsl(${Math.random() * 60 + 160}, 80%, 60%)`),
            transparent: true,
            opacity: 0.8,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = (Math.random() - 0.5) * 100;
          mesh.position.y = (Math.random() - 0.5) * 100;
          mesh.position.z = (Math.random() - 0.5) * 100;
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random() * Math.PI;
          mesh.userData = {
            originalY: mesh.position.y,
            speed: Math.random() * 0.5 + 0.5,
            delay: Math.random() * 5,
          };
          scene.add(mesh);
          characters.push(mesh);
        }
      }
    );

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      characters.forEach((char) => {
        char.position.y =
          char.userData.originalY +
          Math.sin(time * char.userData.speed + char.userData.delay) * 5;
        char.rotation.x += 0.01;
        char.rotation.y += 0.01;
      });
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // 4. Mobile Menu Interactions
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  function toggleMenu() {
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  }

  if (menuBtn && closeBtn && mobileMenu) {
    menuBtn.addEventListener("click", toggleMenu);
    closeBtn.addEventListener("click", toggleMenu);
    const navLinks = document.querySelectorAll("#mobile-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", toggleMenu);
    });
  }

  // 5. GSAP Scroll Trigger Animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".terminal-effect", {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });
  }
});