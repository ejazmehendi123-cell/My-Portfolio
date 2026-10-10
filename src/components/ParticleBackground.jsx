import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.002;
    let targetRotY = 0.003;
    let rotX = 0.002;
    let rotY = 0.003;
    let angleX = 0;
    let angleY = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const cx = width / 2;
      const cy = height / 2;
      mouseX = (e.clientX - cx) / cx;
      mouseY = (e.clientY - cy) / cy;
      targetRotY = 0.003 + mouseX * 0.005;
      targetRotX = 0.002 + mouseY * 0.005;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 1. Generate 3D Sphere Particles (Fibonacci Sphere algorithm)
    const NUM_SPHERE_POINTS = 850;
    const sphereParticles = [];
    const sphereRadius = Math.min(width, height) * 0.38;

    for (let i = 0; i < NUM_SPHERE_POINTS; i++) {
      // Golden Spiral distribution
      const y = 1 - (i / (NUM_SPHERE_POINTS - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle

      const x = Math.cos(phi) * radiusAtY;
      const z = Math.sin(phi) * radiusAtY;

      // Random slight variance for volumetric organic look
      const noise = (Math.random() - 0.5) * 0.05;

      sphereParticles.push({
        x: (x + noise) * sphereRadius,
        y: (y + noise) * sphereRadius,
        z: (z + noise) * sphereRadius,
        baseRadius: Math.random() * 1.2 + 0.6,
        colorType: Math.random() > 0.88 ? 'red' : 'white',
      });
    }

    // 2. Generate Ambient Background Starfield
    const NUM_STARS = 150;
    const stars = [];
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.15 + 0.05,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw red central core atmosphere glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, sphereRadius * 1.2);
      coreGlow.addColorStop(0, 'rgba(255, 0, 51, 0.25)');
      coreGlow.addColorStop(0.4, 'rgba(255, 0, 51, 0.12)');
      coreGlow.addColorStop(0.8, 'rgba(255, 0, 51, 0.02)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Render ambient background stars
      for (let i = 0; i < NUM_STARS; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      }

      // Smooth rotation dampening
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;
      angleX += rotX;
      angleY += rotY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Sort sphere particles by Z depth for proper rendering order
      const projected = [];

      for (let i = 0; i < NUM_SPHERE_POINTS; i++) {
        const p = sphereParticles[i];

        // Rotate Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate X axis
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection formula
        const fov = 450;
        const scale = fov / (fov + z2 + sphereRadius);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        // Depth opacity (front particles are brighter, back particles dimmer)
        const alpha = Math.max(0.08, Math.min(0.95, (z2 + sphereRadius) / (2 * sphereRadius)));

        projected.push({
          px,
          py,
          scale,
          z2,
          alpha,
          colorType: p.colorType,
          r: p.baseRadius * scale,
        });
      }

      // Sort by z index (back to front)
      projected.sort((a, b) => a.z2 - b.z2);

      // Draw projected sphere dots
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, p.r), 0, Math.PI * 2);

        if (p.colorType === 'red') {
          ctx.fillStyle = `rgba(255, 0, 51, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 0, 51, 0.8)';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
