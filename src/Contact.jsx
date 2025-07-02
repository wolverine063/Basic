import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const pointLight1 = new THREE.PointLight(0xff0088, 1.2, 200);
    pointLight1.position.set(0, 0, 25);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x00ffff, 1.2, 200);
    pointLight2.position.set(0, 0, -25);
    scene.add(pointLight2);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });

    const shards = [];
    for (let i = 0; i < 150; i++) {
      const shard = new THREE.Mesh(geometry, material);
      shard.position.set(
        randomInRange(-150, 150),
        randomInRange(-150, 150),
        randomInRange(-150, 150)
      );
      shard.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      shard.scale.setScalar(randomInRange(0.5, 2.0));
      shard.userData.rotationSpeed = {
        x: randomInRange(-0.005, 0.005),
        y: randomInRange(-0.005, 0.005),
      };
      shards.push(shard);
    }
    scene.add(...shards);

    let mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      shards.forEach((shard) => {
        shard.rotation.x += shard.userData.rotationSpeed.x;
        shard.rotation.y += shard.userData.rotationSpeed.y;
      });
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
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

const Contact = () => {
  const games = [
    { title: "Cyber Warriors", price: "$29.99" },
    { title: "Galaxy Racer", price: "$24.99" },
    { title: "Mystic Quest", price: "$19.99" },
    { title: "Dungeon Explorer", price: "$34.99" },
    { title: "Sky bound Legends", price: "$39.99" },
    { title: "Pixel Raiders", price: "$14.99" },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        fontFamily: "sans-serif",
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      <AnimatedBackground />

      <main
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "96rem",
          margin: "0 auto",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "1rem",
              background: "linear-gradient(to right, #a855f7, #ec4899, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact & Games Store
          </h1>
          <p
            style={{
              color: "#d1d5db",
              maxWidth: "36rem",
              margin: "0 auto",
            }}
          >
            Have questions? Reach out! Meanwhile, browse our latest game
            collection below with prices.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {games.map((game, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {game.title}
              </div>
              <div style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#22d3ee" }}>
                {game.price}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            marginTop: "4rem",
            maxWidth: "36rem",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Get in Touch
          </h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                color: "white",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                color: "white",
              }}
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                color: "white",
                resize: "none",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#9333ea",
                color: "white",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#7e22ce")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#9333ea")
              }
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
