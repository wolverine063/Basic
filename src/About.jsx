import React, { useState, useEffect, useRef, useMemo } from "react";

// --- Helper: Generate random values ---
const randomInRange = (min, max) => Math.random() * (max - min) + min;

// --- 3D Animated Background using Three.js ---
const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.THREE) {
      console.error("THREE.js library is not loaded.");
      return;
    }

    const THREE = window.THREE;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const point1 = new THREE.PointLight(0xff00ff, 1.2, 200);
    point1.position.set(20, 10, 25);
    scene.add(point1);

    const point2 = new THREE.PointLight(0x00ffff, 1.2, 200);
    point2.position.set(-20, -10, -25);
    scene.add(point2);

    const objects = [];
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0.65,
    });

    for (let i = 0; i < 150; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        randomInRange(-150, 150),
        randomInRange(-150, 150),
        randomInRange(-150, 150)
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(randomInRange(0.5, 2));
      mesh.userData.rotationSpeed = {
        x: randomInRange(-0.005, 0.005),
        y: randomInRange(-0.005, 0.005),
      };
      objects.push(mesh);
    }

    scene.add(...objects);

    let mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      objects.forEach((obj) => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
      });

      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
      }}
    />
  );
};

// --- About Page Component ---
const AboutUsPage = () => {
  const teamMembers = useMemo(
    () => [
      {
        name: "Alex 'Vortex' Chen",
        role: "Founder & Lead Visionary",
        bio: "The original architect of our universe. Alex ensures every pixel aligns with our core mission: to deliver pure, unadulterated fun.",
        img: "https://placehold.co/400x400/1a1a2e/e0e0e0?text=AC",
      },
      {
        name: "Jasmine 'Glitch' Kim",
        role: "Head of Engineering",
        bio: "Jasmine turns caffeine into code and wild ideas into stable, scalable platforms. If a bug exists, she's already squashed it.",
        img: "https://placehold.co/400x400/1a1a2e/e0e0e0?text=JK",
      },
      {
        name: "Samuel 'Forge' Jones",
        role: "Community & Curation",
        bio: "Sam is the heart of our community. He hand-picks every title and ensures our players have a voice, and that voice is heard.",
        img: "https://placehold.co/400x400/1a1a2e/e0e0e0?text=SJ",
      },
    ],
    []
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        fontFamily: "sans-serif",
        overflowY: "auto",
      }}
    >
      <AnimatedBackground />
      <main
        style={{
          position: "relative",
          zIndex: 10,
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          <header style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                background: "linear-gradient(to right, #a855f7, #ec4899, #ef4444)",
                padding: "0.25rem",
                borderRadius: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  backgroundColor: "#1f2937",
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                }}
              >
                About Nexus Games
              </h1>
            </div>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#d1d5db",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.75rem",
              }}
            >
              We aren't just a store; we are a curated gateway to new worlds...
            </p>
          </header>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              {
                title: "Curation First",
                color: "#22d3ee",
                desc: "We champion hidden gems and indie darlings. Quality over quantity, always.",
              },
              {
                title: "Player-Centric",
                color: "#a78bfa",
                desc: "Fair prices, no nonsense, and a direct line to support that actually helps.",
              },
              {
                title: "Community-Powered",
                color: "#f472b6",
                desc: "We thrive on feedback and foster a space for players to connect and share.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  padding: "1.5rem",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "0.3s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                    color: item.color,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#9ca3af" }}>{item.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              Meet the Architects
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    padding: "1.5rem",
                    borderRadius: "1.5rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    textAlign: "center",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: "8rem",
                      height: "8rem",
                      borderRadius: "50%",
                      margin: "0 auto 1rem",
                      objectFit: "cover",
                      border: "4px solid #a855f7",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x400/ff0000/ffffff?text=Error";
                    }}
                  />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: "#a855f7",
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- App Entry ---
export default function App() {
  const [threeJsLoaded, setThreeJsLoaded] = useState(false);

  useEffect(() => {
    if (window.THREE) {
      setThreeJsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => setThreeJsLoaded(true);
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  if (!threeJsLoaded) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ textAlign: "center", animation: "pulse 2s infinite" }}>
          <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Loading Galactic ✨ Vibes...
          </p>
          <span
            style={{
              display: "inline-block",
              height: "1.25rem",
              width: "1.25rem",
              border: "2px solid white",
              borderTopColor: "transparent",
              borderRadius: "9999px",
              animation: "spin 1s linear infinite",
            }}
          ></span>
        </div>
      </div>
    );
  }

  return <AboutUsPage />;
}
